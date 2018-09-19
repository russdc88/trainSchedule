
// Initialize Firebase
var config = {
	apiKey: "AIzaSyD9QLPy0EDek59QCPkI4S3gWZy13JK4EuM",
	authDomain: "trainschedule-cb35a.firebaseapp.com",
	databaseURL: "https://trainschedule-cb35a.firebaseio.com",
	projectId: "trainschedule-cb35a",
	storageBucket: "trainschedule-cb35a.appspot.com",
	
};

firebase.initializeApp(config);

var database = firebase.database();

// Creating button for adding Train times
$("#submitButton").on("click", function (event) {
	event.preventDefault();
	
	//Grab inputs

	var trainName = $("#trainName").val().trim();

	var destination = $("#destination").val().trim();

	var trainTime = $("#trainTime").val().trim();

	var frequency = $("#frequency").val().trim();

	//Create object for holding data

	var newTrain = {
		name: trainName,
		location: destination,
		time: trainTime,
		freq: frequency
	};

	//upload data to firebase

	database.ref().push(newTrain);

	console.log(newTrain.name)
	console.log(newTrain.location)
	console.log(newTrain.time)
	console.log(newTrain.freq)

	// clear textbox
	$("#trainName").val("")
	$("#destination").val("")
	$("#trainTime").val("")
	$("#frequency").val("")

});

// adding values in database into table
database.ref().on("child_added", function(snapShot){
	console.log(snapShot.val());

	var trainName = snapShot.val().name;

	var destination = snapShot.val().location;

	var trainTime = snapShot.val().time;

	console.log(trainTime)

	var frequency = snapShot.val().freq;

	var tFrequency = frequency;

	// Time is 3:30 AM
	var firstTime = trainTime;

	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	// Current Time
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % tFrequency;
	console.log(tRemainder);

	// Minute Until Train
	var tMinutesTillTrain = tFrequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm a");
	console.log("ARRIVAL TIME: " + moment(nextTrain))





//adding to html webpage
	var newRow = $("<tr>").append(
		$("<td>").text(trainName),
		$("<td>").text(destination),
		$("<td>").text(frequency),
		$("<td>").text(nextTrain),
		$("<td>").text(tMinutesTillTrain)
		
	);

	$("#train-table > tbody").append(newRow);


});