document.addEventListener("DOMContentLoaded", function () {
  // Scene Setup
  var scene = new THREE.Scene();

  // Camera Setup
  var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 4000);
  camera.position.set(50, 50, 100);

  // Raycaster and mouse setup
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  // Tooltip setup
  var tooltip = document.createElement('div');
  tooltip.style.position = 'absolute';
  tooltip.style.color = 'white';
  tooltip.style.padding = '5px 10px';
  tooltip.style.borderRadius = '5px';
  tooltip.style.display = 'none'; // Hidden initially
  tooltip.style.fontSize = '.8rem';
  document.body.appendChild(tooltip);

  // Create a loader to load GLB models
  var loader = new THREE.GLTFLoader();

  // References to the models
  var guitarModel, newModel, newModel2, newModel3, newModel4;

  
  // Load GLB Models
  var loader = new THREE.GLTFLoader();

  // Load the first GLB model (Outer model)
 loader.load('https://cdn.glitch.global/da30e38f-201b-4efc-9671-2baa9ae5ee15/white_hart_house_-_quarantine%20(1).glb?v=1735524244789', function (gltf) {
  var model = gltf.scene;
  model.scale.set(120, 120, 120); // Scale the model
// Set the model's initial position (move it down by 100 units)
  model.position.set(100,3350, -150);
  scene.add(model); // Add the model to the scene

  // Rotate the model continuously
  model.rotation.x = 0; // Rotate 45 degrees around the X-axis (in radians)
  model.rotation.y = 0; // Rotate 45 degrees around the Y-axis (in radians)
  model.rotation.z = 0; // No rotation around the Z-axis initially

}, undefined, function (error) {
  console.error(error);
});
  
  // Load the guitar model
  loader.load(
    "https://cdn.glitch.global/494042e2-3d88-4420-9fed-57e4762a9e00/guitar.glb?v=1735349748836",
    function (gltf) {
      guitarModel = gltf.scene;
      guitarModel.scale.set(120, 120, 120);
      guitarModel.position.set(-50, -150, -270);
      scene.add(guitarModel);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  // Load the first new model
  loader.load(
    "https://cdn.glitch.global/494042e2-3d88-4420-9fed-57e4762a9e00/radio_philips_retro_3d_scan.glb?v=1735344790098b",
    function (gltf) {
      newModel = gltf.scene;
      newModel.scale.set(80, 80, 80);
      newModel.position.set(5, -80, -250);
      scene.add(newModel);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  // Load the second new model
  loader.load(
    "https://cdn.glitch.global/494042e2-3d88-4420-9fed-57e4762a9e00/a_painting_about_goat.glb?v=1735345099353",
    function (gltf) {
      newModel2 = gltf.scene;
    newModel2.scale.set(2, 2, 2);
       newModel2.rotation.y = 55;
      newModel2.position.set(-135, -160, -150);
      scene.add(newModel2);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
  
   // Load the second new model
  loader.load(
    "https://cdn.glitch.global/494042e2-3d88-4420-9fed-57e4762a9e00/hitachi_audio_unit_sdp-2830_2_free_raw_scan.glb?v=1735344917516",
    function (gltf) {
      newModel4 = gltf.scene;
    newModel4.scale.set(20, 20, 20);
       newModel4.rotation.y = 55;
      newModel4.position.set(195, -70, -100);
      scene.add(newModel4);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  // Load the third new model
  loader.load(
    "https://cdn.glitch.global/da30e38f-201b-4efc-9671-2baa9ae5ee15/white_hart_house_-_quarantine%20(2).glb?v=1735524244789",
    function (gltf) {
      newModel3 = gltf.scene;
      newModel3.scale.set(80, 80, 80);
      newModel3.position.set(-100, 2000, 200);
      scene.add(newModel3);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  // Raycaster and mouse event listener for hover and click
  window.addEventListener("mousemove", function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    var isHovering = false;
    var hoveredModel = null;

    // Check intersections with the models
    if (guitarModel) {
      var intersectsGuitar = raycaster.intersectObject(guitarModel, true);
      if (intersectsGuitar.length > 0) {
        isHovering = true;
        hoveredModel = guitarModel;
        tooltip.textContent = "Click to view my music"; // Tooltip for the guitar
      }
    }

    if (newModel) {
      var intersectsNewModel = raycaster.intersectObject(newModel, true);
      if (intersectsNewModel.length > 0) {
        isHovering = true;
        hoveredModel = newModel;
        tooltip.textContent = "Click to explore another link"; // Tooltip for the first new model
      }
    }

    if (newModel2) {
      var intersectsNewModel2 = raycaster.intersectObject(newModel2, true);
      if (intersectsNewModel2.length > 0) {
        isHovering = true;
        hoveredModel = newModel2;
        tooltip.textContent = "Click to view more models"; // Tooltip for the second new model
      }
    }

    if (newModel3) {
      var intersectsNewModel3 = raycaster.intersectObject(newModel3, true);
      if (intersectsNewModel3.length > 0) {
        isHovering = true;
        hoveredModel = newModel3;
        tooltip.textContent = "Click for more info"; // Tooltip for the third new model
      }
    }
    
       if (newModel4) {
      var intersectsNewModel4 = raycaster.intersectObject(newModel4, true);
      if (intersectsNewModel4.length > 0) {
        isHovering = true;
        hoveredModel = newModel4;
        tooltip.textContent = "Click for more info"; // Tooltip for the third new model
      }
    }

    // Update tooltip visibility and cursor
    if (isHovering) {
      tooltip.style.display = "block";
      tooltip.style.left = event.clientX + 10 + "px";
      tooltip.style.top = event.clientY + 10 + "px";
      document.body.style.cursor = "pointer";
    } else {
      tooltip.style.display = "none";
      document.body.style.cursor = "default";
    }
  });

  // Listen for mouse clicks to handle redirection
  window.addEventListener("click", function (event) {
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections and handle redirection
    if (guitarModel) {
      var intersectsGuitar = raycaster.intersectObject(guitarModel, true);
      if (intersectsGuitar.length > 0) {
        window.location.href = "https://yourlink.com"; // Redirect for the guitar model
        return;
      }
    }

    if (newModel) {
      var intersectsNewModel = raycaster.intersectObject(newModel, true);
      if (intersectsNewModel.length > 0) {
        window.location.href = "https://another-link.com"; // Redirect for the first new model
        return;
      }
    }

    if (newModel2) {
      var intersectsNewModel2 = raycaster.intersectObject(newModel2, true);
      if (intersectsNewModel2.length > 0) {
        window.location.href = "https://link2.com"; // Redirect for the second new model
        return;
      }
    }

    if (newModel3) {
      var intersectsNewModel3 = raycaster.intersectObject(newModel3, true);
      if (intersectsNewModel3.length > 0) {
        window.location.href = "https://link3.com"; // Redirect for the third new model
        return;
      }
    }
    
     if (newModel4) {
      var intersectsNewModel4 = raycaster.intersectObject(newModel4, true);
      if (intersectsNewModel4.length > 0) {
        window.location.href = "https://link4.com"; // Redirect for the third new model
        return;
      }
    }
  });

  // Setup renderer
  var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("myCanvas"),
    antialias: true,
  });
  renderer.setClearColor(0x000000);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Lighting
  var light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);

  var pointLight = new THREE.PointLight(0xffffff, 0.8);
  pointLight.position.set(500, 500, 500);
  scene.add(pointLight);

  // OrbitControls setup
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.rotateSpeed = 0.1;
  controls.zoomSpeed = 0.1;
  controls.panSpeed = 0.1;
  controls.minDistance = 50;
  controls.maxDistance = 200;

  // Fog setup
  const fogColor = new THREE.Color(0x7a7a7a);
  const near = 1;
  const far = 4000;
  scene.fog = new THREE.Fog(fogColor, near, far);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
});
