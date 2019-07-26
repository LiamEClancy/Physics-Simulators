// Importing global variables.
let theta = window.theta;
let velocityInitial = window.velocityInitial;
let time = 0;
let verticalDisplacement = window.deltaY;
let horizontalDisplacement = window.deltaX;
let gravity = -9.807;

// Dynamically updating cannon display parameters.
let angleDisplay = $('#launchAngleDisplay');
angleDisplay.html(theta);
let verticalDisplacementDisplay = $('#verticalDisplacementDisplay');
verticalDisplacementDisplay.html(verticalDisplacement);
let horizontalDisplacementDisplay = $('#horizontalDisplacementDisplay');
horizontalDisplacementDisplay.html(horizontalDisplacement);
let initialVelocityDisplay = $('#initialVelocityDisplay');
initialVelocityDisplay.html(velocityInitial);

// Splitting initial velocity into its vector components.
let arad = (theta * Math.PI) / 180.0;
let velocityInitialX = velocityInitial * Math.cos(arad);
let velocityInitialY = velocityInitial * Math.sin(arad);

// This is the main physics simulation update loop.
let x;
let velocityFinalX;
let y;
let velocityFinalY;
let yMax = 0;

let cannonSimulation = setInterval(() => {
	if (window.simulationPause) {
		return;
	}

	x = (velocityInitialX * time) + horizontalDisplacement;
	velocityFinalX = velocityInitialX;

	// Calculating Y position and velocity.
	let gravityEffect = ((0.5 * gravity) * (Math.pow(time, 2)));
	y = gravityEffect + (velocityInitialY * time) + verticalDisplacement;
	velocityFinalY = velocityInitialY + (gravity * time);

	window.cannonballPositionX = x;
	window.cannonballPositionY = y;
	window.cannonballVelocityY = velocityFinalY;

	let xPositionDisplay = $('#xPositionDisplay');
	xPositionDisplay.html(x.toFixed(2));
	let yPositionDisplay = $('#yPositionDisplay');
	yPositionDisplay.html(y.toFixed(2));
	let xVelocityDisplay = $('#xVelocityDisplay');
	xVelocityDisplay.html(velocityFinalX.toFixed(2));
	let yVelocityDisplay = $('#yVelocityDisplay');
	yVelocityDisplay.html(velocityFinalY.toFixed(2));
	let timeDisplay = $('[id=timeDisplay]');
	timeDisplay.html(time.toFixed(2));
	let yMaxDisplay = $('#yMaxDisplay');
	yMaxDisplay.html(yMax.toFixed(2));

	// Incrementing time.
	time += 0.05;

	// Checking for maximum Y-position.
	if (y > yMax) {
		yMax = y;
	}

	// Checking if Y-position is negative or zero.
	if (y <= 0) {
		clearInterval(cannonSimulation);
	}
}, 50);
