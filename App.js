import { StatusBar } from "expo-status-bar";
import { Fragment, useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import io from "socket.io-client";
import Map from "./Component/Map";

let socket;
export default function App() {
  const [busNo, setBusNo] = useState("");
  const [bool, setBool] = useState(false);
  const startHandler = () => {
    setBool(true);
  };
  if (bool) {
    socket = io.connect("https://iitg-bus-track.herokuapp.com");
    socket.emit("join", busNo, () => {
      socket.disconnect();
      setBool(false);
      console.log("Bus is offline");
    });
  }
  const stopHandler = () => {
    console.log("df");
    socket.disconnect();
    setBool(false);
  };

  return (
    <View style={styles.container}>
      <Text>Happy Hacking</Text>
      {!bool && (
        <Fragment>
          <TextInput
            placeholder="Enter the bus No."
            onChangeText={(busno) => {
              setBusNo(busno);
            }}
          />
          <Button title="Start" onPress={startHandler} />
        </Fragment>
      )}
      {bool && <Map socket={socket} setBool={setBool} />}
      {bool && <Button title="Stop" onPress={stopHandler}></Button>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
