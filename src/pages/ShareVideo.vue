<script setup lang="js">
import { reactive, ref, onMounted } from "vue"
import VideoPlayer from "@/components/videoPlayer.vue"
import { useRouter, useRoute } from 'vue-router'
import useClipboard from 'vue-clipboard3'
import { ElMessage } from 'element-plus'
import QrcodeVue from "qrcode.vue"
import {
  DocumentCopy
} from '@element-plus/icons-vue'
import request from '@/request.js'

const router = useRouter()
const route = useRoute()
const info = ref({})
const drawer = ref(false)
const dialog = ref(false)
const shareUri = ref('http://159.75.178.32/#/shareVideo/1')
const qrCode = ref('http://159.75.178.32/#/shareVideo/1')
const editData = ref({
  userId: 1,
  videoId: route.params.videoId,
  enableBeforeClass: false,
  beforeClassType: 1,
  beforeClassContent: '',
  enableInClass: false,
  inClassType: 1,
  inClassQuestionCount: 3,
  inClassQuestionIds: [],
  enableAfterClass: false,
  afterClassType: 1,
  afterClassQuestionCount: 5,
  afterClassQuestionIds: []
})
const { toClipboard } = useClipboard()

const handleCopy = async () => {
  try {
    await toClipboard(shareUri.value)
    ElMessage({
      message: '复制成功',
      type: 'success',
    })
  } catch (e) {
    console.error(e)
    ElMessage({
      message: '复制失败',
      type: 'error',
    })
  }
}
const downloadHandler = () => {
  window.open(`/resources/download?resourceUrl=${info.value.videoUrl}`)
}
const gotoEditHandler = () => {
  drawer.value = true
}
const inClassCountChangeHandler = () => {
  console.log('change')
}
const goToQuestionListHandler = flag => {
  router.push({ path: '/questionList', query: { flag } })
}
const confirmClick = () => {
  let tmp = Object.assign({}, editData.value)
  tmp.inClassQuestionIds = shuffleArray(info.value.inClassQuestionIds).slice(0, tmp.inClassQuestionCount)
  tmp.afterClassQuestionIds = shuffleArray(info.value.afterClassQuestionIds).slice(0, tmp.afterClassQuestionCount)
  // console.log(tmp)
  request.post('/shareLinks', tmp).then(res => {
    if(res.code === 1) {
      console.log(res)
      dialog.value = true
    }
  })
}
const cancelClick = () => {
  drawer.value = false
}
const submitHandler = () => {
  console.log(editData.value)
  request.post('/shareLinks', editData.value).then(res => {
    if(res.code === 1) {
      console.log(res)
    }
  })
}
const formatSeconds = seconds => {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  seconds = seconds % 60;

  return `${hours ? hours.toString().padStart(2, '0') + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
const shuffleArray = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
onMounted(async () => {
  request.get(`/videos/${route.params.videoId}`).then(res => {
    if(res.code === 1) {
      info.value = res.data
    }
  })
})
</script>

<template>
  <h2>{{info.title}}</h2>
  <div class="beforeClassContent">预习内容：{{ info.beforeClassContent }}</div>
  <br />
  <VideoPlayer
    className="videoPlayer"
    width="520px"
    height="280px"
    :video-url="info.videoUrl"
    :poster="info.imageUrl"
    :id="'videoPlayer' + info.id"
    :controls="false"
  /> 
  <el-dialog v-model="dialog" title="问答时间" width="800">
  </el-dialog>
</template>

<style scoped>
.videoPlayer {
  margin: 10px 0;
}
.beforeClassContent {
  color: #555;
}
.shareVideoPage {
  display: flex;
}
.info-wrap {
  margin-left: 50px;
}
.info-item {
  margin-bottom: 15px;
}
.info-title {
  font-size: 16px;
  margin-right: 10px;
}
.info-text {
  font-size: 16px;
  color: #555;
}
.btn-wrap {
  margin-top: 50px;
}
.form-text {
  margin-left: 10px;
  font-size: 14px;
  color: #555;
}
.el-tag {
  margin-right: 5px;
}
.el-form-item__label {
  width: 100px;
}
.copyButton {
  margin-left: 20px;
}
</style>
