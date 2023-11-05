let scene, camera, renderer, controls;

init();
animate();

function init() {
    // 创建场景
    scene = new THREE.Scene();

    // 创建相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    // 创建渲染器并添加到HTML
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 添加OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // 增加环境光以确保场景中有基础的光线
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 第二个参数是光照强度
scene.add(ambientLight);

// 增加点光源
const pointLight = new THREE.PointLight(0xffffff, 1, 100); // 第二个参数是光照强度
pointLight.position.set(0, 10, 10); // 设置光源位置
scene.add(pointLight);
    // 添加几何体（例如画廊的墙壁）
    // ...

    // 监听窗口大小变化
    window.addEventListener('resize', onWindowResize, false);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addFloor() {
    // 加载大理石纹理
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('img/textures/marble.jpg', function(texture) {
        // 创建大理石纹理的平面几何体作为地板
        const floorGeometry = new THREE.PlaneGeometry(10, 10);
        const floorMaterial = new THREE.MeshPhongMaterial({
            map: texture // 使用加载的纹理作为材料
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);

        // 将地板旋转至水平方向
        floor.rotation.x = -Math.PI / 2;

        // 根据需要调整地板的位置，消除与墙壁间的间隙
        floor.position.y = -0.01; // 可以调整这个值以确保地板和墙壁紧密接触

        // 将地板添加到场景中
        scene.add(floor);
    });
}

// 调用函数添加地板
addFloor();


// 在这里添加更多的函数来创建画廊的墙壁和艺术品
// 在此之前的初始化代码保持不变


function addArtwork(textureFile, positionX, positionY, positionZ, sizeX, sizeY, rotationY = 0) {
    const loader = new THREE.TextureLoader();
    loader.load('img/' + textureFile, function (texture) {
        const artworkGeometry = new THREE.PlaneGeometry(sizeX, sizeY);
        const artworkMaterial = new THREE.MeshBasicMaterial({ map: texture });
        const artwork = new THREE.Mesh(artworkGeometry, artworkMaterial);
        artwork.position.set(positionX, positionY, positionZ);
        artwork.rotation.y = rotationY;
        scene.add(artwork);
    });
}

function addWalls() {
    const wallGeometry = new THREE.BoxGeometry(10, 4, 0.1);
    const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const wallPositions = [
        { x: 0, y: 2, z: -5 },
        { x: -5, y: 2, z: 0 },
        { x: 5, y: 2, z: 0 }
    ];

    wallPositions.forEach((pos) => {
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(pos.x, pos.y, pos.z);
        wall.rotation.y = pos.x === 0 ? 0 : Math.PI / 2;
        scene.add(wall);
    });
}

// 初始化后调用添加墙壁的函数
addWalls();

// 添加艺术品，包括调整尺寸和方向
// 01.png 和 02.png (横向) - 尺寸调整为 768x512
addArtwork('01.png', -4.9, 2, 2, 2.56, 1.71, Math.PI / 2);
addArtwork('02.png', -4.9, 2, -2, 2.56, 1.71, Math.PI / 2);
// 03.png 和 04.png (纵向) - 尺寸调整为 512x768
addArtwork('03.png', 0, 2, -4.9, 1.71, 2.56);
addArtwork('04.png', 4.9, 2, 0, 1.71, 2.56, -Math.PI / 2);




// 在文件顶部定义初始相机位置和方向
const initialCameraPosition = new THREE.Vector3(/* 放置默认的相机位置坐标 x, y, z */);
const initialCameraRotation = new THREE.Euler(/* 放置默认的相机旋转坐标 x, y, z */);

// 添加重置视角的函数
function resetView() {
    controls.reset();
}

// 添加事件监听器到按钮
document.getElementById('resetView').addEventListener('click', resetView);
