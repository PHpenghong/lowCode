<template>
  <div id="sys_power">
    <section class="power_sec">
      <section class="role_sec">
        <Role @get-router-role="getRouterRole" />
      </section>
      <section class="router_sec">
        <Router ref="routerRef" />
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

const Role = defineAsyncComponent(() => import('./components/Role.vue'))
const Router = defineAsyncComponent(() => import('./components/Router.vue'))

const routerRef = ref<any>()

const getRouterRole = (role: string | number) => {
  routerRef.value.getRouterRoleList(role)
}
</script>

<style lang="scss" scoped>
#sys_power {
  width: 100%;
  height: 100%;
  .power_sec {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-gap: 15px;
    .role_sec {
      height: 100%;
      width: 500px;
      background-color: #ffffff;
      .role_sec_header {
        height: 50px;
      }
      .role_sec_list {
        flex: 1;
      }
    }
    .router_sec {
      height: 100%;
      flex: 1;
      background-color: #ffffff;
    }
  }
}
</style>
