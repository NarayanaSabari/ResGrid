import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Geolocation from "@react-native-community/geolocation";

function LocationScreen() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
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

  return (
    <View style={styles.container}>
      <Text>Latitude: {lat}</Text>
      <Text>Longitude: {long}</Text>
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
});

export default LocationScreen;
