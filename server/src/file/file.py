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

    def save_file_with_user_id(self, user_id: int):
        user_folder = os.path.join("data", str(user_id))
        os.makedirs(user_folder, exist_ok=True)

        file_path = os.path.join(user_folder, self.data_file.filename)
        with open(file_path, "wb") as file:
            file.write(self.data_file.file.read())
        return file_path
