import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Fragment, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Dimensions,
} from "react-native";
import { useEffect } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker, Circle } from "react-native-maps";
export default function Map({ socket, setBool }) {
  const [pin, setPin] = useState({ latitude: 30.1925, longitude: 91.699 });
  useEffect(() => {
    console.log("heueue");
    socket.on("receive_location", (location) => {
      setPin({ latitude: location.latitude, longitude: location.longitude });
    });
    socket.on("receive_disconnect", (disc) => {
      socket.disconnect();
      setBool(false);
    });
  }, [socket]);

  useEffect(() => {
    const run = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
    };
    run();
  }, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} showsUserLocation={true}>
        <Marker
          coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
        />
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.05,
    borderRadius: 6,
    // justifyContent: 'center',
  },
  map: {
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.6,
    //paddingTop: Dimensions.get('window').height*0.1,
  },
});
