import os
import joblib
import shap
import pandas as pd
import numpy as np

from sqlmodel import select
from fastapi import UploadFile, HTTPException

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.compose import ColumnTransformer
from sklearn.metrics import roc_curve, roc_auc_score

from scipy.stats import gaussian_kde

from utils.database import SessionDep
from utils.models import MLModel, ModelAttribute
from .schemas import MLModelUpdate


class MLModelService:
    def get_user_models(
        self, user_id: int, session: SessionDep, offset: int = 0, limit: int = 100
    ):
        statement = (
            select(MLModel)
            .where(MLModel.user_id == user_id)
            .order_by(MLModel.created_at.desc())
            .offset(offset)
            .limit(limit)
        )

        result = session.exec(statement).all()
        return result

    def get_model(self, model_id: int, user_id: int, session: SessionDep):
        # model = session.get(MLModel, model_id)
        statement = select(MLModel).where(
            MLModel.id == model_id, MLModel.user_id == user_id
        )
        model = session.exec(statement).first()
        return model

    def get_model_path(self, model_id: int, user_id: int, session: SessionDep):
        statement = select(MLModel).where(
            MLModel.id == model_id, MLModel.user_id == user_id
        )
        model = session.exec(statement).first()
        if model:
            model_path = None
            for attr in model.attributes:
                if attr.name == "model_path":
                    model_path = attr.value
                    break
            return model_path
        return None

    def create_model_by_user(self, model: dict, session: SessionDep):
        db_model = MLModel(**model)
        session.add(db_model)
        session.commit()
        session.refresh(db_model)
        return db_model

    def update_model(
        self, model_id: int, model: MLModelUpdate, user_id: int, session: SessionDep
    ):
        db_model = self.get_model(model_id, user_id, session)
        if not db_model:
            return None
        model_data = model.model_dump(exclude_unset=True)
        for key, value in model_data.items():
            setattr(db_model, key, value)
        session.add(db_model)
        session.commit()
        session.refresh(db_model)
        return db_model

    def delete_model(self, model_id: int, user_id: int, session: SessionDep):
        model = self.get_model(model_id, user_id, session)
        if not model:
            return None
        # model_path = model.path
        # if os.path.exists(model_path):
        #     os.remove(model_path)
        session.delete(model)
        session.commit()
        return {"ok": True}

    def isFilenameExist(self, filename: str, user_id: int, session: SessionDep) -> str:
        # select all filename from MLModel where user_id = user_id
        statement = select(MLModel).where(
            MLModel.user_id == user_id, MLModel.name.contains(filename)
        )
        result = session.exec(statement).all()
        names = [model.name for model in result]

        if len(names) > 0:
            counter = 1
            new_filename = f"{filename} ({counter})"
            while new_filename in names:
                counter += 1
                new_filename = f"{filename} ({counter})"
            return new_filename
        return filename

    def save_data_file(self, data_file: UploadFile, user_id: int):
        # Save the file to a directory
        user_folder = os.path.join("data", str(user_id))
        os.makedirs(user_folder, exist_ok=True)

        # Save the file to the directory
        file_path = os.path.join(user_folder, data_file.filename)
        with open(file_path, "wb") as file_object:
            file_object.write(data_file.file.read())

        return file_path

    def build_ml_model(self, file_path, file_ext: str, user_id: int):
        # Load the data from the file
        df = None
        try:
            if file_ext == ".csv":
                df = pd.read_csv(file_path)
            elif file_ext == ".xlsx" or file_ext == ".xls":
                df = pd.read_excel(file_path)
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=f"Error reading file: {e}",
            )

        # target column should be Exited, output, result. Find one and drop the rest
        target_columns = ["Exited", "Output", "Result"]
        target_column = None
        for col in target_columns:
            if col in df.columns:
                target_column = col
                break

        if not target_column:
            error = f"There is no one among {len(df.columns)} columns in provided data columns with a name from the list: 'Exited', 'Output', 'Result'."
            return error, 0, []

        # find and drop column have too many unique values and type is categorical
        for col in df.columns:
            if df[col].dtype == "object" and df[col].nunique() > 10:
                df.drop(col, axis=1, inplace=True)

        # split the data into features and target variable
        X = df.drop(target_column, axis=1)
        y = df[target_column]

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.3, random_state=42
        )

        # group columns by data type
        continuous_columns = []
        categorical_columns = []
        for col in X_train.columns:
            if pd.api.types.is_object_dtype(X_train[col]):
                categorical_columns.append(col)
            # if dtype is not object but only 2 unique values, it is also categorical
            # elif X_train[col].nunique() == 2:
            #     categorical_columns.append(col)
            elif pd.api.types.is_numeric_dtype(X_train[col]):
                continuous_columns.append(col)
        # X_train = X_train[continuous_columns + categorical_columns]
        # X_test = X_test[continuous_columns + categorical_columns]

        # create a pipeline for preprocessing
        num_pipeline = Pipeline(
            [
                ("min_max_scaler", MinMaxScaler(feature_range=(-1, 1))),
            ]
        )
        cat_pipeline = make_pipeline(
            OneHotEncoder(handle_unknown="ignore"),
        )

        preprocessing = ColumnTransformer(
            [
                ("num", num_pipeline, continuous_columns),
                ("cat", cat_pipeline, categorical_columns),
            ]
        )

        # create a pipeline for the model
        forest_reg = make_pipeline(
            preprocessing, RandomForestClassifier(random_state=42)
        )
        forest_reg.fit(X_train, y_train)

        # split file extension from the file_path
        file_path_name, _ = os.path.splitext(file_path)

        # Save the model to a file
        model_filename = f"{file_path_name}_forest_reg.joblib"
        joblib.dump(forest_reg, model_filename)

        churn_pred = forest_reg.predict(X_test)
        churn_pred_prob = forest_reg.predict_proba(X_test)

        # kdeplot = sns.kdeplot(x=churn_pred_prob[:, 1], hue=y_test, common_norm=False)
        # kde_data_1 = kdeplot.get_lines()[0].get_data()
        # kde_data_0 = kdeplot.get_lines()[1].get_data()

        # kde_points_1 = list(zip(kde_data_1[0].tolist(), kde_data_1[1].tolist()))
        # kde_points_1 = [
        #     [round(x * 10, 1), round(y, 2)] for x, y in kde_points_1 if 0 <= x <= 1.2
        # ]
        # kde_points_0 = list(zip(kde_data_0[0].tolist(), kde_data_0[1].tolist()))
        # kde_points_0 = [
        #     [round(x * 10, 1), round(y, 2)] for x, y in kde_points_0 if 0 <= x <= 1.2
        # ]

        # make data points for density distribution by classes chart
        marks = np.linspace(0, 1.2, 200).tolist()

        kde_1, kde_0 = None, None
        try:
            kde_1 = gaussian_kde(churn_pred_prob[y_test == 1][:, 1])
            kde_0 = gaussian_kde(churn_pred_prob[y_test == 0][:, 1])
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=f"Error: {e}",
            )

        kde_points_1 = [[round(x * 10, 1), round(float(kde_1(x)[0]), 2)] for x in marks]
        kde_points_0 = [[round(x * 10, 1), round(float(kde_0(x)[0]), 2)] for x in marks]

        density_distribution = [
            {"name": "Exit", "data": kde_points_1},
            {"name": "Stay", "data": kde_points_0},
        ]

        # make data points for K-S Score chart
        ks_data = pd.DataFrame({"y_test": y_test, "y_pred": churn_pred_prob[:, 1]})
        ks_data.sort_values(by="y_pred", ascending=True, inplace=True)

        # Calculate cumulative distribution for positive (1) and negative (0) classes
        ks_data["cumulative_positive"] = (ks_data["y_test"] == 1).cumsum() / (
            ks_data["y_test"] == 1
        ).sum()
        ks_data["cumulative_negative"] = (ks_data["y_test"] == 0).cumsum() / (
            ks_data["y_test"] == 0
        ).sum()

        # Calculate K-S statistic (maximum distance between cumulative positive and negative distributions)
        ks_data["ks_distance"] = (
            ks_data["cumulative_negative"] - ks_data["cumulative_positive"]
        )
        ks_data = ks_data.groupby("y_pred").max().reset_index()

        ks_data["y_pred"] = ks_data["y_pred"] * 10
        ks_data["cumulative_positive"] = round(ks_data["cumulative_positive"], 2)
        ks_data["cumulative_negative"] = round(ks_data["cumulative_negative"], 2)

        ks_statistic = float(ks_data["ks_distance"].max())
        ks_stat_attr = ks_data.loc[ks_data["ks_distance"].idxmax()]
        ks_threshold = float(ks_stat_attr["y_pred"])
        point_positive = float(ks_stat_attr["cumulative_positive"])
        point_negative = float(ks_stat_attr["cumulative_negative"])

        ks_score_series = [
            {
                "name": "Exit",
                "data": ks_data[["y_pred", "cumulative_positive"]].values.tolist(),
            },
            {
                "name": "Stay",
                "data": ks_data[["y_pred", "cumulative_negative"]].values.tolist(),
            },
        ]
        ks_score_attr = {
            "ks_statistic": round(ks_statistic, 2),
            "ks_threshold": ks_threshold,
            "point_positive": point_positive,
            "point_negative": point_negative,
        }

        # make data points for roc-auc chart
        auc_score = roc_auc_score(y_test, churn_pred_prob[:, 1])
        fpr, tpr, thresholds = roc_curve(y_test, churn_pred_prob[:, 1])
        thresholds[np.isinf(thresholds)] = 1.0
        fpr = np.round(fpr, 2).tolist()
        tpr = np.round(tpr, 2).tolist()
        thresholds = np.round(thresholds, 2).tolist()

        roc_auc_data_points = [[f, t] for f, t in zip(fpr, tpr)]
        roc_auc_series = [{"name": "ROC AUC", "data": roc_auc_data_points}]

        attributes = [
            ModelAttribute(name="total_records", value=str(len(df))),
            ModelAttribute(name="test_records", value=str(len(X_test))),
            ModelAttribute(name="stay_count", value=str(len(y_test) - sum(y_test))),
            ModelAttribute(name="exit_count", value=str(sum(y_test))),
            ModelAttribute(
                name="stay_percentage", value=str(round((1 - y_test.mean()) * 100, 1))
            ),
            ModelAttribute(
                name="exit_percentage", value=str(round(y_test.mean() * 100, 1))
            ),
            ModelAttribute(name="no_columns", value=str(len(X.columns))),
            ModelAttribute(name="target_column", value=target_column),
            ModelAttribute(name="model_path", value=model_filename),
            ModelAttribute(name="roc_auc", value=str(round(auc_score, 2))),
            ModelAttribute(
                name="density_distribution", value=str(density_distribution)
            ),
            ModelAttribute(name="y_test", value=str(y_test.tolist())),
            ModelAttribute(name="y_pred", value=str(churn_pred_prob[:, 1].tolist())),
            ModelAttribute(name="ks_score_series", value=str(ks_score_series)),
            ModelAttribute(name="ks_score_attr", value=str(ks_score_attr)),
            ModelAttribute(name="roc_auc_series", value=str(roc_auc_series)),
        ]

        return "Finished", round(auc_score * 2 - 1, 2), attributes

    def predict_with_model(
        self, model_path: str, data
    ) -> list[tuple[str, np.float64, np.array]]:
        # Load the model from a file
        model = joblib.load(model_path)

        df = pd.read_csv(data)
        surname = df["Surname"]

        if "Exited" in df.columns:
            input_data = df.drop(["Exited"], axis=1)
        else:
            input_data = df

        # Apply preprocessing to the input data
        input_data_prepared = model.named_steps["columntransformer"].transform(
            input_data
        )
        feature_names = model.named_steps["columntransformer"].get_feature_names_out()

        # predictions = model.predict(input_data)
        pred_probability = model.predict_proba(input_data)[:, 1]

        # Calculate SHAP values for the positive class
        explainer = shap.TreeExplainer(model.named_steps["randomforestclassifier"])
        shap_values = explainer.shap_values(input_data_prepared)
        shap_values = np.round(shap_values[:, :, 1], 5).tolist()

        pred_probability = [
            (
                name,
                prob,
                [
                    [shap_value, feature]
                    for feature, shap_value in zip(feature_names, shap_value)
                ],
            )
            for name, prob, shap_value in zip(surname, pred_probability, shap_values)
        ]

        return pred_probability
