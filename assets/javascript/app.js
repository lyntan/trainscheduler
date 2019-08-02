// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAeB3QFlsHWbDh0Dz_gQriReCt6-fju_Ro",
    authDomain: "firstproject-b1c1a.firebaseapp.com",
    databaseURL: "https://firstproject-b1c1a.firebaseio.com",
    projectId: "firstproject-b1c1a",
    storageBucket: "",
    messagingSenderId: "977390958525",
    appId: "1:977390958525:web:13020c521c793353"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrain;
  var frequency;

  database.ref().on("child_added", function (snapshot) {
   
    
    var s = snapshot.val();
    var firstTimeConverted = moment(s.firstTrain, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % s.frequency;
    var tMinutesTillTrain = s.frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    
    $("<tr><td>" + s.trainName + "</td><td>" + s.destination + "</td><td>" + s.frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>").appendTo("tbody");


  });


$("#submit").on("click", function (event) {
    event.preventDefault();

    trainName = $("#train-name").val();
    destination = $("#destination").val();
    firstTrain = $("#first-train").val();
    frequency = $("#frequency").val();

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");

  console.log(trainName);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

});