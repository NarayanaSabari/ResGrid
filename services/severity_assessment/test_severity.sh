#!/bin/bash

# Define the input JSON file
INPUT_FILE="test_inputs.json"

# Check if the input file exists
if [ ! -f "$INPUT_FILE" ]; then
    echo "Error: $INPUT_FILE not found!"
    exit 1
fi

# Start the test
echo "Starting test script..."

# Combine the input lines into a single JSON object list (if needed)
input_data=$(cat "$INPUT_FILE")

# Print the input data for debugging
echo "Input Data:"
echo "$input_data"

# Validate if the input data is valid JSON using jq
if ! echo "$input_data" | jq . > /dev/null 2>&1; then
    echo "Error: Input file contains invalid JSON!"
    exit 1
fi

# Loop through each JSON object in the array
echo "$input_data" | jq -c '.[]' | while IFS= read -r line; do
    # Ensure the line contains a valid JSON object
    if [[ "$line" =~ ^\{.*\}$ ]]; then
        # Debugging line to check each read JSON object
        echo "Processing JSON: $line"

        # Escape the JSON properly before sending it to the Flask API
        encoded_json=$(echo "$line" | jq -c .)

        # Send the request to the Flask API
        echo "Sending request..."
        response=$(curl -s -X POST http://127.0.0.1:5000/detect_severity \
            -H "Content-Type: application/json" \
            -d "$encoded_json")

        # Check if the response is empty or malformed
        if [ -z "$response" ]; then
            echo "Error: Empty response or server issue."
            exit 1
        fi

        # Print the response from the server
        echo "Response: $response"
        echo -e "\n"
    else
        echo "Skipping invalid JSON line: $line"
    fi
done

# End of the test
echo "Test script completed."