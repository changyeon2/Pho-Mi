
//import React from 'react';
//import {ImageBackground, StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {
  ImageBackground, StyleSheet, Text, View, Image, TouchableHighlight
} from 'react-native';

export default class StartScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerTintColor: '#F36',
    headerStyle: {
      backgroundColor: '#f2c1f5'
    },
  };

  _pushSignIn(){
    this.props.navigation.push('SignIn');
  }

  _pushCreate(){
    this.props.navigation.push('CreateAcc')
  }

  render() {
    return (
      <View>
        <ImageBackground source={require('../assets/images/startscreen.png')} style={styles.content}>
          <View style={styles.header}>
           
            <Text style={styles.headerColor}>
                Pho-Mi
            </Text>
            <Text style={styles.headerColor2}>
                Photo Mission
            </Text>
           
          </View>
          <View style={{top: 394, left: 55.51}}>
              <TouchableHighlight style={styles.button} onPress={this._pushSignIn.bind(this)} underlayColor="white">
                  <Text style={styles.buttonText}>Sign in</Text>        
              </TouchableHighlight>
          </View>
          <View style={{top: 456, left: 55.51}}>
              <TouchableHighlight style={styles.button} onPress={this._pushCreate.bind(this)} underlayColor="white">
                  <Text style={styles.buttonText}>Create an account</Text>
              </TouchableHighlight>
          </View>
          </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    position : 'absolute',
    top: 208,
    left: 63,
    height: 82,
    width: 249,
    //backgroundColor: '#ff9a9a',
  },
  content: {
    width: '100%', 
    height: '100%'
  },
  headerColor:{
    color: "#000",
    //fontFamily: "Segoe Print",
    fontSize: 40,
    lineHeight: 40,
    textAlign: "center",
    color: "#F36"
  },
  headerColor2:{
    color: "#000",
    //fontFamily: "Segoe Print",
    fontSize: 30,
    lineHeight: 40,
    textAlign: "center",
    color: "#F36"
  },
  button: {
    position : 'absolute',
    height: 44,
    width: 267,
    borderRadius: 8,
    backgroundColor: '#FFFFFF'
    //background: "linear-gradient(90deg, rgba(177,197,242,0.7) 0%, #FFF 100%)"
    //backgroundColor: '#d6ca1a',
  },
  buttonText: {
    marginTop: 10,
    fontSize : 18,
    textAlign: "center"
  }
});