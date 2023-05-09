<template>
  <div
    class="tableAnalysis"
    :style="{
      height: height || '492px',
      width: width || '300px',
      backgroundColor: bgColor || '#fff',
      margin: margin || '10px',
      padding: padding || '10px'
    }"
  >
    <p class="tableTitle">
      <slot name="title" />
    </p>
    <section class="listHead">
      <section v-if="isCheck" class="checkRow" />
      <section v-if="isOrder" class="sortCol">序号</section>
      <section
        v-for="item in columnArr"
        :key="item.key"
        :style="item.width ? `width: ${item.width}` : 'flex: 1;'"
      >
        {{ item.label }}
      </section>
    </section>
    <ul
      v-loadmore="loadmore"
      :class="['listUl', hideScroll ? 'hideScroll' : '']"
      @click="clickRow"
    >
      <a-spin :spinning="loading">
        <li
          v-for="(itemData, indexData) in listData"
          :key="indexData"
          :data-index="indexData"
        >
          <section v-if="isCheck" class="checkRow flexClass">
            <a-checkbox
              v-model:checked="itemData.checked"
              @click.stop
              @change="checkList(itemData, indexData, itemData.checked)"
            />
          </section>
          <section
            v-if="isOrder"
            :class="[
              'sortCol',
              isLightOrder ? `sortCol${countIndex(indexData)}` : ''
            ]"
          >
            {{ countIndex(indexData) }}
          </section>
          <section
            v-for="(item, index) in columnArr"
            :key="item.key + indexData + index"
            class="elClass flexClass"
            :title="itemData[item.key]"
            :style="
              item.width
                ? `width: ${
                    ~(item.width + '').indexOf('px')
                      ? item.width
                      : item.width + 'px'
                  }`
                : 'flex: 1;'
            "
          >
            <slot v-if="item.slot" :name="item.slot" :row="itemData" />
            <article v-else class="contentClass">
              {{ itemData[item.key] }}
            </article>
          </section>
        </li>
        <article v-show="listData.length == 0" class="nodataClass flexClass">
          <svg-icon class="icon" :size="6" name="noData" />
          <span class="label"> 暂无数据 </span>
        </article>
      </a-spin>
    </ul>
    <section
      v-if="isPage && pageType && pageType === 'page'"
      class="footerPage"
    >
      <a-pagination
        v-model:current="pageObj.current"
        size="small"
        hide-on-single-page
        show-size-changer
        :page-size="pageObj.pageSize"
        :total="pageObj.total"
        @show-size-change="onShowSizeChange"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from 'vue'

interface stateInter {
  checkList: any[]
  checkListIndex: number[]
}

/**
 * 标题插槽 #title
 *
 * 列表内自定义插槽  #action="{row}"
 */

