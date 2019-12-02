import firebase from "../utils/firebase";
import GLOBAL from './global.js'

export function insertUserData(userId){
    firebase.database().ref('Users/' + userId).set({
        ID : userId,
        isSuccess : 0,
        //flower_date_list : 'N/A',
        // leaf_date_list :
    }).then(()=>{
        console.log("Inserted")
        //success callback
        //console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });
};





export function readUserSuccess(userId) {
    var returnVar;
    firebase.database().ref('Users/' + userId).child('isSuccess').once('value', function(data){
        console.log("in func: " + JSON.stringify(data));
       returnVar = data.val();
    });
    console.log('WSWS');
    console.log("after: " + returnVar);
    return returnVar;
};


export function readUserSuccess_forUpdate(userId) {
    console.log("server forUpdate:" + userId );
    return new Promise(resolve=>{
        firebase.database().ref('Users/' + userId).child('isSuccess').once('value', function(data){
            console.log("server forUpdate Promise: " + data);
            resolve(data.val());
         });
    });
};

export function updateUserSuccess(userId) {
    readUserSuccess_forUpdate(userId).then(data=> {
        var updatedLevel = data + 1;
        console.log(userId);
        console.log("updatedLevel");
        console.log(updatedLevel);
     
        //this.user.isSuccess = this.user.isSuccess + 1;
        var date = JSON.stringify(new Date()).replace(".","-");
        firebase.database().ref('Users/' + userId).update({
            ID : userId,
            isSuccess : updatedLevel,
            uploadedTime : date,
        });

        console.log("server setState of GLOBAL: " + updatedLevel);
        GLOBAL.screen1.setState({
            IsSuccess: updatedLevel
        });
    })
};