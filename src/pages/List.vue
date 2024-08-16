<script setup lang="js">
import { ref, onMounted } from 'vue'
import VideoCard from '@/components/VideoCard.vue'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import { Search } from '@element-plus/icons-vue'
import request from '@/request.js'
import 'vue-waterfall-plugin-next/dist/style.css'

const data = ref([])
const searchKey = ref('')
const searchHandler = () => {
  request.get('/videos', {
    pageNo: 1,
    pageSize: 200,
    keyword: searchKey.value
  }).then(res => {
    if(res.code === 1) {
      data.value = res.data.records
    }
  })
}

onMounted(async () => {
  request.get('/videos', {
    pageNo: 1,
    pageSize: 200
  }).then(res => {
    if(res.code === 1) {
      data.value = res.data.records
    }
  })
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
    <Waterfall :list="data" backgroundColor="#f7f7f7">
      <template #item="{ item }">
        <!-- <div class="card">
          <LazyImg :url="url" />
          <p class="text">1这是具体内容{{ item }}</p>
        </div> -->
        <VideoCard :data="item" />
      </template>
    </Waterfall>
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
