from fastapi import FastAPI, APIRouter, Query
from typing import List, Dict


class Filter:
    def __init__(self, criteria):
        self.criteria = criteria

    def apply(self, data):
        return [item for item in data if self._matches_criteria(item)]

    def _matches_criteria(self, item):
        for key, value in self.criteria.items():
            if item.get(key) != value:
                return False
        return True


app = FastAPI()
router = APIRouter()


@router.get("/filter")
def filter_data(
    criteria: Dict[str, str] = Query(...), data: List[Dict[str, str]] = Query(...)
):
    filter_instance = Filter(criteria)
    filtered_data = filter_instance.apply(data)
    return {"filtered_data": filtered_data}


app.include_router(router)
