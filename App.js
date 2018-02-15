import React, { Component } from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import styles from './styles';

const ScreenZero = props => <View style={styles.screen0}><Text>Screen 0</Text></View>;
const ScreenOne = props => <View style={styles.screen1}><Text>Screen 1</Text></View>;
const ScreenTwo = props => <View style={styles.screen2}><Text>Screen 2</Text></View>;

const exampleList = new Array(1000).fill(undefined).map((value, index) => ({ key: index, label: `List Item ${index}` }));

class LazyScreen extends Component {
  // Should render a placeholder component until it receives didFocus event,
  // then it should display a slow to render list
  state = { loaded: false };

  constructor(...args) {
    super(...args);
    this.props.navigation.addListener('didFocus', () => {
      if(!this.state.loaded) {
        this.setState({ loaded: true });
      }
    });
  }

  render() {
    return this.state.loaded
      ? <ScrollView style={styles.slowScreen}>
          {exampleList.map(item => <Text key={item.key}>{item.label}</Text>)}
        </ScrollView>
      : <ActivityIndicator size={'large'} style={{ padding: 16 }} />;
  }
}

const Tabs = TabNavigator({
  Zero: { screen: ScreenZero },
  One: { screen: ScreenOne },
  Two: { screen: ScreenTwo },
  Lazy: { screen: LazyScreen },
});

export default class App extends Component {
  render() {
    return <Tabs />;
  }
}