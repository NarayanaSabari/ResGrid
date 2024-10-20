# Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy the application code
COPY . .

# Accept the Firebase service account key as a build argument
ARG FIREBASE_SERVICE_ACCOUNT_KEY

# Create the service account key file
RUN echo "$FIREBASE_SERVICE_ACCOUNT_KEY" > serviceAccountKey.json

# Command to run the application
CMD ["python", "app.py"]