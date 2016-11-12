
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
        console.log('database.ref() update value');
        emplData = snapshot.val();
        showEmplData();
    }
}, function(errorObject) {
    console.log('ERROR - on value');
});

database.ref().on("child_added", function(childSnapshot) {
    if(childSnapshot.child("emp-db-inclass").exists()) {
        console.log('database.ref() update child_added');
        emplDataSnap = childSnapshot.val();
        appendEmplData();
    }
}, function(errorObject) {
    console.log('ERROR - on child_added');
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

function showEmplData() {

    console.log('showEmplData() - emplData.length = '+emplData.length);

    $('#employeeName').val(emplData[0].empname);
    $('#role').val(emplData[0].role);
    $('#startDate').val(emplData[0].sdate);
    $('#monthlyRate').val(emplData[0].mrate);
    $('#monthsWorked').val(emplData[0].mwork);

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

    var tbill = parseInt($('#monthlyRate').val()) * parseInt($('#monthsWorked').val());

    writeNewEmpl( $('#employeeName').val(),
                  $('#role').val(), 
                  $('#startDate').val(),
                  $('#monthlyRate').val(),
                  $('#monthsWorked').val(),
                  tbill);

}


