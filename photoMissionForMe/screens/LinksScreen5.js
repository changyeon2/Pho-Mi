import React from "react";
import {
  ActivityIndicator,
  Button,
  Clipboard,
  FlatList,
  Image,
  Platform,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View
} from "react-native";
import { Constants, ImagePicker, Permissions } from "expo";
import uuid from "uuid";
import Environment from "../config/environment";
import firebase from "../utils/firebase";
import { HeaderBackButton } from 'react-navigation-stack';
import {insertUserData, readUserSuccess, updateUserSuccess} from './server';


console.disableYellowBox = true;

export default class App extends React.Component {

  state = {
    user : "",
    IsSuccess : "",
    image : "",
    uploading : "",

  };

  constructor(props) {
    super(props)
    const {navigation} = this.props;
    this.state = {
      user : navigation.getParam('user'),
      image: null,
      uploading: false,
      googleResponse: null,
      IsSuccess : navigation.getParam('IsSuccess')
    };
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }
  
  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require("../assets/images/car.jpg")
                  : require("../assets/images/car.jpg")
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {image ? null : (
              <Text style={styles.getStartedText}>Car Mission</Text>
            )}
          </View>

          <View style={styles.helpContainer}>
            <Button
              onPress={this._pickImage}
              title="Pick an image from album"
            />
     
            {this.state.googleResponse && (
              <FlatList
                data={this.state.googleResponse.responses[0].labelAnnotations}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
            renderItem={({ item }) => <Text>Uploaded : {item.description}</Text>}
              />
            )}
            {this._maybeRenderImage()}
            {this._maybeRenderUploadingOverlay()}
          </View>
        </ScrollView>
      </View>
    );
  }

  organize = array => {
    return array.map(function(item, i) {
      return (
        <View key={i}>
          <Text>{item}</Text>
        </View>
      );
    });
  };

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center"
            }
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image, googleResponse } = this.state;
    if (!image) {
      return;
    }
    //console.log(googleResponse.responses[0].labelAnnotations);
    
    return (
       
      <View
        style={{
          marginTop: 20,
          width: 250,
          borderRadius: 3,
          elevation: 2
        }}
      >
        <Button
          style={{ marginBottom: 10 }}
          onPress={() => this.submitToGoogle()}
          title="Analyze!"
        />

        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden"
          }}
        >
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        />
        <View style={styles.helpContainer}>
            {this.state.googleResponse && (
              <FlatList
                data={this.state.googleResponse.responses[0].labelAnnotations}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
            
            renderItem={({ item }) => <Text style={styles.resultFont}>{item.description == "Car" ? updateUserSuccess(this.state.user) : ""}Result : {item.description == "Car" ? "Success" : "Fail"}</Text>
          }
              />
            )}
        </View>
       
          
       
        {googleResponse && (
          <Text
            //onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={{ paddingVertical: 10, paddingHorizontal: 10 }}
            renderItem={({ item }) => <Text>Uploaded : {item.description}</Text>}

          >
       
          </Text>

        )}
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = item => {
    <Text>Result : {JSON.stringify(item)}</Text>;
  };

  _share = () => {
    Share.share({
      message: JSON.stringify(this.state.googleResponse.responses),
      title: "Check it out",
      url: this.state.image
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert("Copied to clipboard");
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      //console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };

  submitToGoogle = async () => {
    try {
      this.setState({ uploading: true });
      let { image } = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: "LABEL_DETECTION", maxResults: 1 },
              { type: "LANDMARK_DETECTION", maxResults: 1 },
              { type: "FACE_DETECTION", maxResults: 1 },
              { type: "LOGO_DETECTION", maxResults: 1 },
              { type: "TEXT_DETECTION", maxResults: 1 },
              { type: "DOCUMENT_TEXT_DETECTION", maxResults: 1 },
              { type: "SAFE_SEARCH_DETECTION", maxResults: 1 },
              { type: "IMAGE_PROPERTIES", maxResults: 1 },
              { type: "CROP_HINTS", maxResults: 1 },
              { type: "WEB_DETECTION", maxResults: 1 }
            ],
            image: {
              source: {
                imageUri: image
              }
            }
          }
        ]
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          Environment["GOOGLE_CLOUD_VISION_API_KEY"],
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      let responseJson = await response.json();
      
      //////////db query/////////
  
      /////////////////////////////
      this.setState({
        googleResponse: responseJson,
        uploading: false
      });
      //if responseJson.responses[0].labelAnnotations
    } catch (error) {
      console.log(error);
    }
  };
}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();
 
  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 10
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
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
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },

  getStartedText: {
    fontSize: 26,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },

  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  resultFont: {
    fontSize: 30,
    color: "rgba(96,100,109, 1)",
  }
});