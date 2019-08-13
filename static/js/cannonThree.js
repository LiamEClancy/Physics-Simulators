window.cannonModel = {
	draw () {
		// Getting position data from the simulation
		let activeCannon = window.cannonSimulation.getActiveCannon();
		let activeCannonball = window.cannonSimulation.getActiveCannonball();

		// Creating all necessities for the scene.
		let scene = new THREE.Scene();
		let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
		let renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		// Making sure the simulation will display properly in resized windows.
		window.addEventListener('resize', function () {
			let width = window.innerWidth;
			let height = window.innerHeight;
			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		});

		// Creating the orbit controls.
		let controls = new THREE.OrbitControls(camera, renderer.domElement);

		// Creating the plane
		let plane = new THREE.PlaneGeometry(10000, 10000, 100, 100);

		// Assigning a random color, within a spectrum, depending on the height.
		function generateColor (height) {
			let bottomColor = new THREE.Color(0x228822);
			let topColor = new THREE.Color(0xffffff);
			return bottomColor.lerp(topColor, (height / 100));
		}

		// Modulating height of the plane based on vertices.
		for (let xPlane = 0; xPlane < 100; xPlane++) {
			for (let yPlane = 0; yPlane < 100; yPlane++) {
				let vertexIdx = (xPlane * 100 + yPlane);
				let vertex = plane.vertices[vertexIdx];
				let height = (25 * Math.random());
				vertex.z = height;
				plane.verticesNeedUpdate = true;
			}
		}

		let faces = plane.faces;
		for (let faceIdx = 0; faceIdx < faces.length; faceIdx++) {
			let face = faces[faceIdx];
			let c0 = plane.vertices[face.a];
			let c1 = plane.vertices[face.b];
			let c2 = plane.vertices[face.c];
			face.vertexColors = [generateColor(c0.z), generateColor(c1.z),
				generateColor(c2.z)];
		}

		// Creating the plane and material for the mesh.
		let groundMaterial = new THREE.MeshLambertMaterial({
			vertexColors: THREE.VertexColors,
			side: THREE.DoubleSide
		});
		let ground = new THREE.Mesh(plane, groundMaterial);
		scene.add(ground);
		ground.position = 0;
		ground.rotateX(90 * Math.PI / 180);

		// Creating the cannonball.
		let sphereRadius = 5;
		let sphere = new THREE.SphereGeometry(sphereRadius, 40, 40);
		let cannonballMaterial = new THREE.MeshPhongMaterial({
			map: new THREE.TextureLoader().load('/img/Textures/cannonballTexture.jpg'),
			wireframe: false,
			side: THREE.DoubleSide
		});
		let cannonball = new THREE.Mesh(sphere, cannonballMaterial);
		scene.add(cannonball);

		// Creating the skybox.
		let backgroundCube = new THREE.BoxGeometry(5000, 5000, 5000);
		let backgroundMaterial = [
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/img/Skybox/left.jpg'), side: THREE.DoubleSide}), // Left Side
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/img/Skybox/right.jpg'), side: THREE.DoubleSide}), // Right Side
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/img//Skybox/top.jpg'), side: THREE.DoubleSide}), // Top Side
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/img//Skybox/down.jpg'), side: THREE.DoubleSide}), // Bottom Side
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/img/Skybox/front.jpg'), side: THREE.DoubleSide}), // Front Side
			new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/img/Skybox/back.jpg'), side: THREE.DoubleSide}) // Back Side
		];
		let background = new THREE.Mesh(backgroundCube, backgroundMaterial);
		scene.add(background);

		// Creating lights.
		let ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
		scene.add(ambientLight);

		let spotLight = new THREE.SpotLight({
			color: 0xFFFFFF,
			intensity: 0.5,
			distance: 100
		});
		scene.add(spotLight);
		spotLight.position.y = 100;
		spotLight.target = cannonball;

		// Creating the cylinder for the base of the turret.
		let cannonBaseCylinder = new THREE.CylinderGeometry(2 * ((2 * sphereRadius) + 5), 3 * ((2 * sphereRadius) + 5), activeCannon.deltaY);
		let cannonBaseMaterial = new THREE.MeshLambertMaterial({
			color: new THREE.Color(0xEEB93B),
			wireframe: false,
			side: THREE.DoubleSide
		});
		let cannonBase = new THREE.Mesh(cannonBaseCylinder, cannonBaseMaterial);
		scene.add(cannonBase);
		cannonBase.position.x = activeCannon.deltaX;
		cannonBase.position.y = activeCannon.deltaY / 2;

		// Creating the turret.
		let turretBase = new THREE.SphereGeometry(2 * (sphereRadius + 4), 40, 40);
		let turretBaseMaterial = new THREE.MeshLambertMaterial({
			color: new THREE.Color(0x0004FF),
			wireframe: false,
			side: THREE.DoubleSide
		});
		let turret = new THREE.Mesh(turretBase, turretBaseMaterial);
		scene.add(turret);
		turret.position.x = activeCannon.deltaX;
		turret.position.y = activeCannon.deltaY;

		// Creating the curve to display behind the cannonball's path.
		let barrelCylinder = new THREE.CylinderGeometry(1.2 * sphereRadius, 1.2 * sphereRadius, 30, 40);
		let barrelMaterial = new THREE.MeshLambertMaterial({
			color: new THREE.Color(0xFF78BB),
			wireframe: false,
			side: THREE.DoubleSide
		});
		let barrel = new THREE.Mesh(barrelCylinder, barrelMaterial);

		// Creating a pivot so the barrel can angle properly.
		let pivot = new THREE.Object3D();
		barrel.position.y = 30;
		pivot.position.x = activeCannon.deltaX;
		pivot.position.y = activeCannon.deltaY;
		pivot.add(barrel);
		scene.add(pivot);

		// Creating a marker to show the position of where the cannonball will land.
		let targetGeometry = new THREE.RingGeometry((4 * sphereRadius), (8 * sphereRadius), 40);
		let targetMaterial = new THREE.MeshPhongMaterial({
			color: 0xFF0000,
			side: THREE.DoubleSide
		});
		let target = new THREE.Mesh(targetGeometry, targetMaterial);
		target.rotateX(90 * Math.PI / 180);
		scene.add(target);

		// Update loop to set rotation and the cannonball's position.
		let update = function () {
			// Getting position data from the simulation.
			activeCannonball = window.cannonSimulation.getActiveCannonball();
			activeCannon = window.cannonSimulation.getActiveCannon();

			// Updating the cannonball model's position and rotation.
			cannonball.position.x = activeCannonball.positionX;
			cannonball.position.y = activeCannonball.positionY;
			cannonball.rotation.z -= Math.abs(activeCannonball.velocityY / 180) + 0.05;
			if (cannonball.position.y <= 0) {
				cannonball.rotation.z = 0;
			}

			// Updating the angle of the barrel.
			pivot.rotation.z = ((90 - activeCannon.theta) * Math.PI) / 180;
			pivot.rotation.y = (180 * Math.PI) / 180;

			// Updating targets position.
			target.position.x = activeCannon.calculateFinalPoints().x;
			target.position.y = activeCannon.calculateFinalPoints().y;
			console.log(activeCannon.calculateFinalPoints())

			// Camera controls.
			controls.target = cannonball.position;

			// Checking for pause.
			let paused = window.cannonSimulation.isPaused();
			if (!paused) {
				controls.autoRotate = false;
				camera.position.y = barrel.position.y + activeCannon.deltaY;
				camera.position.x = barrel.position.x + 40;
				camera.position.z = barrel.position.z + 10;
				camera.lookAt(cannonball.position.x, cannonball.position.y, cannonball.position.z);
				camera.updateProjectionMatrix();
				camera.zoom = 1;
			} else {
				controls.autoRotate = false;
				controls.autoRotateSpeed = 2.0;
				cannonball.rotation.z = 0;
				camera.zoom = 2;
				camera.updateProjectionMatrix();
			}
		};

		let render = function () {
			renderer.render(scene, camera);
		};

		let GameLoop = function () {
			window.requestAnimationFrame(GameLoop);
			update();
			controls.update();
			render();
		};

		GameLoop();
	}
};
