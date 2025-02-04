import os

from fastapi import UploadFile, HTTPException


class FileHandler:
    def __init__(self, data_file: UploadFile):
        self.data_file = data_file

    # def validate_file(self):
    #     if not os.path.isfile(self.file_path):
    #         raise FileNotFoundError(f"The file {self.file_path} does not exist.")
    #     if not self.file_path.endswith((".txt", ".csv", ".json")):
    #         raise ValueError(
    #             "Invalid file type. Only .txt, .csv, and .json files are allowed."
    #         )

    def validate_table_file(self):
        valid_mime_types = [
            "text/csv",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ]
        if self.data_file.content_type not in valid_mime_types:
            raise HTTPException(
                status_code=400,
                detail="Invalid file type. Only CSV and Excel files are allowed.",
            )

    def split_file_name(self):
        return os.path.splitext(self.data_file.filename)

    # def get_file(self):
    #     with open(self.file_path, "r") as file:
    #         return file.read()

    # def save_file(self, content):
    #     with open(self.file_path, "w") as file:
    #         file.write(content)

    def save_model_file_with_user_id(self, user_id: int):
        user_folder = os.path.join("data", f"user_{user_id}")
        os.makedirs(user_folder, exist_ok=True)

        # a folder has some subfolders like model_1, model_2, model_3. Find the last subfolder and increment it by 1
        if os.path.exists(user_folder):
            subfolders = [
                int(f.split("_")[1])
                for f in os.listdir(user_folder)
                if os.path.isdir(os.path.join(user_folder, f))
            ]
            if subfolders:
                model_folder = os.path.join(user_folder, f"model_{max(subfolders) + 1}")
            else:
                model_folder = os.path.join(user_folder, "model_1")
        os.makedirs(model_folder, exist_ok=True)

        file_path = os.path.join(model_folder, self.data_file.filename)
        with open(file_path, "wb") as file:
            file.write(self.data_file.file.read())
        return file_path

    def save_predict_file_with_model_path(self, model_path: str):
        model_folder = os.path.dirname(model_path)
        # predict folder is predict_1, predict_2, predict_3, ...
        subfolders = [
            int(f.split("_")[1])
            for f in os.listdir(model_folder)
            if os.path.isdir(os.path.join(model_folder, f))
        ]
        if subfolders:
            predict_folder = os.path.join(
                model_folder, f"predict_{max(subfolders) + 1}"
            )
        else:
            predict_folder = os.path.join(model_folder, "predict_1")
        os.makedirs(predict_folder, exist_ok=True)

        file_path = os.path.join(predict_folder, self.data_file.filename)
        with open(file_path, "wb") as file:
            file.write(self.data_file.file.read())
        return file_path
