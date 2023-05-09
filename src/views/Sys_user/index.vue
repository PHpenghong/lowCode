<template>
  <div id="sys_user">
    <section>
      <UserTable />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue'
// import { search } from '@/api/user'

const UserTable = defineAsyncComponent(
  () => import('./components/UserTable.vue')
)

onMounted(() => {
  // getUserList()
})

// const getUserList = async () => {
//   const res = await search({
//     page: 1,
//     page_size: 10
//   })
//   console.log(res)
// }
</script>

<style lang="scss" scoped></style>
