<template>
  <div ref="threeRef" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

function init() {
  const renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  )
  // camera.position.set(10, 0, 0);
  camera.position.set(-0.3, 0, 0)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', render)
  controls.minDistance = 1
  // controls.maxDistance = 200;
  controls.maxDistance = 2
  controls.enablePan = false

  // const geometry = new THREE.SphereGeometry(1, 10, 10);
  // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  // const mesh = new THREE.Mesh(geometry, material);
  const mesh = addImg(
    'https://qhyxpicoss.kujiale.com/r/2019/07/01/L3D137S8ENDIADDWAYUI5L7GLUF3P3WS888_3000x4000.jpg?x-oss-process=image/resize,m_fill,w_1600,h_920/format,webp',
    scene,
    1
  )
  scene.add(mesh)

  controls.update()
  controls.target.copy(mesh.position)

  function render() {
    renderer.render(scene, camera)
  }

  function r() {
    render()
    requestAnimationFrame(r)
  }
  scene.add(new THREE.AxesHelper(1000))
  r()
}

function addImg(url: string, scene: any, n = 1) {
  console.log(n)
  const texture: any = THREE.ImageUtils.loadTexture(url)
  const material = new THREE.MeshBasicMaterial({ map: texture })
  // const geometry = new THREE.SphereGeometry(1, 10, 10);
  const geometry = new THREE.SphereGeometry(50, 256, 256)
  const mesh = new THREE.Mesh(geometry, material)
  material.side = THREE.DoubleSide
  scene.add(mesh)
  return mesh
}
onMounted(() => {
  console.log(THREE)

  init()
})
</script>

<style lang="scss" scoped></style>
