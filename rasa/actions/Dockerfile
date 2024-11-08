# Action Server Dockerfile (./actions/Dockerfile)
FROM rasa/rasa-sdk:latest

WORKDIR /app/actions

# Switch to root for installations
USER root

# Copy requirements first for better caching
COPY requirements-actions.txt .
COPY . /app/actions

# Install dependencies as root
RUN pip install --no-cache-dir -r requirements-actions.txt

# Create necessary directories with proper permissions
RUN mkdir -p /app/.cache/pip && \
    chown -R 1001:1001 /app/.cache && \
    chown -R 1001:1001 /app/actions

# Switch back to non-root user
USER 1001

# Expose port for action server
EXPOSE 5055

# Command to run the action server
CMD ["python", "-m", "rasa_sdk", "--actions", "actions", "--port", "5055"]