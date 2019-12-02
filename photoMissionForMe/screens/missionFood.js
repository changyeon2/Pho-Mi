import React from 'react';
import {Dimensions, KeyboardAvoidingView, TextInput, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity} from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';
//import { Camera } from 'react-native-camera';
// import LinearGradient from 'react-native-linear-gradient';

export default class MissionFood extends React.Component  {
    state = {
        clear : 70
    }

    navigationOptions = {
        title: 'Misson',
        headerLeft: (navigation) => (
            <HeaderBackButton
              onPress={() => navigation.navigate('Profile')
            }
              title="HOME"
              color="black"
            />
          )
      };

      // user clear 정도 state로 받아서 표현하기!!

    render() {
    return (
      <View>
          <View style={{top: 23.11}}>
              <Text style={styles.Text}>Food</Text>
          </View>
          <View style={{top: 46.46}}>
              <Text style={styles.Text}>Level 1</Text>
          </View>
          <View style={{top: 78, left: 40}}>
            <View style={styles.rectangle}>
            </View>
          </View>
          <View style={{top: 100}}>
              <Text style={{fontSize : 20.5, textAlign : 'center'}}>Take a picture of</Text>
              <Text style={{fontSize : 20.5, textAlign : 'center'}}>pizza</Text>
          </View>
          <View style={{top: 146, left: 39}}>
            <View style={styles.clear_bar}>
                <View style={{height : 17, width : 297*(this.state.clear / 100), backgroundColor: '#2AC940'}}/>
            </View>
          </View>          
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    buttonText: {
        color: "#FFFFFF"
    },
    button: {
        height : 30,
        width : 30,
        backgroundColor : 'red'
    },
    rectangle: {
        height: 404,
        width: 297,
        backgroundColor: '#FFC8FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text: {
        //font-family: "Arial Rounded MT Bold";
        color: '#000',
        fontSize: 20,
        lineHeight: 23,
        textAlign: 'center' //backgroundColor: '#C8C8C8'
    },
    clear_bar: {
        height: 17,
        width: 297,
        backgroundColor: '#FFC8FF'
    },
});