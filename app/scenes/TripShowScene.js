'use strict'

import React, { Component } from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import _ from 'lodash'

import ViewContainer from '../containers/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'

export default class PeopleIndexScene extends Component {

  _goBack() {
    this.props.navigator.pop()
  }

  render() {
    return (
      <ViewContainer style={{backgroundColor: 'aliceblue'}}>
        <StatusBarBackground></StatusBarBackground>
        <TouchableOpacity onPress={(event) => this._goBack()}><Text>back</Text></TouchableOpacity>
        <Text>Trip Show</Text>
        <Text>{_.capitalize(this.props.trip.name)}</Text>
      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({

})
