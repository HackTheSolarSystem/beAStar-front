"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import { interval } from "rxjs";
import { flatMap } from "rxjs/operators";

import {
  ViroARScene,
  ViroMaterials,
  ViroNode,
  ViroAnimations,
  ViroLightingEnvironment,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroSphere
} from "react-viro";

const API_URL = "http://d2bc713f.ngrok.io/colors";

var createReactClass = require("create-react-class");

// For debugging: this is how the response data is shaped
// const FIXTURE_DATA = [
//   {
//     _id: "5c603b9c5d0926281005f799",
//     color: "blue",
//     weight: 13923,
//     planet: 30,
//     distance: 10,
//     __v: 0
//   },
//   {
//     _id: "5c603ba65d0926281005f79a",
//     color: "green",
//     weight: 19890,
//     planet: 5.972,
//     distance: 1196.8,
//     __v: 0
//   },
//   {
//     _id: "5c603f02fea813050038882c",
//     color: "red",
//     weight: 18630.552,
//     planet: 30,
//     distance: 0,
//     __v: 0
//   }
// ];

var ARCarDemo = createReactClass({
  getInitialState() {
    return {
      texture: "white",
      playAnim: false,
      animateCar: false,
      rotationPiv: [0, 0, 0],
      orbitAnim: false,
      playDisappear: false,
      fetchedData: [],
      playerColor: this.props.sceneNavigator.viroAppProps.color,
      playerData: {}
    };
  },
  componentDidMount() {
    // REST API
    this.subscription$ = interval(2000)
      .pipe(
        flatMap(() => fetch(API_URL)),
        flatMap(response => response.json())
      )
      .subscribe(players => {
        this.setState({
          fetchedData: players,
          playerData: players.find(player => player.color === this.state.playerColor)
        });
      });
  },
  componentWillUnmount() {
    this.subscription.unsubscribe();
  },
  // sphere 1
  // onClick={this._selectGrey}
  // animation={{name:"tapAnimation", run:this.state.tapGrey, onFinish:this._animateFinished}}
  //
  // sphere 2
  // animation={{name:"orbit", run:true, loop:true}}

  // <ViroSphere materials={["blue_sphere"]}
  //   heightSegmentCount={20} widthSegmentCount={20} radius={.07}
  //   position={[0, -0.5, 0]}
  //   shadowCastingBitMask={0} />

  // <ViroSphere materials={["red_sphere"]}
  //   heightSegmentCount={20} widthSegmentCount={20} radius={.07}
  //   position={[-0.5, 0, 0]}
  //   shadowCastingBitMask={0} />
  render: function() {
    return (
      <ViroARScene>
        <ViroLightingEnvironment
          source={require("./res/tesla/garage_1k.hdr")}
        />

        <ViroARImageMarker
          target={"logo"}
          onAnchorFound={this._onAnchorFound}
          onAnchorUpdated={this._onAnchorFound}
          pauseUpdates={this.state.pauseUpdates}
        >
          <ViroNode
            scale={[0.5, 0.5, 0.5]}
            animation={{
              name: "orbit",
              loop: true,
              run: this.state.animateCar
            }}
          >
            <ViroSphere
              materials={["yellow_sphere"]}
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.1}
              position={[0, 0, 0]}
              shadowCastingBitMask={0}
            />

            <ViroSphere
              materials={["grey_sphere"]}
              heightSegmentCount={20}
              widthSegmentCount={20}
              radius={0.05}
              position={[0, 0.2, 0]}
              shadowCastingBitMask={0}
              onClick={this._disappearAnimation}
              animation={{name:"tapAnimation",
                run:this.state.playDisappear,
                loop:false, delay:3000,
                onFinish:this._onAnimationFinished}}/>
          </ViroNode>
        </ViroARImageMarker>
      </ViroARScene>
    );
  },
  _onAnchorFound(anchor) {
    this.setState({
      animateCar: true,
      rotationPiv: anchor.position,
      orbitAnim: true
    });

    let distance = 0;
    for (let i = 0; i < anchor.position.length; i++) {
      distance += anchor.position[i] * anchor.position[i];
    }
    console.log("hi");
    console.log(anchor);
    console.log(distance);

    fetch('http://d2bc713f.ngrok.io/red?distance='+distance, {method: 'PUT'});
  },
  _disappearAnimation() {
      this.setState({
      playDisappear: true
      })
    },
    _onAnimationFinished(){
      console.log("Animation has finished!");
    },
});

ViroMaterials.createMaterials({
  white_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(231,231,231)"
  },
  blue_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(19,42,143)"
  },
  grey_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(75,76,79)"
  },
  red_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(168,0,0)"
  },
  yellow_sphere: {
    lightingModel: "PBR",
    diffuseColor: "rgb(200,142,31)"
  }
});

ViroARTrackingTargets.createTargets({
  logo: {
    source: require("./res/logo.png"),
    orientation: "Up",
    physicalWidth: 0.15 // real world width in meters
  }
});

ViroAnimations.registerAnimations({
    orbit:{properties:{rotateZ:"+=45"},
                  duration:1000}, //add 45 degrees to the y angle of the component every 1 second
    disappear:{properties:{opacity:0}, duration:300},
    scaleUp:{properties:{scaleX:1, scaleY:1, scaleZ:1,},
                  duration: 500, easing: "bounce"},
    scaleDown:{properties:{scaleX:0, scaleY:0, scaleZ:0,},
                  duration: 200,},
    scaleSphereUp:{properties:{scaleX:.8, scaleY:.8, scaleZ:.8,},
                  duration: 50, easing: "easeineaseout"},
    scaleSphereDown:{properties:{scaleX:1, scaleY:1, scaleZ:1,},
                  duration: 50, easing: "easeineaseout"},
    tapAnimation:[["scaleSphereUp", "scaleSphereDown", "disappear"],]
});

module.exports = ARCarDemo;
