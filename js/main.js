var camera, scene, renderer;
var effect, controls;
var element, container;

var sky, sunSphere;

var clock = new THREE.Clock();

init();
animate();

function init() {










  //ここから
  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  container = document.getElementById('example');
  container.appendChild(element);

  effect = new THREE.StereoEffect(renderer);

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xcce0ff, 100, 400);

  camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
  camera.position.set(0, 10, 0);
  scene.add(camera);

  controls = new THREE.OrbitControls(camera, element);
  controls.rotateUp(Math.PI / 4);
  controls.target.set(
    camera.position.x + 0.1,
    camera.position.y,
    camera.position.z
  );
  controls.noZoom = true;
  controls.noPan = true;

  function setOrientationControls(e) {
    if (!e.alpha) {
      return;
    }

    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    element.addEventListener('click', fullscreen, false);

    window.removeEventListener('deviceorientation', setOrientationControls, true);
  }
  window.addEventListener('deviceorientation', setOrientationControls, true);


  //ambient light
  var ambiColor = "#000000";
  var ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);

  //point light
  var pointon = true;
  var pointColor1 = "#ffe1b9";
  var pointLight1 = new THREE.PointLight(pointColor1);

  pointLight1.intensity = 1.0;
  pointLight1.distance = 200;
  pointLight1.position.set(0, 14.5, 8);
  if (pointon == true) {
    scene.add(pointLight1);
  }

  //point light -lamp
  var point2on = true;
  var point3on = true;
  var lampColor = "#ff5d25";
  var pointLight2 = new THREE.PointLight(lampColor);

  pointLight2.intensity = 1.2;
  pointLight2.distance = 70;
  pointLight2.position.set(-33, 9, 6);

  if (point2on == true) {
    scene.add(pointLight2);
  }
  var pointLight3 = new THREE.PointLight(lampColor);
  pointLight3.intensity = 1.2;
  pointLight3.distance = 70;
  pointLight3.position.set(-33, 9, -5);

  if (point3on == true) {
    scene.add(pointLight3);
  }



  //directional light
  var pointColor = "#ffffff";
  var directionalLight = new THREE.DirectionalLight(pointColor);
  directionalLight.position.set(0, 60, -30);
  directionalLight.castShadow = true;
  directionalLight.shadowCameraNear = 2;
  directionalLight.shadowCameraFar = 200;
  directionalLight.shadowCameraLeft = -50;
  directionalLight.shadowCameraRight = 50;
  directionalLight.shadowCameraTop = 50;
  directionalLight.shadowCameraBottom = -50;

  directionalLight.distance = 0;
  directionalLight.intensity = 1;
  directionalLight.shadowMapHeight = 1024;
  directionalLight.shadowMapWidth = 1024;


  scene.add(directionalLight);


  var mesh;
  group = new THREE.Object3D();
  //longsofa
  var loader = new THREE.JSONLoader();
  loader.load('assets/models/longsofa.json', function(geometry, mat) {
    var faceMaterial = new THREE.MeshFaceMaterial(mat);
    mesh = new THREE.Mesh(geometry, faceMaterial);

    mesh.position.set(0, 0, -3);
    mesh.scale.x = 10;
    mesh.scale.y = 10;
    mesh.scale.z = 10;
    mesh.castShadow = true;
    group.add(mesh);

  });

  //shortsofa
  var loader = new THREE.JSONLoader();
  loader.load('assets/models/sofa.json', function(geometry, mat) {
    var faceMaterial = new THREE.MeshFaceMaterial(mat);
    mesh = new THREE.Mesh(geometry, faceMaterial);
    mesh.position.set(20, 0, 12);
    mesh.scale.x = 10;
    mesh.scale.y = 10;
    mesh.scale.z = 10;
    mesh.rotation.y = -Math.PI / 2;
    mesh.castShadow = true;
    group.add(mesh);
  });

  //shortsofa2
  var loader = new THREE.JSONLoader();
  loader.load('assets/models/sofa.json', function(geometry, mat) {
    var faceMaterial = new THREE.MeshFaceMaterial(mat);
    mesh = new THREE.Mesh(geometry, faceMaterial);
    mesh.position.set(-20, 0, 12);
    mesh.scale.x = 10;
    mesh.scale.y = 10;
    mesh.scale.z = 10;
    mesh.rotation.y = Math.PI / 2;
    mesh.castShadow = true;
    group.add(mesh);
  });

  var floor = createMesh(new THREE.BoxGeometry(75.2, 2, 73.8), "flooring-pattern-wh256.jpg", 1, 1);
  floor.position.x = 0.3;
  floor.position.y = -6.6;
  floor.position.z = 1.2
  floor.receiveShadow = true;

  group.add(floor);

  var carpet = createMesh(new THREE.BoxGeometry(55, 0.05, 55), "carpet.jpg", 3, 3);

  carpet.position.y = -5.55;
  carpet.position.z = 10;
  carpet.receiveShadow = true;

  group.add(carpet);


  //table
  var loader = new THREE.JSONLoader();
  loader.load('assets/models/table.json', function(geometry, mat) {
    var faceMaterial = new THREE.MeshFaceMaterial(mat);
    mesh = new THREE.Mesh(geometry, faceMaterial);
    mesh.position.set(0, -3, 12);
    mesh.scale.x = 10;
    mesh.scale.y = 10;
    mesh.scale.z = 10;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    group.add(mesh);
  });

  //kabe

  var loader = new THREE.JSONLoader();
  loader.load('assets/models/kabe2.json', function(geometry, mat) {

    var meshMaterial = new THREE.MeshLambertMaterial({
      color: 0xdefff4
    });
    mesh = new THREE.Mesh(geometry, meshMaterial);
    mesh.position.set(0, 15.3, 0);
    mesh.scale.x = 10;
    mesh.scale.y = 10;
    mesh.scale.z = 10;

    mesh.receiveShadow = false;
    group.add(mesh);
  });

  //door
  var doorclosed = true;
  var doorobj = new THREE.Object3D();
  var loader = new THREE.JSONLoader();
  loader.load('assets/models/door.json', function(geometry, mat) {
    var faceMaterial = new THREE.MeshFaceMaterial(mat);
    mesh = new THREE.Mesh(geometry, faceMaterial);
    //mesh.position.set(1, 11, -36.5);
    mesh.position.set(36.5, 11, 1);
    mesh.scale.x = 10;
    mesh.scale.y = 10;
    mesh.scale.z = 10;
    //mesh.position.set();
    mesh.rotation.y = -Math.PI / 2;

    mesh.receiveShadow = false;
    doorobj.add(mesh);
    targetList4.push(mesh);
  });
  scene.add(doorobj);

  //chest

  var loader = new THREE.JSONLoader();
  loader.load('assets/models/chest.json', function(geometry, mat) {
    var faceMaterial = new THREE.MeshFaceMaterial(mat);
    mesh = new THREE.Mesh(geometry, faceMaterial);
    mesh.position.set(0, 0.5, 34);
    mesh.scale.x = 10;
    mesh.scale.y = 10;
    mesh.scale.z = 10;

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  });

  //lamp1

  var loader = new THREE.JSONLoader();
  loader.load('assets/models/lamp.json', function(geometry, mat) {
    var faceMaterial = new THREE.MeshFaceMaterial(mat);
    mesh = new THREE.Mesh(geometry, faceMaterial);
    mesh.position.set(5, 9.3, 34);
    mesh.scale.x = 10;
    mesh.scale.y = 10;
    mesh.scale.z = 10;

    mesh.castShadow = true;
    group.add(mesh);
    targetList2.push(mesh);
  });

  //lamp2

  var loader = new THREE.JSONLoader();
  loader.load('assets/models/lamp.json', function(geometry, mat) {
    var faceMaterial = new THREE.MeshFaceMaterial(mat);
    mesh = new THREE.Mesh(geometry, faceMaterial);
    mesh.position.set(-5, 9.3, 34);
    mesh.scale.x = 10;
    mesh.scale.y = 10;
    mesh.scale.z = 10;

    mesh.castShadow = true;
    group.add(mesh);
    targetList3.push(mesh);
  });

  //chandelier

  var loader = new THREE.JSONLoader();
  loader.load('assets/models/syanderia.json', function(geometry, mat) {
    var faceMaterial = new THREE.MeshFaceMaterial(mat);
    mesh = new THREE.Mesh(geometry, faceMaterial);
    mesh.position.set(0, -3.5, 8);
    mesh.scale.x = 10;
    mesh.scale.y = 10;
    mesh.scale.z = 10;

    mesh.castShadow = true;
    group.add(mesh);
    targetList.push(mesh);
  });

  //flower

  var loader = new THREE.JSONLoader();
  loader.load('assets/models/flower5.json', function(geometry, mat) {
    var faceMaterial = new THREE.MeshFaceMaterial(mat);
    mesh = new THREE.Mesh(geometry, faceMaterial);
    mesh.position.set(0, 4, 10);
    mesh.scale.x = 1.5;
    mesh.scale.y = 1.5;
    mesh.scale.z = 1.5;

    mesh.castShadow = true;
    mesh.rotation.y = Math.PI;
    group.add(mesh);
  });

  //doorwaku

  var loader = new THREE.JSONLoader();
  loader.load('assets/models/doorwaku.json', function(geometry, mat) {
    var faceMaterial = new THREE.MeshFaceMaterial(mat);
    mesh = new THREE.Mesh(geometry, faceMaterial);
    mesh.position.set(2, 15, -73);
    mesh.scale.x = 10;
    mesh.scale.y = 10;
    mesh.scale.z = 10;

    //mesh.castShadow = true;
    mesh.rotation.y = Math.PI;
    group.add(mesh);
  });


  scene.add(group);
  group.rotation.y = -Math.PI / 2;




  var texture = THREE.ImageUtils.loadTexture(
    'assets/textures/grass01.jpg'
  );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat = new THREE.Vector2(50, 50);
  texture.anisotropy = renderer.getMaxAnisotropy();

  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 20,
    shading: THREE.FlatShading,
    map: texture
  });

  var geometry = new THREE.PlaneGeometry(1000, 1000);

  var mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -7.5;
  scene.add(mesh);








  window.addEventListener('resize', resize, false);
  setTimeout(resize, 1);
}

function resize() {
  var width = container.offsetWidth;
  var height = container.offsetHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  effect.setSize(width, height);
}

function update(dt) {
  resize();

  camera.updateProjectionMatrix();

  controls.update(dt);
}

function render(dt) {
  effect.render(scene, camera);
}

function animate(t) {
  requestAnimationFrame(animate);

  update(clock.getDelta());
  render(clock.getDelta());
}

function fullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }

}
function createMesh(geom, imageFile, x, y) {
  var texture = THREE.ImageUtils.loadTexture("assets/textures/" + imageFile);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  var mat = new THREE.MeshLambertMaterial();
  mat.map = texture;

  var mesh = new THREE.Mesh(geom, mat);
  mesh.material.map.repeat.set(x, y);
  return mesh;
}
