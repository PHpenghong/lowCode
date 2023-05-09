<template>
  <div id="container" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'
/**
 * https://threejs.org/manual/#zh/responsive
 *
 * requestAnimationFrame 这个函数就是让浏览器去执行一次参数中的函数，形成游戏循环
 */

let renderer: any = null // 渲染器
let camera: any = null // 相机
let scene: any = null // 场景
let light: any = null
let cube: any = null

let width: any = null
let height: any = null

onMounted(() => {
  threeStart()
})

// 场景
const initScene = () => {
  scene = new THREE.Scene()
}

// 模型
const initObject = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
  cube = new THREE.Mesh(geometry, material)

  // 将网格添加到场景
  scene.add(cube)
  camera.position.z = 5
}

// 相机
const initCamera = () => {
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
}

const initLight = () => {
  const color = '0xFFFFFF'
  const intensity = 1
  light = new THREE.DirectionalLight(color, intensity)
  light.position.set(-1, 2, 4)
  scene.add(light)
}

// 渲染器
const initThree = () => {
  width = document.getElementById('container')!.clientWidth
  height = document.getElementById('container')!.clientHeight
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  document.getElementById('container')!.appendChild(renderer.domElement)
}

// 动画
const animate = () => {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}

const threeStart = () => {
  initThree()
  initCamera()
  initScene()
  initObject()
  initLight()
  animate()
}
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
