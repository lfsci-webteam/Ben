var watchID = null;
var prevAccel = null;
var backgroundRed = 0;

var app = {

	//Constructor
	initialize: function() {
		document.addEventListener("deviceready", this.onDeviceReady, false);
	},
	
	onDeviceReady: function() {
		document.getElementById("status").innerHTML = "Device Ready!";
        app.startWatch();
	},

	// Start watching the acceleration
    //
    startWatch: function() {

        // Update acceleration every tenth of a second
        var options = { frequency: 200 };

        watchID = navigator.accelerometer.watchAcceleration(this.onSuccess, this.onError, options);
		document.getElementById("status").innerHTML = "Watch Started";
    },

    // Stop watching the acceleration
    //
    stopWatch: function() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    },

    // onSuccess: Get a snapshot of the current acceleration
    //
    onSuccess: function(acceleration) {
		document.getElementById("status").innerHTML = "Event Fired";
		if(prevAccel != null) {
			if((app.wasDiff(acceleration.x, prevAccel.x) ||
			app.wasDiff(acceleration.y, prevAccel.y) ||
			app.wasDiff(acceleration.z, prevAccel.z)) &&
			backgroundRed < 255) {
				backgroundRed += 5;
			}
			else {
				if(backgroundRed >= 0)
					backgroundRed -= 1;
			}
			document.getElementById("accelDisplay").innerHTML = 
				"x: " + acceleration.x + " Prev: " + prevAccel.x + "<br/>" + 
				"y: " + acceleration.y + " Prev: " + prevAccel.y + "<br/>" + 
				"z: " + acceleration.z + " Prev: " + prevAccel.z;
		}
		prevAccel = acceleration;
		document.body.style.background = "#" + backgroundRed.toString(16) + "0000";
		var message = "I'm cold...";
		if(backgroundRed >= 50 && backgroundRed < 100)
			message = "Still kinda cold...";
		else if(backgroundRed >= 100 && backgroundRed < 150)
			message = "This is comfy";
		else if(backgroundRed >= 150 && backgroundRed < 200)
			message = "Nice and toasty!";
		else if(backgroundRed >= 200 && backgroundRed < 250)
			message = "Do you smell something burning?";
		else if(backgroundRed >= 250)
			message = "YOUCH!";
		document.getElementById("warmthStatus").innerHTML = message;
		document.getElementById("redDisplay").innerHTML = "Red Value: " + backgroundRed;
        
		// element = document.getElementById('accelerometer');
        //element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
        //                    'Acceleration Y: ' + acceleration.y + '<br />' +
        //                    'Acceleration Z: ' + acceleration.z + '<br />' +
        //                    'Timestamp: '      + acceleration.timestamp + '<br />';
    },
	
	wasDiff: function(x, y) {
		return Math.abs(x - y) >= 0.5;
	},

    // onError: Failed to get the acceleration
    //
    onError: function() {
        alert('onError!');
    }
	
}