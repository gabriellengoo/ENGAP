document.addEventListener("DOMContentLoaded", function () {
  // Scene Setup
  var scene = new THREE.Scene();

  // Camera Setup
  var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 4000);
  camera.position.set(50, 50, 100);

  // Raycaster and mouse setup
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  
  
  // Load sound file
var audio = new Audio('https://cdn.glitch.global/3f1ceb4c-e793-47b9-9898-baa8919ad50f/guitar%20loop.wav?v=1736290566075'); // Replace with the path to your sound file
// guitarSound.preload = 'auto'; // Preload the sound to ensure it's ready when triggered
    // const audio = new Audio('path-to-your-sound-file.wav'); // Replace with your file path
  audio.muted = true;  // Mute the audio initially
  audio.play();
  
  var audior = new Audio('https://cdn.glitch.me/3f1ceb4c-e793-47b9-9898-baa8919ad50f/ep2%20master.wav?v=1736292468001'); // Replace with the path to your sound file
// guitarSound.preload = 'auto'; // Preload the sound to ensure it's ready when triggered
    // const audio = new Audio('path-to-your-sound-file.wav'); // Replace with your file path
  audior.muted = true;  // Mute the audio initially
  audior.play();
  
  

  // Once the user interacts, unmute the audio
  // document.addEventListener('click', () => {
  //   audio.muted = false;  // Unmute on user click
  //   audio.play();  // Play the sound again
  // });
  
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

  // // Load the second new model
  // loader.load(
  //   "https://cdn.glitch.global/494042e2-3d88-4420-9fed-57e4762a9e00/a_painting_about_goat.glb?v=1735345099353",
  //   function (gltf) {
  //     newModel2 = gltf.scene;
  //   newModel2.scale.set(2, 2, 2);
  //      newModel2.rotation.y = 55;
  //     newModel2.position.set(-135, -160, -150);
  //     scene.add(newModel2);
  //   },
  //   undefined,
  //   function (error) {
  //     console.error(error);
  //   }
  // );
   // Load the second new model
  loader.load(
    "https://cdn.glitch.global/494042e2-3d88-4420-9fed-57e4762a9e00/painting.glb?v=1735349715542",
    function (gltf) {
      newModel2 = gltf.scene;
    newModel2.scale.set(200, 200, 200);
       newModel2.rotation.y = 55;
      newModel2.position.set(-235, -150, 60);
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
    // if (guitarModel) {
    //   var intersectsGuitar = raycaster.intersectObject(guitarModel, true);
    //   if (intersectsGuitar.length > 0) {
    //     isHovering = true;
    //     hoveredModel = guitarModel;
    //     tooltip.textContent = "Click to view music"; // Tooltip for the guitar
    //   }
    // }
        // Check intersections with the models
   // Play the sound when hovering over the guitar
if (guitarModel) {
  var intersectsGuitar = raycaster.intersectObject(guitarModel, true);
  
  // Check if the user is hovering over the guitar
  if (intersectsGuitar.length > 0) {
    isHovering = true;
    hoveredModel = guitarModel;
    tooltip.textContent = "¸.·✩·.¸¸.·¯⍣✩¸Click to view music✩⍣¯·.¸¸.·✩·."; // Tooltip for the guitar

    // Play the sound when hovering over the guitar (if not already playing)
    if (isHovering) {
      audio.muted = false;  // Unmute on user click
      audio.play();
    }
  } else {
    // If the raycaster no longer intersects with the guitar, stop the audio
    if (!isHovering) {
      isHovering = false;
      audio.pause();  // Stop the audio
      audio.currentTime = 0;  // Reset audio to the beginning if needed
    }
  }
}


    if (newModel) {
      var intersectsNewModel = raycaster.intersectObject(newModel, true);
      
      if (intersectsNewModel.length > 0) {
        isHovering = true;
        hoveredModel = newModel;
        tooltip.textContent = "★¸.•☆•.¸★ Click to play audio ★⡀.•☆•.★"; // Tooltip for the first new model
        
         // Play the sound when hovering over the guitar
    //     if (isHovering) {
    //   audior.muted = false;  // Unmute on user click
    //   audior.play();
    // }
  } 
  //     else {
  //   // If the raycaster no longer intersects with the guitar, stop the audio
  //   if (!isHovering) {
  //     isHovering = false;
  //     audior.pause();  // Stop the audio
  //     audior.currentTime = 0;  // Reset audio to the beginning if needed
  //   }
  // }
}

    if (newModel2) {
      var intersectsNewModel2 = raycaster.intersectObject(newModel2, true);
      if (intersectsNewModel2.length > 0) {
        isHovering = true;
        hoveredModel = newModel2;
        tooltip.textContent = " ¸„٭⊹✡•~⍣°”ˆ˜¨Click to view visual art¨˜ˆ”°⍣~•✡⊹٭„¸"; // Tooltip for the second new model
      }
    }

    if (newModel3) {
      var intersectsNewModel3 = raycaster.intersectObject(newModel3, true);
      if (intersectsNewModel3.length > 0) {
        isHovering = true;
        hoveredModel = newModel3;
        tooltip.textContent = "¯⍣✩¸Click for more sound✩⍣¯"; // Tooltip for the third new model
      }
    }
    
       if (newModel4) {
      var intersectsNewModel4 = raycaster.intersectObject(newModel4, true);
      if (intersectsNewModel4.length > 0) {
        isHovering = true;
        hoveredModel = newModel4;
        tooltip.textContent = "¸.·✩·.¸¸.·¯⍣✩¸Click to view art✩⍣¯·.¸¸.·✩·."; // Tooltip for the third new model
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
        window.location.href = "https://youtu.be/kgST1lRHW0o?feature=shared"; // Redirect for the guitar model
        return;
      }
    }

   if (newModel) {
  var intersectsNewModel = raycaster.intersectObject(newModel, true);
  if (intersectsNewModel.length > 0) {
    if (audior.paused) {
      // Play the audio if it's paused
      audior.muted = false;
      audior.play();
    } else {
      // Stop the audio if it's playing
      audior.pause();
      audior.currentTime = 0; // Reset the audio to the beginning (optional)
    }
  }
}


    if (newModel2) {
      var intersectsNewModel2 = raycaster.intersectObject(newModel2, true);
      if (intersectsNewModel2.length > 0) {
        window.location.href = "https://youtu.be/kgST1lRHW0o?feature=shared"; // Redirect for the second new model
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

  
  
  
  
     // Animate Camera Position to Pan on Load
  var clock = new THREE.Clock(); // Create a clock for timing animations
  var targetPosition = { x: 0, y: 10, z: 350 }; // Target position
  var startPosition = camera.position.clone();
  var duration = 5; // Animation duration in seconds
  
    // Set initial camera position
var cameraTargetPosition = new THREE.Vector3(0, 50, 100); // Default position
camera.position.set(cameraTargetPosition.x, cameraTargetPosition.y, cameraTargetPosition.z);

    function animateCamera() {
    var elapsed = clock.getElapsedTime();
    var t = Math.min(elapsed / duration, 1); // Clamp t to [0, 1]
    camera.position.lerpVectors(startPosition, new THREE.Vector3(
      targetPosition.x,
      targetPosition.y,
      targetPosition.z
    ), t);

    if (t < 1) {
      requestAnimationFrame(animateCamera);
    }
  }
  
   // Start the animation after a short delay
  setTimeout(() => {
    clock.start();
    animateCamera();
  }, 500);

  // Render Loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update OrbitControls
    renderer.render(scene, camera);
  }
  
  //click
// Raycaster and mouse setup
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// Variables for zooming state and original position
var isZoomedIn = false;
var originalCameraPosition = camera.position.clone(); // Store the original camera position
var zoomDistance = 200; // Distance to zoom in on the clicked point

// Double-click event to toggle zoom in/out
window.addEventListener("dblclick", function (event) {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Cast the ray to detect objects (in this case, the scene background)
  var intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    // If something is clicked, get the clicked point
    var intersectedPoint = intersects[0].point;

    if (isZoomedIn) {
      // Zoom out by returning to the original camera position
      camera.position.copy(originalCameraPosition);
      controls.target.copy(new THREE.Vector3(0, 0, 0)); // Reset the target to the origin
      isZoomedIn = false; // Toggle zoom state
    } else {
      // Zoom in by moving the camera closer to the clicked point
      var zoomedInPosition = intersectedPoint.clone().add(new THREE.Vector3(0, 0, zoomDistance));
      camera.position.copy(zoomedInPosition);

      // Update orbit controls target to the clicked point
      controls.target.copy(intersectedPoint);
      isZoomedIn = true; // Toggle zoom state
    }

    // Enable panning when zoomed in
    controls.enableDamping = true;  // Optional: enables smooth motion when panning
    controls.dampingFactor = 0.25; // Adjusts the smoothness of panning
    controls.screenSpacePanning = true; // Allows panning in screen space
    controls.maxPolarAngle = Math.PI / 2;  // Prevents upside down view
  }
});





 
// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
 
  // Update the controls
  controls.update(); // Update OrbitControls state
  renderer.render(scene, camera); // Render the scene with the camera

}
  
 

animate();

});
