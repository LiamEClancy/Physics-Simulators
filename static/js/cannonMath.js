let arad = (a * Math.PI) / 180;
let vox = vo * Math.cos(arad);
let voy = vo * Math.sin(arad);

let t = time;
let ay = -9.81;
let ax = 0;

let phi;

let vd = deltay;

y;
x;

setInterval(() => {
	x = vox * t;
	vfx = vox;

	y = (0.5 * ay * (Math.pow(t, 2))) + (voy + t) + vd;
	vfy = voy + (ay * t);
	t += 1;
	console.log(t);
	console.log(x);
	console.log(y);
}, 1000);
