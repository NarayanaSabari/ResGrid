import random
import json
from datetime import datetime, timedelta
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase app with the service account
cred = credentials.Certificate("accountConfig.json")  # replace with your file path
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

# Sample data for random generation
locations = ["New Orleans, LA", "Houston, TX", "Miami, FL", "San Francisco, CA", "Seattle, WA"]
severities = ["Low", "Moderate", "High"]
statuses = ["Ongoing", "Closed"]
trends = ["increasing", "decreasing", "stable"]
types = ["Flood", "Earthquake", "Hurricane", "Wildfire", "Tornado"]
image_urls = [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fichef.bbci.co.uk%2Fnews%2F2048%2Fcpsprodpb%2F1001B%2Fproduction%2F_90836556_678c5ba9-3bc1-4237-864c-fa81f8ff720e.jpg&f=1&nofb=1&ipt=83cdbcb36c729d389828b26d2154c450566a287357bde517143712c05e7c5262&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.gULocBMZOFo8ah_969mocgHaE6%26pid%3DApi&f=1&ipt=8d42a721a25b03c60e79a9c02cae94b0dd61cfc104b8e7ef026684440905f118&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.79CVC8tVmoqHDFRbVqhIdgHaE8%26pid%3DApi&f=1&ipt=91b9675a0d440fe2c7ea140ab2a0494be8b97ccd642514b0b4d81b435e9aebde&ipo=images"
]

# Function to generate a random data entry
def generate_entry():
    entry = {
        "affectedPeople": random.randint(100, 50000),
        "image": random.choice(image_urls),
        "lastUpdate": (datetime.now() - timedelta(days=random.randint(0, 30))).strftime("%Y-%m-%d"),
        "location": random.choice(locations),
        "severity": random.choice(severities),
        "status": random.choice(statuses),
        "trend": random.choice(trends),
        "type": random.choice(types)
    }
    return entry

# Function to generate and upload entries to Firestore
def generate_and_upload_entries(count=5):
    collection_name = "Disasters"  # Collection name in Firestore
    for _ in range(count):
        entry = generate_entry()
        # Add each entry as a new document in the Firestore collection
        db.collection(collection_name).add(entry)
        print(f"Entry added to Firestore: {entry}")

# Generate and upload 10 entries (you can change this number as needed)
generate_and_upload_entries(10)
print("Data successfully generated and uploaded to Firestore.")