export default defineComponent({
  directives: {
    loadmore: {
      mounted(el, binding) {
        el.addEventListener('scroll', () => {
          const CONDITION =
            el.scrollHeight - el.scrollTop - 5 <= el.clientHeight
          if (CONDITION) {
            binding.value()
          }
        })
      },
      beforeUnmount(el, binding) {
        el.removeEventListener('scroll', () => {
          const CONDITION =
            el.scrollHeight - el.scrollTop - 5 <= el.clientHeight
          if (CONDITION) {
            binding.value()
          }
        })
      }
    }
  },
  /**
   * @clickRow 点击row返回当前row
   * @pageSearch 分页  当type=page时，接收两个param: current, pageSize
   * @checkList  复选框元素
   *
   */
  props: {
    height: {
      type: String,
      default: '492px'
    },
    width: {
      type: String,
      default: '300px'
    },
    columnArr: {
      // [ { key: 'ip', label: '来源IP', width: '150px', slot: 'ip' }, { key: 'count', label: '次数' } ] ps: 最多留一个自动适应宽度
      type: Array as PropType<any[]>,
      default: () => []
    },
    listData: {
      // [ { ip: '1.1.1.1', count: 2222333 }, { ip: '1.1.1.2', count: 22223 } ]
      type: Array as PropType<any[]>,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    isPage: {
      // 是否分页
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    pageType: {
      // 分页方式
      type: String,
      default: 'scorll' // page
    },
    bgColor: {
      // 背景色
      type: String,
      default: '#fff' // page
    },
    margin: {
      type: String,
      default: '10px'
    },
    padding: {
      type: String,
      default: '10px'
    },
    isOrder: {
      // 是否显示序号
      type: Boolean,
      default: true
    },
    isLightOrder: {
      // 是否高亮前三序号
      type: Boolean,
      default: true
    },
    isCheck: {
      // 是否显示复选框
      type: Boolean,
      default: false
    },
    hideScroll: {
      // 默认隐藏滚动条
      type: Boolean,
      default: true
    },
    isReset: {
      // 是否重置组件，监听改参数 为true则重置
      type: Boolean,
      default: false
    }
  },
  setup(props, content) {
    const pageObj = reactive({
      current: 1,
      pageSize: 10,
      total: 120
    })
    const state = ref<stateInter>({
      checkList: [],
      checkListIndex: []
    })
    const clickRow = (e: any) => {
      if (props.listData.length === 0) {
        return
      }
      let { target } = e
      while (target.nodeType === 1 && target.tagName !== 'LI') {
        target = target.parentNode
      }
      if (target && target.dataset && target.dataset.index)
        content.emit(
          'clickRow',
          props.listData[parseInt(target.dataset.index, 10)]
        )
    }

    watch(
      () => props.isReset,
      (newVal) => {
        if (newVal) {
          state.value.checkList.length = 0
          state.value.checkListIndex.length = 0
          content.emit('update:isReset', false)
        }
      }
    )
    watch(
      () => props.total,
      () => {
        pageObj.total = props.total
      }
    )
    // const hasKey = (obj:any, key:string) => Object.prototype.hasOwnProperty.call(obj, key)
    const onShowSizeChange = (current: number, pageSize: number) => {
      pageObj.current = current
      pageObj.pageSize = pageSize
    }
    const countIndex = (index: number) =>
      (pageObj.current - 1) * pageObj.pageSize + index + 1
    const loadmore = () => {
      if (!props.isPage || (props.pageType && props.pageType !== 'scorll')) {
        return
      }
      content.emit('pageSearch')
    }
    const checkList = (itemData: any, index: number, check: boolean) => {
      if (check) {
        state.value.checkListIndex.push(index)
        state.value.checkList.push(props.listData[index])
      } else {
        const num = state.value.checkListIndex.indexOf(index)
        state.value.checkListIndex.splice(num, 1)
        state.value.checkList.splice(num, 1)
      }
      content.emit(
        'checkList',
        state.value.checkList,
        state.value.checkListIndex
      )
    }
    return {
      state,
      pageObj,
      loadmore,
      clickRow,
      onShowSizeChange,
      countIndex,
      checkList
    }
  }
})
</script>

<style lang="scss" scoped>
.tableAnalysis {
  border: 1px solid #efefef;
  display: flex;
  flex-direction: column;
  .tableTitle {
    padding: 0 10px;
    margin: 0;
    height: 30px;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
  }
  .listHead {
    height: 40px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    background-color: #fafafa;
    border-bottom: 1px solid #efefef;
    section {
      text-align: center;
    }
  }
  .footerPage {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .checkRow {
    width: 30px;
  }
  .sortCol {
    width: 40px;
  }
  .action {
    width: 70px;
  }
  .listUl:hover::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
    background: #bababa !important;
  }
  .listUl:hover::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
    background: #ededed !important;
  }
  .hideScroll::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.2);
    background: #fff;
  }
  .hideScroll::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #fff;
  }
  .listUl {
    margin: 0;
    // height: 400px;
    flex: 1;
    overflow-y: auto;
    padding: 0 3px 0 7px;
    .nodataClass {
      width: 1005;
      height: 100%;
      flex-direction: column;
      color: #949fac;
    }
    li:hover {
      background-color: #efeeee;
    }
    li {
      display: flex;
      align-items: center;
      list-style: none;
      height: 40px;
      cursor: pointer;
      border-bottom: 1px solid #efefef;
      .elClass {
        overflow-x: auto;
        .contentClass {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .sortCol1 {
        font-size: 28px;
        color: red;
      }
      .sortCol2 {
        font-size: 26px;
        color: #ef6668;
      }
      .sortCol3 {
        font-size: 24px;
        color: #fac956;
      }
    }
  }
}
</style>
