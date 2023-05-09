<template>
  <div>
    <section class="title_art_sec">
      <article class="title_art">
        <slot />
      </article>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.title_art_sec {
  background-color: #dcdfe6;
  position: relative;
  display: block;
  height: 1px;
  width: 100%;
  margin: 15px 0;
  .title_art {
    position: absolute;
    background-color: #fff;
    padding: 0 5px;
    font-weight: 500;
    color: #303133;
    font-size: 14px;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
