<template>
  <div ref="threeRef" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  AxesHelper,
  MeshLambertMaterial,
  PlaneGeometry,
  Mesh,
  BoxGeometry,
  SphereGeometry,
  SpotLight
  // AmbientLight
} from 'three'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export default defineComponent({
  setup() {
    const threeRef = ref()

    function init() {
      const scene = new Scene()
      const axes = new AxesHelper(20)
      scene.add(axes)

      const renderer = new WebGLRenderer({ antialias: true })
      renderer.setClearColor(new Color(0x000000))
      renderer.setSize(1000, 1000)

      const planeGeometry = new PlaneGeometry(100, 100)
      const planeMaterial = new MeshLambertMaterial({ color: 0xffffff })
      const plane = new Mesh(planeGeometry, planeMaterial)
      plane.rotation.x = -0.5 * Math.PI
      plane.position.x = 0
      plane.position.y = 0
      plane.position.z = 0
      // 地面接受阴影
      plane.receiveShadow = true
      scene.add(plane)

      // 盒子几何体
      const cubeGeometry = new BoxGeometry(4, 4, 14)
      const cubeMaterial = new MeshLambertMaterial({ color: 0xff0000 })
      const cube = new Mesh(cubeGeometry, cubeMaterial)
      // cube.rotation.x=-0.5*Math.PI
      // 开启阴影
      cube.castShadow = true
      cube.position.x = 14
      cube.position.y = 2
      cube.position.z = 2
      scene.add(cube)

      // 球形几何体
      const sphereGeometry = new SphereGeometry(4, 20, 20)
      const sphereMaterial = new MeshLambertMaterial({ color: 0x77777ff })
      const sphere = new Mesh(sphereGeometry, sphereMaterial)
      sphere.castShadow = true
      sphere.position.x = 2
      sphere.position.y = 2
      sphere.position.z = 2
      scene.add(sphere)

      const camera = new PerspectiveCamera(45, 1000 / 1000, 0.1, 1000)
      camera.position.x = -30
      camera.position.y = 40
      camera.position.z = 30
      camera.lookAt(scene.position)
      threeRef.value.appendChild(renderer.domElement)

      // 光源效果
      const sptLight = new SpotLight(0xffffff)
      sptLight.position.set(50, 80, 50)
      // sptLight.shadow.camera.near=40,
      // sptLight.shadow.camera.far=-40,
      // 开启阴影
      sptLight.castShadow = true
      scene.add(sptLight)
      // const ambientLight = new AmbientLight(0xcccccc)
      // scene.add(ambientLight)
      // 渲染器开启阴影
      renderer.shadowMap.enabled = true
      renderer.render(scene, camera)
    }

    onMounted(() => {
      init()
    })
    return {
      threeRef
    }
  }
})
</script>
