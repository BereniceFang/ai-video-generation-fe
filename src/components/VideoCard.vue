<script setup lang="js">
import { useRouter, useRoute } from 'vue-router'
// defineProps<{ msg: string }>()
const props = defineProps(['data'])
const router = useRouter()
const route = useRoute()

const clickStar = () => {
  props.data.star = !props.data.star
}

const goToEditHandler = () => {
  router.push({path:`editVideo/${props.data.id}`, props: {
    videoInfo: props.data
  }})
}

// const count = ref(0)
</script>

<template>
  <!-- <h1>{{ msg }}</h1> -->
  <el-card shadow="hover" class="card-item">
    <div class="video-wrap">
      <img :src="data?.imageUrl" width="100%" @load="$emit('imgLoaded')" />
    </div>
    <div class="text-wrap">
      <div class="text-title">
        {{data?.title}}
        <!-- <el-tag size="small" type="success">Tag 2</el-tag>
        <el-tag size="small" type="info">Tag 3</el-tag> -->
        <!-- <el-tag type="warning">Tag 4</el-tag>
        <el-tag type="danger">Tag 5</el-tag> -->
      </div>
      <!-- <el-icon v-if="data.star" color="#ff6700" :size="18" @click="clickStar"><StarFilled /></el-icon> -->
      <!-- <el-icon  v-else @click="clickStar"><Star /></el-icon> -->
    </div>
    <el-tag size="small" type="primary" v-for="item in data?.labels?.slice(0, 3)" :key="item">{{item}}</el-tag>
    <div class="info-wrap">
      <el-text class="mx-1" type="info">来源：{{data?.source}}</el-text>
      <!-- <el-button size="small" type="primary" round>生成学习</el-button> -->
      <el-icon><Edit @click="goToEditHandler" /></el-icon>
    </div>
  </el-card>
</template>

<style scoped>
.card-item {
  border-radius: 20px;
  border: 0;
}
.video-wrap {
  width: 100%;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
}
.text-wrap {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text-title {
  font-size: 16px;
  color: #000;
}
.el-tag {
  margin-right: 5px;
}
.info-wrap {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
