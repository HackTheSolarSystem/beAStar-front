/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import {
  ViroARSceneNavigator,
} from 'react-viro';

var createReactClass = require('create-react-class');

var apiKey = "608C47E8-0E44-41D2-BB4B-79DFF316C0E4";

var arScenes = {
  'player1': require('./js/ARCarDemo'),
  'player2': require('./js/ARCarDemo'),
}

var ViroPlayerSceneNavigator = createReactClass({
  render: function() {

    return (
      <ViroARSceneNavigator
        initialScene={{
          scene: arScenes['player1'],
        }}
        apiKey={apiKey} />
      );
  }
});

module.exports = ViroPlayerSceneNavigator;
