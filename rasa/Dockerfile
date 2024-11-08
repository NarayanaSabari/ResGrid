FROM rasa/rasa:latest-full

WORKDIR /app

# Switch to root for installations
USER root

# Copy requirements first for better caching
COPY requirements.txt .

# Install dependencies as root
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . /app

# Create necessary directories with proper permissions
RUN mkdir -p /app/.cache/pip && \
    chown -R 1001:1001 /app/.cache && \
    chown -R 1001:1001 /app

# Switch back to non-root user
USER 1001

# Expose port for Rasa server
EXPOSE 5005

# Command to run the Rasa server
CMD ["run", "--enable-api", "--cors", "*"]
