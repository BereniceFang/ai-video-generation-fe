<script setup lang="js">
import { ref, onMounted } from 'vue'
import {useIntersectionObserver} from '@vueuse/core'
import VideoCard from '@/components/VideoCard.vue'
// import VueGridWaterfall from '@fcli/vue-grid-waterfall'
import { Waterfall } from 'vue-waterfall-plugin-next'
import { Search } from '@element-plus/icons-vue'
import request from '@/request.js'
import 'vue-waterfall-plugin-next/dist/style.css'

const data = ref([])
const searchKey = ref('')
const pageNo = ref(1)
const waterfall = ref(null)
const totalNum = ref(0)
const infinite = ref(false)
const target = ref(null)

const breakpoints = {
  2800: {
    rowPerView: 5,
  },
  1200: {
    // when wrapper width < 1200
    rowPerView: 3,
  },
  800: {
    // when wrapper width < 800
    rowPerView: 2,
  },
  500: {
    // when wrapper width < 500
    rowPerView: 1,
  },
}

const searchHandler = () => {
  pageNo.value = 1
  getMoreData()
}
const getMoreData = () => {
  request.get('/videos', {
    pageNo: pageNo.value,
    pageSize: 20,
    keyword: searchKey.value
  }).then(res => {
    if(res.code === 1) {
      totalNum.value = res.data.total
      data.value.push(...res.data.records)
      infinite.value = true
    }
  })
}
const imgLoaded = () => {
  console.log('img loaded')
  throttle(()=> waterfall.value.renderer(), 500)
}
const load = () => {
  console.log('load more')
  pageNo.value = pageNo.value + 1
  getMoreData()
}
let timer = null
function throttle (fn, delay = 300) {
    if(timer == null){
        timer = setTimeout(() => {
            fn()

            clearTimeout(timer)
            timer = null
        }, delay);
    }
}
const { stop } = useIntersectionObserver(
  target,// target 是vue的对象引用。是观察的目标
  // isIntersecting 是否进入可视区域，true是进入 false是移出
  // observerElement 被观察的dom
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      console.log('bottom')
      // stop()
      pageNo.value = pageNo.value + 1
      getMoreData()
      if (data.length >= totalNum.value) {
        stop()
      }
    }
  },
  // threshold 表示观察的目标进入视口的比例，取值范围是从 0 到 1
  // 默认是0.1。 值越大表示观察越不灵敏
  { threshold: 0 }
)
onMounted(async () => {
  getMoreData()
})
</script>

<template>
  <div>
    <el-input
      v-model="searchKey"
      style="width: 240px"
      placeholder="请输入关键字"
      :suffix-icon="Search"
      @blur="searchHandler"
    />
    <!-- <vue-grid-waterfall :data-list="data" :columns="3" @getMoreData="getMoreData" :loading="isLoading">
      <template #slot-scope="{ item }">
        <VideoCard :data="item" />
      </template>
    </vue-grid-waterfall> -->
    
    <Waterfall ref="waterfall" lazyload :list="data" backgroundColor="#f7f7f7" :breakpoints="breakpoints">
      <template #item="{ item }">
        <VideoCard :data="item" @imgLoaded="imgLoaded" />
      </template>
    </Waterfall>
    <div v-if="infinite" ref="target"></div>
  </div>
  
</template>

<style scoped>
.el-input {
  margin-left: 10px;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
