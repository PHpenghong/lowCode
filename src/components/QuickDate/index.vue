<template>
  <div id="quickDate" class="quickDate flexClass" @click.stop>
    <svg-icon :size="1.5" class="icon" name="quick" @click="clickIcon" />
    <section
      v-show="state.showMode"
      class="quick"
      :style="{ top: state.y + 'px', left: state.x + 'px' }"
    >
      <article>
        <span class="quickSpan" @click="dateTime(1, 1, 1)">一小时</span>
        <span class="quickSpan" @click="dateTime(1, 1, 2)">两小时</span>
        <span class="quickSpan" @click="dateTime(1, 1, 4)">四小时</span>
        <span class="quickSpan" @click="dateTime(1, 1, 8)">八小时</span>
      </article>
      <article>
        <span class="quickSpan" @click="dateTime(1, 1, 24)">一天</span>
        <span class="quickSpan" @click="dateTime(1, 3)">三天</span>
        <span class="quickSpan" @click="dateTime(1, 7)">七天</span>
      </article>
      <article>
        <span class="quickSpan" @click="dateTime(1, 15)">半个月</span>
        <span class="quickSpan" @click="dateTime(30)">一个月</span>
        <span class="quickSpan" @click="dateTime(90)">三个月</span>
        <span class="quickSpan" @click="dateTime(180)">六个月</span>
      </article>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
// import moment from 'moment'
// import { parseTime } from '@/utils/date'

export default defineComponent({
  props: {
    isInit: {
      type: Boolean,
      default: false
    }
  },
  setup(props, content) {
    const state = ref({
      showMode: false,
      x: 0,
      y: 0
    })
    const hideMode = () => {
      state.value.showMode = false
    }
    onMounted(() => {
      window.addEventListener('click', hideMode)
      if (props.isInit) dateTime()
    })
    const dateaArr: any = new Date().getTime()
    const dateTime = (month = 1, d = 1, h = 24, minute = 60) => {
      const dateArr: any = new Date().getTime()
      returnDate(dateArr - dealWithTime(month, d, h, minute))
    }
    const dealWithTime = (month = 1, d = 1, h = 24, minute = 60) =>
      month * d * h * minute * 60 * 1000
    const turnTime = (time: any) => {
      console.log(time)

      // moment(parseTime(time), 'YYYY-MM-DD hh:mm:ss')
      return ''
    }

    const returnDate = (time: any) => {
      content.emit('retrunDate', [turnTime(time), turnTime(dateaArr)])
      state.value.showMode = false
    }
    const closeQuick = () => {
      state.value.showMode = false
    }
    const clickIcon = (e: any) => {
      state.value.x = e.x - 125
      state.value.y = e.y + 20
      state.value.showMode = true
    }
    onBeforeUnmount(() => {
      window.removeEventListener('click', hideMode)
    })
    return {
      state,
      dateTime,
      closeQuick,
      clickIcon
    }
  }
})
</script>

<style lang="less" scoped>
.quickDate {
  margin: 0 10px;
  cursor: pointer;
  .quick {
    width: 320px;
    position: fixed;
    z-index: 99;
    background-color: #fff;
    border: 1px solid #efeeee;
    padding: 5px 10px;
    .icon {
      cursor: pointer;
    }
    article {
      text-align: left;
      margin: 10px 0;
      .quickSpan {
        padding: 3px 5px;
        margin: 3px 5px;
        background-color: #1890ff;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
      }
      .quickSpan:hover {
        background-color: #8dc5f9;
        color: #efeeee;
      }
    }
  }
}
</style>
