import * as BABYLON from '@babylonjs/core'

type Canvas = HTMLCanvasElement | null

const canvas : Canvas = document.querySelector('#renderCanvas')

const engine = new BABYLON.Engine(canvas)

const createScene = async  () => {
  const scene = new BABYLON.Scene(engine)

  //scene.createDefaultCameraOrLight(true, false, true)

  scene.createDefaultLight()
  // const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 5, -10), scene)
  const camera = new BABYLON.ArcRotateCamera('camera', 5, 10, 10, new BABYLON.Vector3(0, 0, 0), scene)
  camera.attachControl(true)
  // camera.inputs.addMouseWheel()
  // camera.setTarget(BABYLON.Vector3.Zero())

  camera.setPosition(new BABYLON.Vector3(0, 0, -20))
  camera.lowerBetaLimit = Math.PI / 4
  // camera.lowerBetaLimit = Math.PI / 2
  //limits zoom (the radius from material)
  camera.upperRadiusLimit = 40
  camera.lowerRadiusLimit = 10

  // const box = BABYLON.MeshBuilder.CreateBox('box', {faceColors: [ new BABYLON.Color4(1,0,0,1), BABYLON.Color3.Green()]})
  // const sphere = BABYLON.MeshBuilder.CreateSphere('mySphere', {
  //   segments: 2,
  //   diameter: 0.2,
  //   diameterY: 0.6
  // }, scene)
  // const capsule = BABYLON.MeshBuilder.CreateCapsule('caule')
  // const left = BABYLON.MeshBuilder.CreateSphere('b1', { diameter: 0.5})
  // const right = BABYLON.MeshBuilder.CreateSphere('b2',  { diameter: 0.5})

  // left.translate(new BABYLON.Vector3(1, -1, 1), BABYLON.Space.WORLD)
  // right.translate(new BABYLON.Vector3(1, -1, -1), BABYLON.Space.WORLD)

  // const ground = BABYLON.MeshBuilder.CreateGround('', {
  //   height: 10,
  //   width: 10,
  //   subdivisions: 10
  // })

  // ground.material = new BABYLON.StandardMaterial('standard')
  // ground.material.wireframe = true 
  
  // const groundFromHM = BABYLON.MeshBuilder.CreateGroundFromHeightMap('', '/src/assets/heightmap.jpg', {
  //   height: 10,
  //   width: 10,
  //   subdivisions: 500,
  //   maxHeight: 2
  // })
  // groundFromHM.material = new BABYLON.StandardMaterial('standard')
  // groundFromHM.material.wireframe = true 

  const fontData = await (await fetch('/Nova_Round_Book.json')).json()

  const text = BABYLON.MeshBuilder.CreateText('', 'Floki Viado', fontData, {
    size: 1,
    depth: 0.1
  })

  return scene
}

const scene = await createScene()

engine.runRenderLoop(() => {
  scene.render()
})

// making canvas responsive
window.addEventListener('resize', () => {
  engine.resize()
})