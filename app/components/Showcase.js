import React, { Component } from 'react';
import { Alert, ScrollView } from 'react-native';

import styled from 'styled-components/native';

import * as Common from './common';
import { FieldGroup, TextInput } from './form';

// Setup Button Components
const { Button, Link, PrimaryButton } = Common;
const onButtonPress = () => Alert.alert('Button Press', 'Crazy result of a button press');

// Setup Header Components
const { DefaultHeader, Header } = Common;
const goBack = () => Alert.alert('Header Back Button', 'Imagine changing scenes right now ;)');
const history = { goBack };

// Setup Icon Components
const { XploreIcon } = Common;

// Setup Text Components
const { H1, H2, H3, H4 } = Common;
const { Em, Del, P, Strong, Text, U } = Common;

// Styled Sections
const Section = styled.View`
  margin-vertical: 10;
  padding-horizontal: 10;
`;

const SectionContent = styled.View`
  margin-bottom: 5;
`;

const SectionTitle = styled.Text`
  color: #333;
  font-size: 36;
  line-height: 38;
  font-weight: bold;
  padding-bottom: 10;
`;

class Showcase extends Component {
  render() {
    return (
      <ScrollView>
        <Section>
          <SectionTitle>Common</SectionTitle>

          <SectionContent>
            <H3>Buttons</H3>
            <Button text="Default" onPress={onButtonPress} />
            <PrimaryButton text="Primary" onPress={onButtonPress} />
            <Button onPress={onButtonPress}>
              <XploreIcon type="EvilIcons" name="trophy" color="steelblue" size={32} />
            </Button>
            <Link onPress={onButtonPress} text="Link" />
            <P><Em>Note that Link is still padded making it easy to touch.</Em></P>
          </SectionContent>

          <SectionContent>
            <H3>Headers</H3>
            <DefaultHeader title="Default Header" />
          </SectionContent>
          <SectionContent>
            <Header title="Header (Press Back)" history={history} />
          </SectionContent>

          <SectionContent>
            <H3>Icons</H3>
            <XploreIcon size={32} color="steelblue" type="EvilIcons" name="trophy" />
            <XploreIcon size={32} color="steelblue" type="FontAwesome" name="trophy" />
          </SectionContent>

          <SectionContent>
            <H3>Typography</H3>

            <H1>H1 Component</H1>
            <H2>H2 Component</H2>
            <H3>H3 Component</H3>
            <H4>H4 Component</H4>

            <P>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eleifend id odio {}
              non volutpat. Cras eget ultrices orci. Ut ut enim tempor, interdum ipsum id, {}
              condimentum velit. Praesent mattis ipsum et consequat condimentum. Curabitur nec {}
              massa in mauris semper bibendum nec et massa.
            </P>

            <P>
              Note how the P component has spacing below it. You can <Em>decorate/emphasize</Em> {}
              text. <Strong>Strengthen important text</Strong>. <U>Underline text</U>, because {}
              why not? Or <Del>strike out text</Del>.
            </P>

            <P>In other cases, it makes sense to have text that has no spacing applied to it.</P>
            <Text>The Text tag has no padding or margin applied to it.</Text>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Forms</SectionTitle>
          <SectionContent>
            <H3>Sample FieldGroups</H3>
            <FieldGroup component={TextInput} label="Email" placeholder="john.doe@gmail.com" />
            <FieldGroup
              component={TextInput}
              label="Password"
              placeholder="Password"
              secureTextEntry
            />
          </SectionContent>

          <SectionContent>
            <H3>Redux Form</H3>
            <P>
              By default FieldGroup will work with the properties passed in from redux-form. The {}
              wrapped component will also be passed all these properties.
            </P>

            <FieldGroup
              component={TextInput}
              label="Email (w/ Error)"
              placeholder="john.doe@gmail.com"
              meta={{ error: 'Please provide your email' }}
            />

            <FieldGroup
              component={TextInput}
              label="Email (Focused ;))"
              meta={{ active: true }}
              placeholder="john.doe@gmail.com"
            />
          </SectionContent>
        </Section>
      </ScrollView>
    );
  }
}

export { Showcase as default };
