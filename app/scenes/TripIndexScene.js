'use strict'

import React, { Component } from 'react';
import {Text, View, StyleSheet, ListView, TouchableOpacity, Navigator} from 'react-native'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'

import ViewContainer from '../containers/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'

const trips = [
  {name: 'hawaii', types: ['tropical', 'adventure', 'relaxing']},
  {name: 'thailand', types: ['tropical', 'adventure', 'relaxing']},
  {name: 'jamaica', types: ['tropical', 'relaxing']}
]

export default class TripIndexScene extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      tripDataSource: ds.cloneWithRows(trips)
    }
  }

  render() {
    return (
      <ViewContainer>
        <StatusBarBackground></StatusBarBackground>
        <Text style={styles.tripsIndexTitle}>My Trips</Text>
        <ListView
          dataSource={this.state.tripDataSource}
          renderRow={(person) => this._renderTripRow(person)} />
      </ViewContainer>
    );
  }

  _renderTripRow(trip) {
    return (
      <TouchableOpacity style={styles.tripRow} onPress={(event) => this._navigateToTripShow(trip)}>
        <Text style={styles.tripName}>{_.capitalize(trip.name)}</Text>
        <View style={{flex: 1}}></View>
        <Icon name="chevron-right" style={styles.tripMoreIcon}/>
      </TouchableOpacity>
    )
  }

  _navigateToTripShow(trip) {
    this.props.navigator.push({
      ident: 'TripShow',
      trip,
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom
    })
  }
}

const styles = StyleSheet.create({
  tripsIndexTitle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },

  tripRow: {
    flexDirection: 'row',
    margin: 5,
    padding: 20,
    borderWidth: 1
  },

  tripName: {

  },

  tripMoreIcon: {
    color: 'skyblue',
    height: 20,
    width: 20,
  }
})
