let CannonballConstructor = function (x, y, vx, vy) {
	return {
		positionX: x,
		positionY: y,
		velocityX: vx,
		velocityY: vy
	};
};

let fire = function () {
	let cannonball = CannonballConstructor(0, 0, 0, 0);
	return cannonball;
};

let calculateFinalPoints = function () {
	let totalTime;
	let arad = (this.theta * Math.PI) / 180.0;
	console.log(this.theta);
	let velocityInitialX = this.velocityInitial * Math.cos(arad);
	let velocityInitialY = this.velocityInitial * Math.sin(arad);
	let gravity = -9.807;
	totalTime = ((-velocityInitialY) + Math.sqrt(Math.pow(velocityInitialY, 2) - (2 * gravity * this.deltaY))) / (gravity);
	if (totalTime < 0) {
		totalTime = ((-velocityInitialY) - (Math.sqrt(Math.pow(velocityInitialY, 2) - (2 * gravity * this.deltaY)))) / (gravity);
	}
	let totalGravityEffect = ((0.5 * gravity) * (Math.pow(totalTime, 2)));
	let fx = (velocityInitialX * totalTime) + this.deltaX;
	let fy = totalGravityEffect + (velocityInitialY * totalTime) + this.deltaY;
	let finalPoints = {
		x: fx,
		y: fy
	};
	console.log(finalPoints);
	return finalPoints;
};

let CannonConstructor = function (t, vi, dy, dx) {
	return {
		theta: t,
		velocityInitial: vi,
		deltaY: dy,
		deltaX: dx,
		calculateFinalPoints: calculateFinalPoints,
		fire: fire
	};
};

window.Cannon = {
	create: CannonConstructor
};
