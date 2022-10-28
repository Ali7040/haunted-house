import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { MeshStandardMaterial } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' 


/**
 * Base
 */
// DebugF
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')



// Scene
const scene = new THREE.Scene()
scene.background= new THREE.Color('#0f2027')
// Fog
const fog = new THREE.Fog('#262837' , 1, 15)
scene.fog=fog
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
// 3d object loading



const doorColorTexture =  textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture =  textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcculusionTexture =  textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture =  textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture =  textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture =  textureLoader.load('./textures/door/metalness.jpg')
const doorRougnessTexture =  textureLoader.load('./textures/door/roughness.jpg')



const bricksColorTexture = textureLoader.load('./textures/bricks/color.jpg')
const bricksAmbientOcculusionTexture = textureLoader.load('./textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('./textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('./textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('./textures/grass/color.jpg')
const grassAmbientOcculusionTexture = textureLoader.load('./textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('./textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('./textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8 , 8)
grassAmbientOcculusionTexture.repeat.set(8 , 8)
grassNormalTexture.repeat.set(8 , 8)
grassRoughnessTexture.repeat.set(8 , 8)


// reaptinh on x-axis
grassColorTexture.wrapS = THREE.RepeatWrapping 
grassAmbientOcculusionTexture.wrapS  = THREE.RepeatWrapping
grassNormalTexture.wrapS  = THREE.RepeatWrapping
grassRoughnessTexture.wrapS  = THREE.RepeatWrapping

// reaptinh on y-axis

grassColorTexture.wrapT = THREE.RepeatWrapping 
grassAmbientOcculusionTexture.wrapT  = THREE.RepeatWrapping
grassNormalTexture.wrapT  = THREE.RepeatWrapping
grassRoughnessTexture.wrapT  = THREE.RepeatWrapping
// particles

const particlesGeometry = new THREE.SphereGeometry(1, 32, 32) 
const count = 1000

const positions = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.6) * 15
    
}
particlesGeometry.setAttribute('position',
new THREE.BufferAttribute(positions , 3)
)
// particals Material
const particlesMaterial = new THREE.PointsMaterial({
    size : 0.02,
    sizeAttenuation: false,
    color: 0xfff000
})

// poimts

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)




/**
 * House
// Groups */
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshBasicMaterial({
        map: bricksColorTexture,
        aoMap:bricksAmbientOcculusionTexture,
        roughnessMap: bricksRoughnessTexture,
        normalMap: bricksNormalTexture
    })

)
walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array , 
        2)
)
walls.position.y = 2.5 * 0.5  
house.add(walls)

//  Roof 
const roof = new THREE.Mesh(
new THREE.ConeGeometry(3.5 ,1 , 4 ),
new THREE.MeshStandardMaterial({color:'#b35f45'})

)
roof.position.y = 2.5 + 0.5
roof.rotation.y = Math.PI * 0.25
house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2 ,2.2 ,100 , 100 ),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcculusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture, 
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRougnessTexture,
    })
)
door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array , 
        2)
)
door.position.y = 1
door.position.z = 2.01 
house.add(door)
// bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({color: '#89c854'})
// bush1
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5 ,0.5 , 0.5)
bush1.position.set(0.8, 0.2 , 2.2)
// bush2
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25 ,0.25 , 0.25)
bush2.position.set(1.4, 0.1 , 2.1)
// bush3
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4 ,0.4 , 0.4)
bush3.position.set(-0.8 , 0.1 , 2.2)
// bush3
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15 ,0.15 , 0.15)
bush4.position.set(-1 , 0.05 , 2.6)
house.add( bush1, bush2 , bush3 , bush4)


// Floor

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        aoMap: grassAmbientOcculusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
     })
)
floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array , 
        2)
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)
// door light
const doorLight = new THREE.PointLight('#ff7d46', 1 , 7)
doorLight.position.set(0, 2.2 , 2.7)
house.add(doorLight)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')




// Shadow 

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
moonLight.castShadow = true
doorLight.castShadow = true

walls.castShadow = true

bush1.castShadow =true
bush2.castShadow =true
bush3.castShadow =true
bush4.castShadow =true

floor.receiveShadow = true

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // updates particles

    // for(let i = 0 ; i < count * 3 ; i++){
    //     particlesGeometry.attributes.position.array[count * 3 +1 ] = Math.sin(elapsedTime)
    // }
    house.rotation.y = elapsedTime * 0.2
   floor.rotation.z = elapsedTime * 0.2
    particles.rotation.y = elapsedTime * 0.2

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()