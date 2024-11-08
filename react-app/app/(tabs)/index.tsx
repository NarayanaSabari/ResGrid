import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ToastAndroid,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { launchCamera } from "react-native-image-picker";
import Geolocation from "@react-native-community/geolocation";
import { useRouter, useSearchParams } from "expo-router";

import * as FileSystem from "expo-file-system";
import axios from "axios";

function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [textField1, setTextField1] = useState("");
  const [textField2, setTextField2] = useState("");
  const [photo, setPhoto] = useState(null);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const [backendUrl, setBackendUrl] = useState("");

  const [imageBase64, setImageBase64] = useState(null);

  const convertImageToBuffer = async (imageUri) => {
    try {
      // Read the image as a base64 string
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convert base64 string to a Uint8Array
      const buffer = new Uint8Array(
        atob(base64Image)
          .split("")
          .map((char) => char.charCodeAt(0))
      );

      setImageBase64(buffer);
    } catch (error) {
      console.error("Error reading image file:", error);
    }
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLong(position.coords.longitude);
        setLat(position.coords.latitude);
      },
      (error) => {
        console.warn(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });

  const openCamera = () => {
    const options = {
      mediaType: "photo",
      saveToPhotos: true,
      cameraType: "back",
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const photoUri = response.assets[0].uri;
        setPhoto(photoUri);
        console.log(photoUri);
      }
    });
  };

  function getRandomCoordinates() {
    // Latitude ranges from -90 to 90
    const latitude = (Math.random() * 180 - 90).toFixed(6);

    // Longitude ranges from -180 to 180
    const longitude = (Math.random() * 360 - 180).toFixed(6);

    return {
      lat: parseFloat(latitude),
      long: parseFloat(longitude),
    };
  }

  const handleSubmit = async () => {
    if (
      !selectedValue ||
      !textField1 ||
      !textField2 ||
      !photo ||
      !lat ||
      !long
    ) {
      let errorMessage = "Please fill every field";
      if (!selectedValue) errorMessage = "Please select a disaster type";
      if (!textField1)
        errorMessage = "Please enter the number of affected people";
      if (!textField2) errorMessage = "Please enter a description";
      if (!photo) errorMessage = "Please take a photo";
      if (!lat || !long) errorMessage = "Location data is missing";
      ToastAndroid.show(errorMessage, ToastAndroid.TOP);
    } else {
      convertImageToBuffer(photo);

      try {
        const res = await axios.post(backendUrl, {
          type: selectedValue,
          affectedPeople: textField1,
          description: textField2,
          location: getRandomCoordinates(),
          image: imageBase64,
        });
        console.log(res);
        ToastAndroid.show("Report received", ToastAndroid.TOP);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ResGrid</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter backend URL"
        placeholderTextColor="#BBBBBB"
        value={textField1}
        onChangeText={setBackendUrl}
      />

      <DropDownPicker
        open={dropdownOpen}
        value={selectedValue}
        items={[
          { label: "Flood", value: "flood" },
          { label: "Earthquake", value: "earthquake" },
          { label: "Fire", value: "fire" },
        ]}
        setOpen={setDropdownOpen}
        setValue={setSelectedValue}
        placeholder="Select an option"
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter description of the incident"
        placeholderTextColor="#BBBBBB"
        value={textField1}
        onChangeText={setTextField1}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter the number of people affected"
        placeholderTextColor="#BBBBBB"
        value={textField2}
        onChangeText={setTextField2}
      />

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button color={"#FF7043"} title="Take a pic" onPress={openCamera} />
        </View>
        <View style={styles.button}>
          <Button color={"#26A69A"} title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E0F7FA", // Light cyan background
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#00796B", // Dark teal color for the title
    textAlign: "center",
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: "#FFFFFF", // Dropdown background color
    borderColor: "#00796B", // Border color
    marginBottom: 15,
  },
  dropdownText: {
    color: "#00796B",
  },
  dropdownContainer: {
    borderColor: "#00796B", // Border color for the expanded dropdown
  },
  input: {
    height: 40,
    backgroundColor: "#FFFFFF", // White background for text inputs
    borderColor: "#00796B", // Teal border color
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: "#333", // Dark text color
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default App;
