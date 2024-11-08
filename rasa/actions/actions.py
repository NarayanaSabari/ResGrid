from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet

class ActionCheckFloodSeverity(Action):
    def name(self) -> Text:
        return "action_check_flood_severity"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        user_message = tracker.latest_message.get('text', '').lower()
        print(f"User message: {user_message}")  # Debug log

        # Detect severity for flood incidents only
        severity = self.detect_flood_severity(user_message)
        

        # Only respond with severity level if detected
        if severity in ["low", "medium", "high"]:
            print(f"Responding with flood severity level: {severity}")  # Debug log for response
            dispatcher.utter_message(text=f"{severity}")
            return [SlotSet("severity", severity)]
        else:
            print("No severity level detected for flood; no response sent.")  # Debug for no response case
            return []  # No response if severity could not be determined

    def detect_flood_severity(self, text):
        # Severity keywords specific to flood
        high_keywords = ['heavy', 'severe', 'critical', 'massive', 'extreme', 'huge', 'widespread', 'catastrophic']
        medium_keywords = ['medium', 'moderate', 'significant']
        low_keywords = ['low', 'minor', 'minimal']
        
        # Check for high, medium, and low keywords in that order
        if any(keyword in text for keyword in high_keywords):
            return 'high'
        elif any(keyword in text for keyword in medium_keywords):
            return 'medium'
        elif any(keyword in text for keyword in low_keywords):
            return 'low'
        else:
            return None
        
        
class ActionCheckFireSeverity(Action):
    def name(self) -> Text:
        return "action_check_fire_severity"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        user_message = tracker.latest_message.get('text', '').lower()
        print(f"User message: {user_message}")  # Debug log

        # Detect severity for fire incidents only
        severity = self.detect_fire_severity(user_message)
        
        print(f"Detected fire severity: {severity}")  # Debug log

        # Only respond with severity level if detected
        if severity in ["low", "medium", "high"]:
            print(f"Responding with fire severity level: {severity}")  # Debug log for response
            dispatcher.utter_message(text=f"{severity}")
            return [SlotSet("severity", severity)]
        else:
            print("No severity level detected for fire; no response sent.")  # Debug for no response case
            return []  # No response if severity could not be determined

    def detect_fire_severity(self, text):
        # Severity keywords specific to fire
        high_keywords = ['huge', 'massive', 'out-of-control', 'raging', 'engulfing', 'major', 'severe', 'catastrophic', 'town', 'city', 'neighborhood', 'widespread']
        medium_keywords = ['medium', 'moderate', 'spreading', 'growing', 'expanding']
        low_keywords = ['small', 'minor', 'contained', 'under control']
        
        # Check for high, medium, and low keywords in that order
        if any(keyword in text for keyword in high_keywords):
            return 'high'
        elif any(keyword in text for keyword in medium_keywords):
            return 'medium'
        elif any(keyword in text for keyword in low_keywords):
            return 'low'
        else:
            return None
class ActionCheckEarthquakeSeverity(Action):
    def name(self) -> Text:
        return "action_check_earthquake_severity"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        user_message = tracker.latest_message.get('text', '').lower()
        print(f"User message: {user_message}")  # Debug log

        # Detect severity for earthquake incidents only
        severity = self.detect_earthquake_severity(user_message)
        
        print(f"{severity}")  # Debug log

        # Only respond with severity level if detected
        if severity in ["low", "medium", "high"]:
            print(f"Responding with earthquake severity level: {severity}")  # Debug log for response
            dispatcher.utter_message(text=f"The earthquake severity level is: {severity}")
            return [SlotSet("severity", severity)]
        else:
            print("No severity level detected for earthquake; no response sent.")  # Debug for no response case
            return []  # No response if severity could not be determined

    def detect_earthquake_severity(self, text):
        # Severity keywords specific to earthquake
        high_keywords = ['massive', 'severe', 'major', 'strong', 'powerful', 'destructive', 'intense', 'devastating', 'catastrophic', 'shaking heavily', 'tremors', 'rumbling']
        medium_keywords = ['medium', 'moderate', 'significant', 'noticeable', 'felt']
        low_keywords = ['low', 'minor', 'small', 'light', 'barely', 'slight']
        
        # Check for high, medium, and low keywords in that order
        if any(keyword in text for keyword in high_keywords):
            return 'high'
        elif any(keyword in text for keyword in medium_keywords):
            return 'medium'
        elif any(keyword in text for keyword in low_keywords):
            return 'low'
        else:
            return None