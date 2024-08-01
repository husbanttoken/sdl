var container;
var camera, controls, scene, renderer;
var ring, plane;
var start = Date.now();
init();
animate();

function init() {
  var width = window.innerWidth || 2;
  var height = window.innerHeight || 2;
  container = document.createElement('div');
  document.body.appendChild(container);
  var info = document.createElement('div');
  info.style.position = 'absolute';
  info.style.top = '50px';
  info.style.width = '100%';
  info.style.textAlign = 'center';
  info.innerHTML = '<h3>Sonic Digital Labs</h3>email: info@SDL.meme';
  container.appendChild(info);
  camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
  camera.position.y = 150;
  camera.position.z = 500;
  controls = new THREE.TrackballControls(camera);
  scene = new THREE.Scene();
  var light = new THREE.PointLight(0xffffff);
  light.position.set(500, 500, 500);
  scene.add(light);
  var light = new THREE.PointLight(0xffffff, 0.25);
  light.position.set(-500, -500, -500);
  scene.add(light);
  ring = new THREE.Mesh(new THREE.TorusGeometry( 100, 30, 30, 50 ), new THREE.MeshLambertMaterial({color: 0xe0e0e0} )); 
  scene.add(ring);
  // Plane
  plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(400, 400), new THREE.MeshBasicMaterial({
    color: 0xe0e0e0
  }));
  plane.position.y = -200;
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);
  renderer = new THREE.CanvasRenderer();
  renderer.setClearColor(0xf0f0f0);
  renderer.setSize(width, height);
  // container.appendChild( renderer.domElement );
  effect = new THREE.AsciiEffect(renderer);
  effect.setSize(width, height);
  container.appendChild(effect.domElement);
  //
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  effect.setSize(window.innerWidth, window.innerHeight);
}
//
function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  var timer = Date.now() - start;
  ring.rotation.y = timer * 0.0005;
  ring.rotation.z = timer * 0.0002;
  controls.update();
  effect.render(scene, camera);
}