import pandas as pd

df = pd.read_csv("uploads/Churn_Modelling.csv")

target_columns = ["Exited", "Output", "Result"]
target_column = None

print(df.columns)

for col in target_columns:
    print(col)
    if col in df.columns:
        target_column = col
        break

print("\n\n\n")
print(target_column)
