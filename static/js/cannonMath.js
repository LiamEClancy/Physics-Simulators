// Imports.
const Cannon = window.Cannon;

// Creating local variables.
let time = 0;
let totalTime = 0;
let yMax = 0;
let simulationPause = false;
let gravity = -9.807;
let storedTime;
let simulationFinished = false;
let timerID;
let arad;
let velocityInitialX;
let velocityInitialY;

let cannonList = [];
let cannonballList = [];

window.cannonSimulation = {
	init () {
		// Updating variables.
		simulationPause = false;
		simulationFinished = false;
		cannonList.push(Cannon.create(20, 30, 100, 0));
		let activeCannon = cannonList[0];
		let activeCannonball = activeCannon.fire();
		cannonballList[0] = activeCannonball;

		arad = (activeCannon.theta * Math.PI) / 180.0;
		velocityInitialX = activeCannon.velocityInitial * Math.cos(arad);
		velocityInitialY = activeCannon.velocityInitial * Math.sin(arad);
		time = 0;

		// Starts simulation.
		clearInterval(timerID);
		this.run();
		this.display();
	},

	display () {
		let activeCannon = cannonList[0];
		// Dynamically updating cannon display parameters.
		let angleDisplay = $('#launchAngleDisplay');
		angleDisplay.html(activeCannon.theta);
		let verticalDisplacementDisplay = $('#verticalDisplacementDisplay');
		verticalDisplacementDisplay.html(activeCannon.deltaY);
		let horizontalDisplacementDisplay = $('#horizontalDisplacementDisplay');
		horizontalDisplacementDisplay.html(activeCannon.deltaX);
		let initialVelocityDisplay = $('#initialVelocityDisplay');
		initialVelocityDisplay.html(activeCannon.velocityInitial);
	},

	run () {
		timerID = setInterval(() => {
			// Checking if the simulation is paused.
			if (simulationPause) {
				storedTime = time;
				clearInterval(timerID);
			}

			// Extending the active cannon to the run method.
			let activeCannon = cannonList[0];
			let activeCannonball = cannonballList[0];

			// Creating and updating the effect of gravity over time.
			let gravityEffect = ((0.5 * gravity) * (Math.pow(time, 2)));

			// Calculating X position and velocity.
			let x = (velocityInitialX * time) + activeCannon.deltaX;
			let velocityCurrentX = velocityInitialX;

			// Calculating Y position and velocity.
			let y = gravityEffect + (velocityInitialY * time) + activeCannon.deltaY;
			let velocityCurrentY = velocityInitialY + (gravity * time);

			// Updating the cannonball's position and velocity.
			activeCannonball.positionX = x;
			activeCannonball.positionY = y;
			activeCannonball.velocityX = velocityCurrentX;
			activeCannonball.velocityY = velocityCurrentY;

			// Checking for maximum Y-position.
			if (y > yMax) {
				yMax = y;
			}

			// Checking if Y-position is negative or zero and stopping simulation.
			if (y <= 0) {
				clearInterval(timerID);
				simulationFinished = true;
				this.pause();
			};

			// Updating HTML displays.
			let xPositionDisplay = $('#xPositionDisplay');
			xPositionDisplay.html(x.toFixed(2));
			let yPositionDisplay = $('#yPositionDisplay');
			yPositionDisplay.html(y.toFixed(2));
			let xVelocityDisplay = $('#xVelocityDisplay');
			xVelocityDisplay.html(velocityCurrentX.toFixed(2));
			let yVelocityDisplay = $('#yVelocityDisplay');
			yVelocityDisplay.html(velocityCurrentY.toFixed(2));
			let timeDisplay = $('[id=timeDisplay]');
			timeDisplay.html(time.toFixed(2));
			let yMaxDisplay = $('#yMaxDisplay');
			yMaxDisplay.html(yMax.toFixed(2));

			// Incrementing window.time.
			time += 0.05;
		}, 20);
	},

	pause () {
		console.log(simulationPause);
		if (!simulationPause || simulationFinished === true) {
			simulationPause = true;
		} else {
			simulationPause = false;
			time = storedTime;
			this.run();
		}
	},

	isPaused () {
		return simulationPause;
	},

	getActiveCannon () {
		let activeCannon = cannonList[0];
		return activeCannon;
	},

	increaseVelocity () {
		let activeCannon = cannonList[0];
		activeCannon.velocityInitial++;
	},

	decreaseVelocity () {
		let activeCannon = cannonList[0];
		activeCannon.velocityInitial--;
	},

	increaseAngle () {
		let activeCannon = cannonList[0];
		activeCannon.theta++;
	},

	decreaseAngle () {
		let activeCannon = cannonList[0];
		activeCannon.theta--;
	},

	getActiveCannonball () {
		let activeCannonball = cannonballList[0];
		return activeCannonball;
	}
};
