import React from 'react';
import {KeyboardAvoidingView, TextInput, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';
// import LinearGradient from 'react-native-linear-gradient';

export default class MissionHome extends React.Component {
    static navigationOptions = {
        title: 'Mission Home',
      };

      state = {
        user : "",
        IsSuccess : 0,
      };

      constructor(props) {
        super(props)
        const {navigation} = this.props;
        this.state = {
            user: navigation.getParam('user'),
            IsSuccess : navigation.getParam('IsSuccess'),
        }
    };

      //  위이거 gotoprofile 함수 만들어서 콜 하면 안 되나?
/*
    _pushMission = content => {
        this.props.navigation.push('Photo' + content)
    };
*/
    _pushMission() {
        this.props.navigation.push('Photo', {user : this.state.user, IsSuccess: this.state.IsSuccess})
    };
    _pushMission2() {
        this.props.navigation.push('Photo2',{user : this.state.user, IsSuccess: this.state.IsSuccess})
    };
    _pushMission3() {
        this.props.navigation.push('Photo3',{user : this.state.user, IsSuccess: this.state.IsSuccess})
    };
    _pushMission4() {
        this.props.navigation.push('Photo4',{user : this.state.user, IsSuccess: this.state.IsSuccess})
    };
    _pushMission5() {
        this.props.navigation.push('Photo5',{user : this.state.user, IsSuccess: this.state.IsSuccess})
    };
    _pushMission6() {
        this.props.navigation.push('Photo6',{user : this.state.user, IsSuccess: this.state.IsSuccess})
    };
    _gotoProfile(){
        this.props.navigation.navigate('Profile', {user : this.state.user, IsSuccess : this.state.IsSuccess})
    }


    render() {
    return (
      <View>
          
          <View style={{flexDirection: 'row', top: 18, left: 10}}>
              <TouchableOpacity style={styles.button} onPress={this._pushMission.bind(this)} active={0.8}>
              <View style={styles.welcomeContainer}>
              <Image
              source={
                __DEV__
                  ? require("../assets/images/flower.png")
                  : require("../assets/images/flower.png")
              }
              style={styles.welcomeImage}
              
            />
            <Text style={styles.buttonText}>Flower</Text>
          </View>

              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={this._pushMission2.bind(this)} active={0.8}>
              <Image
              source={
                __DEV__
                  ? require("../assets/images/leaf.png")
                  : require("../assets/images/leaf.png")
              }
              style={styles.welcomeImage}
            />
                  <Text style={styles.buttonText}>Leaf</Text>
              </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', top: 48, left: 10}}>
              <TouchableOpacity style={styles.button} onPress={this._pushMission3.bind(this)} active={0.8}>
              <Image
              source={
                __DEV__
                  ? require("../assets/images/dog.jpg")
                  : require("../assets/images/dog.jpg")
              }
              style={styles.welcomeImage}
            />
                  <Text style={styles.buttonText}>Dog</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={this._pushMission4.bind(this)} active={0.8}>
              <Image
              source={
                __DEV__
                  ? require("../assets/images/pizza.jpg")
                  : require("../assets/images/pizza.jpg")
              }
              style={styles.welcomeImage}
            />
                  <Text style={styles.buttonText}>Pizza</Text>
              </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', top: 78, left: 10}}>
              <TouchableOpacity style={styles.button}  onPress={this._pushMission5.bind(this)} active={0.8}>
              <Image
              source={
                __DEV__
                  ? require("../assets/images/car.jpg")
                  : require("../assets/images/car.jpg")
              }
              style={styles.welcomeImage}
            />
                  <Text style={styles.buttonText}>Car</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={this._pushMission6.bind(this)} active={0.8}>
              <Image
              source={
                __DEV__
                  ? require("../assets/images/cat.jpg")
                  : require("../assets/images/cat.jpg")
              }
              style={styles.welcomeImage}
            />
                  <Text style={styles.buttonText}>Cat</Text>
              </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    button: {
        height: 170, 
        width: 170,
        borderRadius: 170/2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        margin : 5,
    }, 
    welcomeContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
      },
      welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: "contain",
        marginTop: 3,
        marginLeft: -10
      },
    buttonText: {
        //font-family: "Arial Rounded MT Bold";
        fontSize: 20,
        lineHeight: 23,
        textAlign: 'center',
       //backgroundColor: '#C8C8C8'
    }
});