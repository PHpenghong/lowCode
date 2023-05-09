<template>
  <div class="page_div">
    <article class="page_title">后台服务状态</article>
    <section class="page_body">
      <section class="status_sec">
        <article class="serve_label title_sec">服务名称</article>
        <article class="serve_status title_sec">状态</article>
      </section>
      <a-spin :spinning="state.spinning">
        <section
          v-for="item in state.serverArr"
          :key="item.name"
          class="status_sec"
        >
          <article class="serve_label">{{ item.service }}</article>
          <article class="serve_status">
            <span
              :class="[
                item.status === 'running' ? 'running_span' : 'stopped_span'
              ]"
              >{{ item.status }}</span
            >
          </article>
        </section>
      </a-spin>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getService } from '@/api/bgConf/index'

const nameMap: { [key: string]: string } = {
  '/smc-server': '业务服务',
  '/log-server': '日志服务',
  '/mysql_smc': '数据存储',
  '/gotenberg': '文件服务',
  '/logstash': '消息队列',
  '/nginx_smc': '代理服务',
  '/blackbox-exporter': '可用性配置',
  '/redis_smc': '内存数据库',
  '/jms_all_smc': '运维审计服务',
  '/nserver': '可用性检测',
  '/nwebapi': '可用性检测采集端',
  '/prometheus': '监测数据库',
  '/telegraf': '系统监测配置',
  '/elasticsearch': '数据检索'
}

const state = ref<any>({
  serverArr: [],
  spinning: false
})

onMounted(() => {
  getServiceStatus()
})

const getServiceStatus = async () => {
  state.value.spinning = true
  const res: any = await getService({})
  if (res) {
    state.value.serverArr = res.map((i: any) => {
      ~Object.keys(nameMap).indexOf(i.service_name) && delArrEl(i.service_name)
      return i
    })
    state.value.serverArr = [
      ...state.value.serverArr,
      ...Object.keys(nameMap).map((i: string) => ({
        service_name: i,
        service: nameMap[i],
        status: 'stopped'
      }))
    ]
  }
  state.value.spinning = false
}

const delArrEl = (key: string) => {
  delete nameMap[key]
}
</script>

<style lang="scss" scoped>
.page_div {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  .page_title {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    text-align: left;
    padding: 10px 20px 10px 0;
  }
  .page_body {
    width: 500px;
    margin-left: 20px;
    .status_sec {
      width: 100%;
      display: flex;
      margin: 10px;
      .title_sec {
        font-size: 15px;
        font-weight: bold;
        color: #333333;
      }
      .serve_label {
        width: 200px;
        text-align: left;
      }
      .serve_status {
        flex: 1;
        text-align: left;
        .running_span {
          color: #7a9060;
        }
        .stopped_span {
          color: #a30014;
        }
      }
    }
  }
}
</style>
