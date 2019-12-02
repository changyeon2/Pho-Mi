import React from 'react';
import {KeyboardAvoidingView, TextInput, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import {insertUserData} from './server';

export default class createAccount extends React.Component {
    static navigationOptions = {
        title: 'Sign up',
      };

    state = {
        email: "",
        password: "",
        name: "",
        IsSuccess : 0,
      };
    
    _handleEmail = text => {
        this.setState({ email: text });
    };
    
    _handleName = text => {
        this.setState({ name: text });
    };

    _handlePassword = text => {
        this.setState({ password: text });
    };

    _SignUp = () => {
        alert("Sign Up Success");
      };

    _pushContinue(){
    this._insertIntoDB();
    this.props.navigation.push('Profile', {user : this.state.name, IsSuccess : this.state.IsSuccess}, // unique ID registered with Navigation.registerScreen
      //title: 'Profile', // navigation bar title of the pushed screen (optional)
      //passProps: {}, // Object that will be passed as props to the pushed screen (optional)
    );

  }

  _insertIntoDB(){
    insertUserData(this.state.name);
  }

    render() {

    return (
      <KeyboardAvoidingView>
          <View style={styles.header, {top: 33, left: 0}}>
            <Text style={styles.headerText}>
                Get Started
            </Text>
          </View>
          <View style={styles.textBox, {top: 75, left: 23}}>
            <Text style={styles.Text}>
                Email Address
            </Text>
          </View>
          <View style={{height: 15, width: 328, top: 115, left: 23}}>
            <TextInput
                style = {styles.textBox} // 패딩??
                //underlineColorAndroid="transparent"
                placeholder= "Write your email"
                placeholderTextColor='#9a73ef'
                autoCapitalize="none"
                onChangeText={this._handleEmail}
            />
          </View>
          <View style={styles.content, { top: 185, left: 23}}>
            <Text style={styles.Text}>
                Name
            </Text>
          </View>
          <View style={{height: 15, width: 328, top: 225, left: 23}}>
            <TextInput
                style = {styles.textBox} // 패딩??
                //underlineColorAndroid="transparent"
                placeholder= "Write your Name"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={this._handleName}
            />
          </View>
          <View style={styles.content, {top: 300, left: 23}}>
            <Text style={styles.Text}>
                Password
            </Text>
          </View>
          <View style={{height: 15, width: 328, top: 340, left: 23}}>
            <TextInput
                style = {styles.textBox} // padding 어떻게??
                //underlineColorAndroid="transparent"
                placeholder= "Write your password"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={this._handlePassword}
            />
          </View>
          <View style={{top: 435, left: 76}}>
              <TouchableOpacity style={styles.button} onPress={this._pushContinue.bind(this)} active={0.8}>
                  <Text style={styles.buttonText}>Create an account</Text>
              </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    header: {
        height: 72,
        width: 125,
    },
    headerText:{
        color: '#000',
        //font-family: "Book Antiqua".
        fontSize: 25,
        lineHeight: 30,
        textAlign: 'center'
    },
    content: {
        backgroundColor: '#000'
        //font-family: "Book Antiqua";
    },
    Text: {
        fontSize: 15,
        lineHeight: 18,
        //textAlign: 'center'
    },
    textBox: {
        height : 44,
        width : 328,
        backgroundColor: '#C8C8C8'
    },
    button: {
        height: 40, 
        width: 225,
        borderRadius: 8,
        backgroundColor:'#FFC8FF'
    }, 
    buttonText: {
        marginTop: 6.5,
        //font-family: "Arial Rounded MT Bold";
        fontSize: 20,
        lineHeight: 23,
        textAlign: 'center',
       //backgroundColor: '#C8C8C8'
    }
});