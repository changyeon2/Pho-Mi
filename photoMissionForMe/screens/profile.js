import React from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, mysql} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import { updateUserSuccess ,readUserSuccess, readUserSuccess_forUpdate} from './server';
import firebase from "../utils/firebase";
import GLOBAL from './global.js';
//https://stackoverflow.com/questions/44227235/global-state-in-react-native

export default class profile extends React.Component  {
    static navigationOptions = {
        title: 'Proflie'
      };

    state = {
      user : "",
      IsSuccess : "",
      level : "",
    };

    componentDidMount() {
      var self = this;
      this.props.navigation.addListener(
        'didFocus',
        payload => {
          this.forceUpdate();
        }
      );
      readUserSuccess_forUpdate(this.state.user).then(data=>{
        console.log("profile DidMount: " + data);
        self.setState({IsSuccess : data})
      });
      
    }

    constructor(props) {
      super(props)
      const {navigation} = this.props;
      this.state = {
          user: navigation.getParam('user'),
          IsSuccess : navigation.getParam('IsSuccess'),
      }
     
  }

    _push_mission_home(){
    this.props.navigation.push(
      'MissionHome', {user : this.state.user, IsSuccess: this.state.IsSuccess} // unique ID registered with Navigation.registerScreen
      //이거 이런 식으론 어떻게 하나?title: 'Mission Home', // navigation bar title of the pushed screen (optional)
      //passProps: {}, // Object that will be passed as props to the pushed screen (optional)
    )
  }

    
    render() {
      GLOBAL.screen1 = this;
      //console.log("profile set GLOBAL: " + JSON.stringify(GLOBAL.screen1));

    return (
      <View>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require("../assets/images/profile.png")
                  : require("../assets/images/profile.png")
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={{top: 0, left: 60}}>
            <Text style={styles.Text}>
          
            Nickname: {this.state.user}{'\n'}{'\n'}Level: {this.state.IsSuccess}{'\n'}{'\n'}Rank: Silver{'\n'}{'\n'}Coin: {this.state.IsSuccess*1000}$
            </Text>
          </View>
          <View style={{top: 40, left: 81}}>
              <TouchableHighlight style={styles.button} onPress={this._push_mission_home.bind(this)} underlayColor="white">
                  <Text style={styles.buttonText}>Mission</Text>
              </TouchableHighlight>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    circle: {
        height: 218,
        width: 218,
        borderRadius: 218/2,
        backgroundColor : '#C8C8C8'

        // circle 자체로 top, left 정해주는 법?? // circle에 그냥 top, left 줘버리면 아무것도 안나옴
    },
    Text: {
        fontSize : 20,
        lineHeight : 22
    },
    button: {
        height: 121,
        width: 211,
        backgroundColor: '#FFC8FF',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    welcomeContainer: {
      alignItems: "center",
      marginTop: 10,
      marginBottom: 0
    },
    welcomeImage: {
      width: 200,
      height: 300,
      resizeMode: "contain",
      marginTop: 3,
      marginLeft: -10
    },
    buttonText: {
        height: 33,
        width: 166.88,
        color: '#000',
        //font-family: "Arial Rounded MT Bold";
        fontSize: 30,
        lineHeight: 35,
        textAlign: 'center'
    }
    
});