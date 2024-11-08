#!/bin/bash

echo "Starting Rasa Action Server..."

# Define default values for environment variables if they are not set
export ACTION_ENDPOINT_URL="${ACTION_ENDPOINT_URL:-http://localhost:5055/webhook}"
export SQLALCHEMY_SILENCE_UBER_WARNING="${SQLALCHEMY_SILENCE_UBER_WARNING:-1}"

# Check if the variable is still unbound (if no default is set)
if [ -z "$ACTION_ENDPOINT_URL" ]; then
    echo "ERROR: ACTION_ENDPOINT_URL not set!"
    exit 1
fi

# Proceed to run the action server
echo "Action endpoint URL: $ACTION_ENDPOINT_URL"
exec rasa run actions --action-endpoint $ACTION_ENDPOINT_URL
