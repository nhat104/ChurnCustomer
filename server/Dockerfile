# FROM python:3.10 as build

# WORKDIR /app
# COPY ./requirements.txt /app/requirements.txt

# # RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
# RUN pip install -r /app/requirements.txt

# COPY ./src /app/src

# FROM alpine:3.19
# RUN adduser -D new_user
# WORKDIR /run
# COPY --from=build /app /run
# RUN chown -R new_user:new_user /run
# USER new_user

# ENV PYTHONPATH="/app/src"
# CMD ["fastapi", "run", "src/app.py", "--port", "80"]




FROM python:3.10-slim

WORKDIR /app
COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
# RUN pip install -r /app/requirements.txt

COPY ./src /app/src

RUN useradd -m new_user && chown -R new_user:new_user /app
USER new_user

ENV PYTHONPATH="/app/src"
CMD ["fastapi", "run", "src/app.py", "--port", "80"]



# # Stage 1: Build dependencies in a larger image
# FROM python:3.10-slim as builder

# # Set the working directory
# WORKDIR /app

# # Install required system dependencies for building packages
# RUN apt-get update && apt-get install -y --no-install-recommends \
#   gcc g++ build-essential python3-dev \
#   && rm -rf /var/lib/apt/lists/*

# # Install dependencies in a virtual environment
# RUN python -m venv /opt/venv
# ENV PATH="/opt/venv/bin:$PATH"

# COPY ./requirements.txt /app/requirements.txt
# RUN pip install --no-cache-dir -r /app/requirements.txt

# # Stage 2: Create a minimal final image
# FROM python:3.10-slim

# WORKDIR /app

# # Copy only the necessary files from the builder stage
# COPY --from=builder /opt/venv /opt/venv
# COPY ./src /app/src

# # Set the environment path
# ENV PATH="/opt/venv/bin:$PATH"

# # Run FastAPI with Uvicorn
# CMD ["fastapi", "run", "src/app.py", "--port", "80"]
