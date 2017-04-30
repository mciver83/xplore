'use strict'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

class ViewContainer extends Component {
  render() {
    return (
      <View style={[styles.viewContianer, this.props.style || {}]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({

  viewContianer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  }

})

module.exports = ViewContainer
