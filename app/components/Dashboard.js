import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, Animated, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { Switch, Route, Link } from 'react-router-native';

import AnimatedChild from './animation/AnimatedChild';
import AnimatedParent from './animation/AnimatedParent';
import AnimatedContainer from './animation/AnimatedContainer';
import AnimatedChildHeader from './animation/AnimatedChildHeader';
import AnimatedParentHeader from './animation/AnimatedParentHeader';
import { Header, DefaultHeader, XploreIcon, Content } from './common';
import Gallery from './Gallery';
import Notifications from './Notifications';

const Container = styled.View`
  flex: 1;
`;

const LinkContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20;
`;

class InternalContainer extends Component {
  render() {
    const { match, location, animating, animation } = this.props;

    return (
      <Container>
        <AnimatedParentHeader animation={animation}>
          <DefaultHeader url={match.url} title={'XPLORE'} />
        </AnimatedParentHeader>
        <AnimatedChildHeader animation={animation} atParent={match.isExact} animating={animating}>
          <Switch location={location}>
            <Route
              path="/dashboard/gallery"
              render={props => <Header title="GALLERY" {...props} />}
            />
            <Route
              path="/dashboard/notifications"
              render={props => <Header title="NOTIFICATIONS" {...props} />}
            />
          </Switch>
        </AnimatedChildHeader>
        <AnimatedParent animation={animation}>
          <ScrollView>
            <Content>
              <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Fusce varius iaculis dolor, sit amet fringilla ante suscipit ut.
              Vestibulum a pellentesque sem, sodales interdum sem.
              Donec in justo at leo laoreet semper. Fusce id lorem sit amet mauris vulputate
              mattis. Duis quis faucibus dolor. Mauris scelerisque justo ut metus
              consectetur pretium. Nulla facilisi.</Text>
              <LinkContainer>
                <View>
                  <Link to="/dashboard/gallery" component={TouchableOpacity}>
                    <XploreIcon type="EvilIcons" name="image" size={50} color={'steelblue'} />
                  </Link>
                  <Text>Gallery</Text>
                </View>
                <View>
                  <Link to="/dashboard/notifications" component={TouchableOpacity}>
                    <XploreIcon type="EvilIcons" name="sc-telegram" size={50} color={'steelblue'} />
                  </Link>
                  <Text>Notifications</Text>
                </View>
              </LinkContainer>
              <LinkContainer>
                <View>
                  <Link to="/auth/login" component={TouchableOpacity}>
                    <Text>Login</Text>
                  </Link>
                </View>
              </LinkContainer>
            </Content>
          </ScrollView>
        </AnimatedParent>
        <AnimatedChild
          animation={animation}
          atParent={match.isExact}
          animating={animating}
        >
          <Switch location={location}>
            <Route path="/dashboard/gallery" component={Gallery} />
            <Route path="/dashboard/notifications" component={Notifications} />
          </Switch>
        </AnimatedChild>
      </Container>
    );
  }
}

InternalContainer.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  animating: PropTypes.bool.isRequired,
  animation: PropTypes.instanceOf(Animated.constructor).isRequired,
};

const Dashboard = AnimatedContainer(InternalContainer);

export { Dashboard as default };
