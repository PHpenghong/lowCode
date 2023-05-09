<template>
  <div class="container">
    <SvgIcon class="errIcon" :size="30" name="404" />
    <!-- <div>抱歉，404了</div> -->
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .errIcon {
    color: #c3c3c3;
  }
}
</style>
