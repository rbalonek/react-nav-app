import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import "@expo/match-media";

export default function AdviceFromCats() {
  const [decision, setDecision] = useState("");
  const [advice, setAdvice] = useState("");
  const [kitten, setKitten] = useState(null);
  const [adviceAnimation, setAdviceAnimation] = useState("flipInY");
  const [kittenAnimation, setKittenAnimation] = useState("flipInX");
  const [yesNoAnimation, setYesNoAnimation] = useState("bounceInDown");

  const fetchDecisions = () => {
    fetch("https://yesno.wtf/api", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setDecision(response.answer);
        setYesNoAnimation("fadeOut");
        setYesNoAnimation("bounceInDown");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAdvice = () => {
    fetch("https://api.adviceslip.com/advice", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setAdvice(response.slip.advice);
        setAdviceAnimation("fadeOut");
        setAdviceAnimation("flipInY");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchKitten = () => {
    fetch(`https://aws.random.cat/meow`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setKitten(response.file);
        setKittenAnimation("fadeOut");
        setKittenAnimation("flipInX");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const buttonPress = () => {
    setYesNoAnimation("fadeOut");
    fetchAdvice();
    fetchKitten();
  };

  const yesNoButton = () => {
    setAdviceAnimation("fadeOut");
    fetchDecisions();
    fetchKitten();
  };

  return (
    <View style={styles.container}>
      <View style={styles.yesNoContainer}>
        {decision ? (
          <Animatable.View animation={yesNoAnimation}>
            <Animatable.Text style={styles.yesNo}>{decision}</Animatable.Text>
            <Image
              style={styles.yesNoWordBubble}
              source={require("../../assets/WordBubbleSide.png")}
            />
          </Animatable.View>
        ) : (
          <View>
            <Text></Text>
          </View>
        )}
      </View>

      {advice ? (
        <Animatable.View
          style={styles.adviceContainer}
          animation={adviceAnimation}
        >
          <Text style={styles.adviceText}>{advice}</Text>
          <Image
            style={styles.adviceWordBubble}
            source={require("../../assets/WordBubbleSide.png")}
          />
        </Animatable.View>
      ) : (
        <View style={styles.advice}>
          <Text></Text>
        </View>
      )}

      <Animatable.View
        style={styles.kittenContainer}
        animation={kittenAnimation}
      >
        <Image
          style={styles.kittens}
          source={{
            uri: `${kitten}`,
          }}
        />
      </Animatable.View>

      <Animatable.View style={styles.buttonContainer} animation="zoomIn">
        <TouchableOpacity style={styles.button} onPress={buttonPress}>
          <Text style={styles.buttonText}>Advice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={yesNoButton}>
          <Text style={styles.buttonText}>Yes or No?</Text>
        </TouchableOpacity>
      </Animatable.View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  adviceWordBubble: {
    position: "relative",
    top: "-29%",
    height: 290,
    zIndex: -1,
  },
  adviceContainer: {
    position: "relative",
    top: "0%",
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 998,
  },
  adviceText: {
    color: "black",
    position: "relative",
    top: "20%",
    right: "-0%",
  },

  yesNoWordBubble: {
    position: "relative",
  },
  yesNoContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    top: "0%",
  },
  yesNo: {
    fontSize: 50,
    position: "relative",
    top: "45%",
    right: "-20%",
    zIndex: 999,
  },

  kittenContainer: {
    position: "relative",
    bottom: "0%",
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 1,
    zIndex: 999,
  },
  kittens: {
    height: "50%",
    width: 200,
    position: "relative",
    bottom: "-4%",
    borderRadius: 50,
    zIndex: 999,
  },
  buttonContainer: {
    position: "absolute",
    bottom: "5%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 999,
  },
  button: {
    position: "relative",
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#0645AD",
    borderBottomWidth: 4,
    borderRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 1.0,
    zIndex: 999,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    width: "100%",
  },
});