import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
//import HomeScreen from '../screens/HomeScreen';

import LinksScreen from '../screens/LinksScreen';
import LinksScreen2 from '../screens/LinksScreen2';
import LinksScreen3 from "../screens/LinksScreen3";
import LinksScreen4 from "../screens/LinksScreen4";
import LinksScreen5 from "../screens/LinksScreen5";
import LinksScreen6 from "../screens/LinksScreen6";
import StartScreen from '../screens/startscreen';

import CreateAccount from '../screens/create_account';

import Profile from '../screens/profile';
import MissionHome from '../screens/mission_home';
import MissionFood from '../screens/missionFood';

import SettingsScreen from '../screens/SettingsScreen';


const HomeStack = createStackNavigator({

  Start : StartScreen,
  CreateAcc : CreateAccount,
  Profile : Profile,
  MissionHome : MissionHome,
  //MissionFood : MissionFood,
  Photo : LinksScreen,
  Photo2 : LinksScreen2,
  Photo3 : LinksScreen3,
  Photo4 : LinksScreen4,
  Photo5 : LinksScreen5,
  Photo6 : LinksScreen6,

});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};


/*
const LinksStack = createStackNavigator({
 
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};
*/
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  //LinksStack,
  //SettingsStack,
});
