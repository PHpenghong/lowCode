<template>
  <div ref="chart" :style="{ width: width, height: height }">
    <div v-if="!hasData" class="no-data">
      {{ noDataText }}
    </div>
    <div v-if="loading" class="loading">
      <div class="loading-icon" />
      <div class="loading-text">{{ loadingText }}</div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUpdated, onUnmounted, ref, watch, computed } from 'vue'
import * as echarts from 'echarts'

export default {
  props: {
    width: { type: String, default: '100%' },
    height: { type: String, default: '400px' },
    option: { type: Object, required: true },
    loading: { type: Boolean, default: false },
    loadingText: { type: String, default: 'Loading...' },
    noDataText: { type: String, default: 'No data available' },
    debounce: { type: Number, default: 0 }
  },
  setup(props) {
    const chart = ref(null)
    const hasData = computed(
      () =>
        props.option && props.option.series && props.option.series.length > 0
    )

    let resizeTimeout

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        chart.value.resize()
      }, props.debounce)
    }

    onMounted(() => {
      chart.value = echarts.init(chart.value)
      chart.value.setOption(props.option)
      window.addEventListener('resize', handleResize)
    })

    onUpdated(() => {
      chart.value.setOption(props.option)
      handleResize()
    })

    onUnmounted(() => {
      chart.value.dispose()
      chart.value = null
      window.removeEventListener('resize', handleResize)
    })

    watch(
      () => props.loading,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          if (newVal) {
            chart.value.showLoading()
          } else {
            chart.value.hideLoading()
          }
        }
      }
    )

    return {
      chart,
      hasData
    }
  }
}
</script>

<style>
.loading-container {
  position: relative;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid #ccc;
  border-top-color: #666;
  animation: loading-spin 1s linear infinite;
}

.loading-text {
  margin-top: 10px;
}

@keyframes loading-spin {
  to {
    transform: rotate(360deg);
  }
}

.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #aaa;
  height: 100%;
}
</style>
