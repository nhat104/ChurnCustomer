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




FROM python:3.10

WORKDIR /app
COPY ./requirements.txt /app/requirements.txt

# RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
RUN pip install -r /app/requirements.txt

COPY ./src /app/src

RUN useradd -m new_user && chown -R new_user:new_user /app
USER new_user

ENV PYTHONPATH="/app/src"
CMD ["fastapi", "run", "src/app.py", "--port", "80"]




# FROM alpine:3.19

# # Install dependencies (Python, Pip, venv, and bash)
# # RUN apk add --no-cache python3 py3-pip python3-dev py3-virtualenv bash
# RUN apk add --no-cache \
#   python3 \
#   py3-pip \
#   python3-dev \
#   py3-virtualenv \
#   bash \
#   build-base \
#   gcc \
#   libc-dev \
#   openblas-dev \
#   lapack-dev \
#   musl-dev \
#   libffi-dev \
#   gfortran

# # Set the working directory
# WORKDIR /app

# # Create a virtual environment
# RUN python3 -m venv /app/venv

# # Activate venv and install dependencies
# COPY ./requirements.txt /app/requirements.txt
# RUN /app/venv/bin/pip install --no-cache-dir -r /app/requirements.txt

# # Copy application source code
# COPY ./src /app/src

# # Create a non-root user
# RUN adduser -D new_user && chown -R new_user:new_user /app

# # Switch to non-root user
# USER new_user

# # Set environment variable for Python
# ENV PYTHONPATH="/app/src"
# ENV PATH="/app/venv/bin:$PATH"

# # Run FastAPI with Uvicorn
# CMD ["fastapi", "run", "src/app.py", "--port", "80"]
