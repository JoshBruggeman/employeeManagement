
var emplData = {};
var emplDataSnap = {};

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCZThiG5Bfi5u_huzQKj0TwQp_Lyj_c0mU",
  authDomain: "emp-db-inclass.firebaseapp.com",
  databaseURL: "https://emp-db-inclass.firebaseio.com",
  storageBucket: "emp-db-inclass.appspot.com",
  messagingSenderId: "248872823343"
};

firebase.initializeApp(config);

var database = firebase.database();

/*
        Get a "snapshot" of current data on load...
*/
database.ref().on("value", function(snapshot) {
    if(snapshot.child("emp-db-inclass").exists()) {
        console.log('database.ref() update');
        emplData = snapshot.val();
        showEmplData();
    }
}, function(errorObject) {

});

database.ref().on("child_added", function(childSnapshot) {
    if(childSnapshot.child("emp-db-inclass").exists()) {
        console.log('database.ref() update');
        emplDataSnap = childSnapshot.val();
        appendEmplData();
    }
}, function(errorObject) {

});

function writeNewEmpl(empname, role, sdate, mwork, mrate, tbill) {

  // A post entry.
  var postData = {
    empname: empname,
    role: role,
    sdate: sdate,
    mwork: mwork,
    mrate: mrate,
    tbill: tbill,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

/*
*/
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", 
function(snapShot) {

});

/*
    On-Page Click Event Handlers
*/
$(document).on('click', '.button-test', test);

function test() {

    writeNewEmpl('jim', 'old man', '20161112', 100, 1, 100);
    writeNewEmpl('chuck', 'young man', '20161110', 150, 2, 300);

}


