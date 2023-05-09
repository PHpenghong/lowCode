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
// const cube: any = null

let width: any = null
let height: any = null

onMounted(() => {
  threeStart()
})

// 场景
const initScene = () => {
  scene = new THREE.Scene()
}

// const objects: any[] = []
// 模型
// const initObject = () => {
//   // 要更新旋转角度的对象数组

//   // 空场景 太阳，地球，月亮作为子节点
//   const solarSystem = new THREE.Object3D()
//   scene.add(solarSystem)
//   objects.push(solarSystem)

//   const earthOrbit = new THREE.Object3D()
//   earthOrbit.position.x = 10
//   solarSystem.add(earthOrbit)
//   objects.push(earthOrbit)

//   // 一球多用
//   const radius = 1
//   const widthSegments = 6
//   const heightSegments = 6
//   const sphereGeometry = new THREE.SphereGeometry(
//     radius,
//     widthSegments,
//     heightSegments
//   )

//   const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 })
//   const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)
//   sunMesh.scale.set(5, 5, 5) // 扩大太阳的大小
//   solarSystem.add(sunMesh)
//   objects.push(sunMesh)

//   const earthMaterial = new THREE.MeshPhongMaterial({
//     color: 0x2233ff,
//     emissive: 0x112244
//   })
//   const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial)
//   earthOrbit.add(earthMesh)
//   objects.push(earthMesh)

//   const moonOrbit = new THREE.Object3D()
//   moonOrbit.position.x = 2
//   earthOrbit.add(moonOrbit)

//   const moonMaterial = new THREE.MeshPhongMaterial({
//     color: 0x888888,
//     emissive: 0x222222
//   })
//   const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial)
//   moonMesh.scale.set(0.5, 0.5, 0.5)
//   moonOrbit.add(moonMesh)
//   objects.push(moonMesh)

//   // 为每个节点添加一个AxesHelper
//   objects.forEach((node) => {
//     const axes: any = new THREE.AxesHelper()
//     axes.material.depthTest = false
//     axes.renderOrder = 1
//     node.add(axes)
//   })
// }

// 测试
const initTest = () => {
  const solarSystem = new THREE.Object3D()
  scene.add(solarSystem)

  // 一球多用
  const radius = 1
  const widthSegments = 6
  const heightSegments = 6
  const sphereGeometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  )

  const material = new THREE.MeshPhongMaterial({
    color: 'black',
    emissive: 'purple',
    shininess: 130
  })
  const sunMesh = new THREE.Mesh(sphereGeometry, material)
  sunMesh.scale.set(5, 5, 5)
  solarSystem.add(sunMesh)

  const axes: any = new THREE.AxesHelper()
  axes.material.depthTest = false
  axes.renderOrder = 1

  sunMesh.add(axes)
}

// 相机
const initCamera = () => {
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(0, 50, 0)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)
}

const initLight = () => {
  const color = 0xffffff
  const intensity = 3
  light = new THREE.PointLight(color, intensity)
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
  scene.rotation.y += 0.01
  scene.rotation.x += 0.01
  // objects.forEach((obj) => {
  //   obj.rotation.y += 0.01
  // })
  renderer.render(scene, camera)
}

const threeStart = () => {
  initThree()
  initCamera()
  initScene()
  // initObject()
  initTest()
  initLight()
  animate()
  // renderer.render(scene, camera)
}
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
