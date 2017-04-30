'use strict'

import React, { Component } from 'react';
import {AppRegistry, Navigator, StyleSheet, Text, TabBarIOS} from 'react-native'

import AppNavigator from './app/navigation/AppNavigator'

export default class TravelPlanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'tripIndex'
    }
  }

  render() {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}>

        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tripIndex'}
          title={`View Trips`}
          onPress={() => this.setState({selectedTab: 'tripIndex'})}>

          <AppNavigator
            initialRoute={{ ident: 'TripIndex'}} />

        </TabBarIOS.Item>

        <TabBarIOS.Item
          selected={this.state.selectedTab === 'tripShow'}
          title={`Hawaii`}
          onPress={() => this.setState({selectedTab: 'tripShow'})}>

          <AppNavigator
            initialRoute={{ ident: 'TripShow', trip: {name: 'Hawaii'}}} />

        </TabBarIOS.Item>


      </TabBarIOS>
    )
  }
}

const styles = StyleSheet.create({
  navigatorStyles: {

  }
})


AppRegistry.registerComponent('TravelPlanner', () => TravelPlanner);
