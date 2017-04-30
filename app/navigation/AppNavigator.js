'use strict'

import React, { Component } from 'react';
import {Navigator, StyleSheet, Text} from 'react-native'

import TripIndexScene from '../scenes/TripIndexScene'
import TripShowScene from '../scenes/TripShowScene'

export default class AppNavigator extends Component {

  _renderScene(route, navigator) {
    const globalNavigatorProps = { navigator }

    switch(route.ident) {
      case 'TripIndex':
        return (
          <TripIndexScene
            {...globalNavigatorProps}/>
        )
      case 'TripShow':
        return (
          <TripShowScene
            {...globalNavigatorProps}
            trip={route.trip}/>
        )
      default:
        return (
          <Text>{`Yo you messed something up`}</Text>
        )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={this.props.initialRoute}
        ref="appNavigator"
        style={styles.navigatorStyles}
        renderScene={this._renderScene}
        configureScene={(route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight,
        })} />
    )
  }
}

const styles = StyleSheet.create({
  navigatorStyles: {

  }
})
