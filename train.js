// Initialize Firebase

$(document).ready(function () {



 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAqrOAL8d3oTnQtkYx4cWF1ua2OpL28MmE",
    authDomain: "train-schedule1-756c4.firebaseapp.com",
    databaseURL: "https://train-schedule1-756c4.firebaseio.com",
    projectId: "train-schedule1-756c4",
    storageBucket: "train-schedule1-756c4.appspot.com",
    messagingSenderId: "611556701042"
  };
  firebase.initializeApp(config);
//variable for firebase
var database = firebase.database();

    
   

    // This function handles events where the add animal button is clicked
    $("#button").on("click", function (event) {
        event.preventDefault();

       // renderConversion();
        // This line of code will grab the input from the textbox
        //good to stay here
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var arrivalTime = moment($("#arrival").val().trim(), "HH:mm").format("X");
        
        var minFrequency = $("#mins").val().trim();


//store my stuff in firebase
        var storage = {
            trainNameFire: trainName,
            travelTo: destination,
            minsNextTrain: arrivalTime,
            minsBetweenTrain: minFrequency
        };
        //push my stuff to firbase
        database.ref().push(storage);
        
        console.log(storage.trainNameFire);
        console.log(storage.travelTo);
        console.log(storage.minsNextTrain);
        console.log(storage.minsBetweenTrain);
        alert("Employee successfully added");

        $("#trainName").val("");
        $("#destination").val("");
        $("#arrival").val("");
        $("#mins").val("");
      //  $("#tbody > tbody").append("<tr><td>" + trainName + "</td><td>"
        //    + destination + "</td><td>" + arrivalTime + "</td><td>"
      //      + minFrequency + "</td><td>" + diffTime + "</td></tr>");
        console.log(trainName);
        console.log(destination);

        //good to stay here but didnt work
        // $("#trainName2").push(trainName);
        // $("#destination2").push(destination);
        // $("#arrival2").push(arrivalTime);
        // $("#frequency2").push(minFrequency);
        //$("#nextTrain2").push(diffTime);
        // NEED TO RENDER A FUNCTION HERE TO PROCESS CALCULATIONS AND CONVERsIONS
 //   });
});
//waiting to read stuff from firebase then pulls it
database.ref().on("child_added", function(childSnapshot) {
    console.log("child added");
    console.log(childSnapshot.val());
    
// Store everything into a variable.
var trainName = childSnapshot.val().trainNameFire;
var destination = childSnapshot.val().travelTo;
var unconvertedArrivalTime = childSnapshot.val().minsNextTrain;
var arrivalTime = moment.unix(unconvertedArrivalTime).format("HH:mm");
var minFrequency = childSnapshot.val().minsBetweenTrain;

console.log(trainName);
console.log(destination);
console.log(arrivalTime);
console.log(minFrequency);

//format?
//var formatArrival = moment.unix(arrivalTime).format("MM/DD/YYYY");

// Calculate the months worked using hardcore math
// To calculate the months worked
var minutesDiff = moment().diff(moment(arrivalTime, "X"), "minutes");
console.log(minutesDiff);

//time apart(remainder)
var minsRemain = minutesDiff % minFrequency;

//minutes until arrival
var minsToArrival = minFrequency - minsRemain;

// Create the new row
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    //first train
    $("<td>").text(arrivalTime),
    //time between trains
    $("<td>").text(minFrequency),
    //Mins until next train
    $("<td>").text(minsToArrival),
   // $("<td>").text()
   );
   $("#employee-table > tbody").append(newRow);
   

});









/*var hoursMins = function (H, M) {
  M = M.toString();
  if (M.length === 1) {
    M = "0" + M;
  }
  var formatHrsMins = H + ":" + M;

  console.log(M.length);
  console.log(formatHrsMins);
}*/

  // document.addEventListener('DOMContentLoaded', function () {
///     var elems = document.querySelectorAll('.timepicker');

//     var instances = M.Timepicker.init(elems, { onSelect: hoursMins });
//    var instances = M.Timepicker.init(elems, { fromNow: 1000 });

//  });//End of eventlistener

//convert my materialize clock to place a 0 before the last number in hh:mm





/*
var renderConversion = function () {
    //PUT ALL THIS INTO CLICK FUNCTION WHEN READY!!!
    //var firstArrivalExample = "04:30";
    //  var arrivalConvertExample = moment(firstArrivalExample, "HH:mm");
    // console.log(arrivalConvertExample);
    var timeNow = moment();
    console.log(timeNow);
    // var firstTimeConverted = moment(timeNow, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);
    // Current time converted to hh:mm
    var timeNowConverted = moment(timeNow, "HH:mm").format("hh:mm");
    //working
    console.log(timeNowConverted);
    //
    // Difference between the timeNow and firstTrain
    //taking time given to input
    var arrivalTime = $("#arrival").val().trim();
    var firstTime = moment(arrivalTime).val().trim();

    var frequency = $("#frequency").val().trim();

    var arrivalTime = moment.unix(firstTime).format("hh:mm");
    //calculate difference between times
    var difference = moment().diff(trainTime, "minutes");

    //time apart(remainder)
  //  var trainRemain = difference % frequency;

    //minutes until arrival
  //  var minUntil = frequency - trainRemain;

    //next arrival time
  //  var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');
}*/

});