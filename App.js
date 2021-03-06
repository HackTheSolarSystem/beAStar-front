import React, { Component } from "react";
import { ViroARSceneNavigator } from "react-viro";

import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { VIRO_API_KEY } from "./credentials";

var sharedProps = {
  apiKey: VIRO_API_KEY
};

// Sets the default scene you want for AR and VR
var InitialARScene = require("./js/ARCarDemo");

var UNSET = "UNSET";
var AR_NAVIGATOR_TYPE = "AR";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

const COLORS = {
  // enum of marker identifiers
  A: "yellow",
  B: "blue" // don't use me since backend will always target this
};

export default class ViroPlayerSceneNavigator extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      color: COLORS.A, // default color
      sharedProps: sharedProps
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
    this._exitViro = this._exitViro.bind(this);
  }

  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    }
  }

  _getExperienceSelector() {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>Pick your star color!</Text>
          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(
              AR_NAVIGATOR_TYPE,
              COLORS.A
            )}
            underlayColor={"#68a0ff"}
          >
            <Text style={localStyles.buttonText}>{COLORS.A}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(
              AR_NAVIGATOR_TYPE,
              COLORS.B
            )}
            underlayColor={"#68a0ff"}
          >
            <Text style={localStyles.buttonText}>{COLORS.B}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
        viroAppProps={{ color: this.state.color }}
      />
    );
  }

  _getExperienceButtonOnPress(navigatorType, color) {
    return () => {
      this.setState({
        navigatorType: navigatorType,
        color
      });
    };
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: "black"
  },
  outer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black"
  },
  inner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "black"
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: "#fff",
    textAlign: "center",
    fontSize: 25
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

module.exports = ViroPlayerSceneNavigator;
