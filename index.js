let markerSQUIDvisible = false;
let markerROBOTvisible = false;
let markerSQUIDnotvisible = false;
let markerROBOTnotvisible = false;


AFRAME.registerComponent('update-distance', {
  init: function () {
    // Get the object entities
    this.objectSquid = document.querySelector('#object-squid');
    this.objectRobot = document.querySelector('#object-robot');
    this.bubbleSquid = document.querySelector('#bubblesquid');
    this.bubbleRobot = document.querySelector('#bubblerobot');
    //this.objectBubbleSquid = document.querySelector('#bubble-squid');
    //this.objectBubbleRobot = document.querySelector('#bubble-robot');
    //this.textSquid = document.querySelector('#squid-text');
    //this.textRobot = document.querySelector('#robot-text');
    //this.initialScaleRobot = { x: 0.45, y: 0.45, z: 0.45 };
    //this.initialScaleSquid = { x: 0.8, y: 0.8, z: 0.8 };
    this.initialScaleRobot = { x: 0.8, y: 0.8, z: 0.8 };
    this.initialScaleSquid = { x: 0.6, y: 0.6, z: 0.6 };
    // Set the default animation for objectROBOT
    //this.objectRobot.setAttribute("animation-mixer", "clip: Appearance; loop: repeat; duration: 0; crossFadeDuration: 1");
    //this.objectSquid.setAttribute("animation-mixer", "clip: Pop Up; loop: repeat; duration: 0; crossFadeDuration: 1");
  },

  tick: function () {
    // Get the positions of the objects
    const positionSquid = new THREE.Vector3();
    const positionRobot = new THREE.Vector3();

    this.objectSquid.object3D.getWorldPosition(positionSquid);
    this.objectRobot.object3D.getWorldPosition(positionRobot);

    // Calculate the distance between the camera and the object-robot
    const distanceToCamera = this.objectRobot.object3D.position.distanceTo(this.el.sceneEl.camera.el.object3D.position);

    // Calculate the scaling factor based on the distance
    const scaleFactor = 1 + distanceToCamera * 5; // Adjust this factor based on your needs

    // Calculate the distance between the two objects
    const distance = positionSquid.distanceTo(positionRobot);
    xPositionSQD = positionSquid.x; // Use positionSquid.x
    xPositionRBT = positionRobot.x; // Use positionRobot.x
    // Log the distance to the console
    // console.log('Distance between object-squid and object-robot: ' + distance.toFixed(2) + ' units');
    //console.log(xPositionRBT);

    this.objectRobot.setAttribute('animation__scale', {
      property: 'scale',
      dur: 700, // Set the duration of the scaling transition (in milliseconds)
      to: `${this.initialScaleRobot.x * scaleFactor} ${this.initialScaleRobot.y * scaleFactor} ${this.initialScaleRobot.z * scaleFactor}`,
    });
    this.objectSquid.setAttribute('animation__scale', {
      property: 'scale',
      dur: 700, // Set the duration of the scaling transition (in milliseconds)
      to: `${this.initialScaleSquid.x * scaleFactor} ${this.initialScaleSquid.y * scaleFactor} ${this.initialScaleSquid.z * scaleFactor}`,
    });

    //this.objectRobot.setAttribute('scale', {
    //  x: this.initialScaleRobot.x * scaleFactor,
    //  y: this.initialScaleRobot.y * scaleFactor,
    //  z: this.initialScaleRobot.z * scaleFactor,
    //});

    // Check the distance and update animations for objectROBOT and objectROBOT
    const lookAtMeAshley = (pos1, pos2, dist) => {
      if (pos1 <= 0){
        this.objectSquid.setAttribute("animation", "property: rotation; to: 0 60 0; dur: 200; easing: linear");
        this.objectRobot.setAttribute("animation", "property: rotation; to: 0 -60 0; dur: 200; easing: linear");
        this.objectSquid.removeAttribute("look-at");
        this.objectRobot.removeAttribute("look-at");
      }
      else if (pos2 <=0 ) {
        this.objectSquid.setAttribute("animation", "property: rotation; to: 0 -60 0; dur: 200; easing: linear");
        this.objectRobot.setAttribute("animation", "property: rotation; to: 0 60 0; dur: 200; easing: linear");
        this.objectSquid.removeAttribute("look-at");
        this.objectRobot.removeAttribute("look-at");
      }
      if (dist < 2000) {
        this.objectRobot.setAttribute("animation-mixer", "clip: Converstation; loop: repeat; duration: 0; crossFadeDuration: 1");
        this.objectSquid.setAttribute("animation-mixer", "clip: Conversation; loop: repeat; duration: 0; crossFadeDuration: 1");
        
        this.bubbleRobot.setAttribute("animation-mixer", "clip: Apperance; loop: once; duration: 0");
        this.bubbleSquid.setAttribute("animation-mixer", "clip: Appearance; loop: once; duration: 0");
        setTimeout(() => {
        this.bubbleRobot.setAttribute("animation-mixer", "clip: Float; loop: repeat; duration: 0; crossFadeDuration: 1");
        this.bubbleSquid.setAttribute("animation-mixer", "clip: Float; loop: repeat; duration: 0; crossFadeDuration: 1");
        }, 900);
        this.bubbleRobot.setAttribute("visible","true");
        this.bubbleSquid.setAttribute("visible","true");
      }
      else {
        this.objectRobot.setAttribute("animation-mixer", "clip: IDlE; loop: repeat; duration: 0; crossFadeDuration: 1");
        this.objectSquid.setAttribute("animation-mixer", "clip: IDLE; loop: repeat; duration: 0; crossFadeDuration: 1");
        this.bubbleRobot.setAttribute("visible","false");
        this.bubbleSquid.setAttribute("visible","false");
        this.bubbleRobot.removeAttribute("animation-mixer");
        this.bubbleSquid.removeAttribute("animation-mixer");
      }
    }

    if (markerSQUIDvisible && markerROBOTvisible) {
     lookAtMeAshley(xPositionSQD, xPositionRBT, distance)
     console.log('Distance between object-squid and object-robot: ' + distance.toFixed(2) + ' units');
     //this.textRobot.setAttribute("visible", "true");
     //this.textSquid.setAttribute("visible", "true");
     //this.objectBubbleRobot.setAttribute("visible", "true");
     //this.objectBubbleSquid.setAttribute("visible", "true");
     //this.textRobot.setAttribute("value", "I can see object Robocam!");
     //this.textSquid.setAttribute("value", "I can see object Robot!");

    }
//   else if (markerSQUIDvisible && markerROBOTnotvisible) {
//     lookAtMeAShley(xPositionSQD, xPositionRBT, distance)
//      console.log('Object-squid still visible while object-robot is missing!');
//      this.textRobot.setAttribute("visible", "false");
//      this.textSquid.setAttribute("visible", "true");
//      this.textRobot.setAttribute("value", "I can see object Robocam!");
//      this.textSquid.setAttribute("value", "I no longer see object Robot!");
//    }
},
});
//
//============================================================================================================================
AFRAME.registerComponent("marker-robot", {
  init: function () {
    const markerROBOT = this.el;
    const objectROBOT = document.getElementById("object-robot");
    const objectSQUID = document.getElementById("object-squid");
    const bubbleROBOT = document.getElementById("bubblerobot");
    const bubbleSQUID = document.getElementById("bubblesquid");
    let popUpPlayedRBT = false;
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    markerROBOT.addEventListener("targetFound", (event) => {
      console.log("Target robot found");
      //objectROBOT.removeAttribute("animation-mixer");
      markerROBOTvisible = true;
      //textROBOT.setAttribute("visible", "true");
      //objectBUBBLEROBOT.setAttribute("visible","true");
      //textROBOT.setAttribute("value", "Hi, I am Model Robot!");
      objectSQUID.setAttribute("look-at", "[camera]");
      
      if (!popUpPlayedRBT) {
        // Play Pop Up animation only if it hasn't played before
        objectROBOT.setAttribute("animation-mixer", "clip: Appearance; loop: repeat; duration: 0");
        //bubbleROBOT.setAttribute("animation-mixer", "clip: Apperance; once: repeat; duration: 0");
        
        setTimeout(() => {
        objectROBOT.setAttribute("animation-mixer", "clip: IDlE; loop: repeat; duration: 0; crossFadeDuration: 1");
        popUpPlayedRBT = false;
        }, 5550);
      }
      //if (popUpPlayedRBT == true) {
        // Play Idle animation if Pop Up has already played
        //objectROBOT.setAttribute("animation-mixer", "clip: Idle; loop: repeat; duration: 0; crossFadeDuration: 1");
      //}
    });
    //----------------------------------------------------------------------------------------------------------------
    markerROBOT.addEventListener("targetLost", (event) => {
      console.log("Target robot lost");
      objectROBOT.removeAttribute("animation");
      objectSQUID.removeAttribute("animation");
      objectROBOT.removeAttribute("animation-mixer");
      markerROBOTvisible = false;
      markerROBOTnotvisible = true;
      objectROBOT.setAttribute("look-at", "[camera]");
      objectSQUID.setAttribute("look-at", "[camera]");
      bubbleROBOT.setAttribute("visible","false");
      bubbleSQUID.setAttribute("visible","false");
      bubbleROBOT.removeAttribute("animation-mixer");
      bubbleSQUID.removeAttribute("animation-mixer");
      objectSQUID.setAttribute("animation", "property: rotation; to: 0 0 0; dur: 200; easing: linear");
      //objectSQUID.setAttribute("animation-mixer", "clip: Idle; loop: repeat; duration: 0; crossFadeDuration: 1")
    });
  }
});
//============================================================================================================================
AFRAME.registerComponent("marker-squid", {
  init: function () {
    const markerSQUID = this.el;
    const objectROBOT = document.getElementById("object-robot");
    const objectSQUID = document.getElementById("object-squid");
    const bubbleROBOT = document.getElementById("bubblerobot");
    const bubbleSQUID = document.getElementById("bubblesquid");
    let popUpPlayedSQD = false;
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    markerSQUID.addEventListener("targetFound", (event) => {
      console.log("Target squid found");
      //objectSQUID.removeAttribute("animation-mixer");
      markerSQUIDvisible = true;
      //textSQUID.setAttribute("visible", "true");
      //objectBUBBLESQUID.setAttribute("visible","true");
      //textSQUID.setAttribute("value", "Hi, I am Model Robocam!");
      objectROBOT.setAttribute("look-at", "[camera]");

      if (!popUpPlayedSQD) {
        // Play Pop Up animation only if it hasn't played before
        objectSQUID.setAttribute("animation-mixer", "clip: Appearance; loop: repeat; duration: 0");
        //bubbleSQUID.setAttribute("animation-mixer", "clip: Appearance; once: repeat; duration: 0");
        
        setTimeout(() => {
        objectSQUID.setAttribute("animation-mixer", "clip: IDLE; loop: repeat; repeat: 0; crossFadeDuration: 1");
        popUpPlayedSQD = false;
        }, 6700);
      }
      //if (popUpPlayedSQD == true) {
         //Play Idle animation if Pop Up has already played
       // objectSQUID.setAttribute("animation-mixer", "clip: Idle; loop: repeat; duration: 0; crossFadeDuration: 1");
      //}   
    });
    //----------------------------------------------------------------------------------------------------------------
    markerSQUID.addEventListener("targetLost", (event) => {
      console.log("Target squid lost");
      objectROBOT.removeAttribute("animation");
      objectSQUID.removeAttribute("animation");
      objectSQUID.removeAttribute("animation-mixer");
      markerSQUIDvisible = false;
      markerSQUIDnotvisible = true;
      objectROBOT.setAttribute("look-at", "[camera]");
      objectSQUID.setAttribute("look-at", "[camera]");
      bubbleROBOT.setAttribute("visible","false");
      bubbleSQUID.setAttribute("visible","false");
      bubbleROBOT.removeAttribute("animation-mixer");
      bubbleSQUID.removeAttribute("animation-mixer");
      //setTimeout(() => {
        //textROBOT.setAttribute("visible", "false");
        //objectBUBBLEROBOT.setAttribute("visible", "false");
      //}, 2000);
      objectROBOT.setAttribute("animation", "property: rotation; to: 0 0 0; dur: 200; easing: linear");
      //objectROBOT.setAttribute("animation-mixer", "clip: Idle; loop: repeat; duration: 0; crossFadeDuration: 1")
    });
  }
});