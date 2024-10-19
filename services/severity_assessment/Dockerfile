# Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt requirements.txt
# Upgrade pip and setuptools
RUN pip install --upgrade pip setuptools

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "app.py"]