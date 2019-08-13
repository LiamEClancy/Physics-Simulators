// Start simulation.
let cannonSimulation = window.cannonSimulation;
cannonSimulation.init();
window.cannonModel.draw();

document.addEventListener('keydown', onDocumentKeyDown, false);
function onDocumentKeyDown (event) {
	let keyCode = event.which;
	if (keyCode === 32) {
		cannonSimulation.pause();
	}
	if (keyCode === 82) {
		cannonSimulation.init();
		console.log('restart');
	}
	if (keyCode === 87) {
		cannonSimulation.increaseVelocity();
	}
	if (keyCode === 83) {
		cannonSimulation.decreaseVelocity();
	}
	if (keyCode === 81) {
		cannonSimulation.increaseAngle();
	}
	if (keyCode === 65) {
		cannonSimulation.decreaseAngle();
	}
};
