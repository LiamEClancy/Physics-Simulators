// Importing global variables.
let theta = window.theta;
let velocityInitial = window.velocityInitial;
let time = 0;
let verticalDisplacement = window.deltaY;
let horizontalDisplacement = window.deltaX;
let gravity = -9.81;

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
let arad = (theta * Math.PI) / 180;
let velocityInitialX = velocityInitial * Math.cos(arad);
let velocityInitialY = velocityInitial * Math.sin(arad);

// This is the main physics simulation update loop.
let x;
let velocityFinalX;
let y;
let velocityFinalY;

setInterval(() => {
	x = velocityInitialX * time + horizontalDisplacement;
	velocityFinalX = velocityInitialX;

	// Calculating Y position and velocity.
	let gravityEffect = (0.5 * gravity * (Math.pow(time, 2)));
	y = gravityEffect + (velocityInitialY + time) + verticalDisplacement;
	velocityFinalY = velocityInitialY + (gravity * time);

	// Logging.
	console.log(time);
	console.log(x);
	console.log(y);

	let xPositionDisplay = $('#xPositionDisplay');
	xPositionDisplay.html(x);
	let yPositionDisplay = $('#yPositionDisplay');
	yPositionDisplay.html(y);
	let xVelocityDisplay = $('#xVelocityDisplay');
	xVelocityDisplay.html(velocityFinalX);
	let yVelocityDisplay = $('#yVelocityDisplay');
	yVelocityDisplay.html(velocityFinalY);
	let timeDisplay = $('#timeDisplay');
	timeDisplay.html(time);

	// Incrementing time.
	time += 1;
}, 1000);
