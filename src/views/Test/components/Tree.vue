<template>
  <div class="tree" :class="{ horizontal: isHorizontal, vertical: isVertical }">
    <div
      v-for="node in nodes"
      :key="node.id"
      :class="{
        node: true,
        node_vertical: isVertical,
        node_horizontal: isHorizontal
      }"
    >
      <div
        :class="{
          label: true,
          label_vertical: isVertical,
          label_horizontal: isHorizontal
        }"
        :style="{ transform: `rotate(${labelRotation}deg)` }"
        @click="toggleNode(node)"
      >
        <span
          v-if="hasChildren(node)"
          :class="{ icon_horizontal: isHorizontal, icon_vertical: isVertical }"
          >{{ node.collapsed ? '+' : '-' }}</span
        >
        <span :class="{ text: true, text_horizontal: isHorizontal }">{{
          node.label
        }}</span>
      </div>
      <!-- <transition :name="`slide_${direction}`"> -->
      <transition>
        <div
          v-if="!node.collapsed"
          :class="{
            children: true,
            children_horizontal: isHorizontal,
            children_vertical: isVertical
          }"
        >
          <TreeNode
            :nodes="node.children"
            :direction="direction"
            :label-rotation="labelRotation"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import { defineComponent } from 'vue'

export default {
  name: 'TreeNode',
  props: {
    nodes: {
      type: Array,
      default: () => []
    },
    direction: {
      type: String,
      default: 'horizontal' // vertical
    },
    labelRotation: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isHorizontal() {
      return this.direction === 'horizontal'
    },
    isVertical() {
      return this.direction === 'vertical'
    }
  },
  methods: {
    hasChildren(node) {
      return node.children && node.children.length > 0
    },
    toggleNode(node) {
      if (this.hasChildren(node)) {
        // node.collapsed = !node.collapsed
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tree {
  display: flex;
}

.tree.horizontal {
  flex-direction: row;
  align-items: flex-start;
  height: 100%;
}

.tree.vertical {
  flex-direction: column;
  width: 100%;
}

.node {
  display: flex;
  /* flex-direction: column;
  margin-right: 16px; */
}
.node_vertical {
  flex-direction: column;
  /* margin-right: 16px; */
}
.node_horizontal {
  height: 100%;
  align-items: self-start;
}

.node.horizontal {
  flex-direction: row;
  margin-right: 0;
}

.label_vertical {
  height: 40px;
  text-align: left;
  flex-direction: row !important;
  padding-left: 10px;
  width: 100%;
}
.label_horizontal {
  justify-content: flex-start;
  width: 40px;
  height: 100%;
}
.label {
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
  transform-origin: left center;
  white-space: nowrap;
  cursor: pointer;
}

.label:hover {
  background-color: #efeeee;
  /* text-decoration: underline; */
}

.icon_vertical {
  margin-right: 8px;
}
.icon_horizontal {
  height: 13px;
}

.children {
  display: flex;
}
.children_horizontal {
  padding-top: 20px;
  height: 100%;
}
.children_vertical {
  margin-left: 20px;
}

.text_horizontal {
  transform: rotate(-90deg);
  margin-top: 20px;
}
.text {
  display: inline-block;
  white-space: nowrap;
}

/* 添加收起展开的过渡动画 */
.slide_horizontal-enter-active,
.slide_horizontal-leave-active {
  transition: all 0.3s ease;
}

.slide_horizontal-enter,
.slide_horizontal-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.slide_vertical-enter-active,
.slide_vertical-leave-active {
  transition: all 0.3s ease;
}

.slide_vertical-enter,
.slide_vertical-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
