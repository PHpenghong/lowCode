const index = `<template>
<div class="echart_div flexClass">
  <a-spin :spinning="loading" />
  <section v-show="!nodata" ref="chartDom" class="chartDom" />
  <article v-show="nodata" class="nodataClass flexClass">
    <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" />
  </article>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Empty } from 'ant-design-vue'
import { ECOption, echarts } from '@/components/Echarts/index'

const chartDom = ref(null)
const loading = ref(false)
const nodata = ref(false)

const chartOption = () => {
const option: ECOption = {  // 根据实际需求替换option
  xAxis: {
    type: 'category',
    data: ['严重', '高', '中', '低', '信息']
  },
  yAxis: {
    type: 'value'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    },
    formatter(params: any[]) {
      let relVal = ''
      for (let i = 0, l = params.length; i < l; i++) {
        relVal = params[i].marker + params[0].name} + ':' + params[i].value.toLocaleString()
      }
      return relVal
    }
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      barWidth: '30px'
    }
  ],
  grid: [
    {
      top: 20,
      bottom: 20,
      left: 60,
      right: 20
    }
  ]
}
return option
}

onMounted(() => {
init()
})

const init = () => {
  echarts.init(chartDom.value as unknown as HTMLElement).dispose()
  const chart = echarts.init(chartDom.value as unknown as HTMLElement)
  chart.setOption(chartOption())
}
</script>

<style lang="scss" scoped>
.echart_div {
padding: 15px;
width: 100%;
height: 260px;
background-color: #ffffff;
flex-direction: column;
:deep .ant-spin-spinning {
  position: relative;
  top: 90px;
}
.chartDom {
  width: 100%;
  height: 100%;
}
.nodataClass {
  width: 100%;
  height: 100%;
}
}
</style>`

export default { index }
