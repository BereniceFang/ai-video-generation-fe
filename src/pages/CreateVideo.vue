<script setup lang="js">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import VideoPlayer from "@/components/videoPlayer.vue"
import { ElMessage } from 'element-plus'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import { Search } from '@element-plus/icons-vue'
import request from '@/request.js'
import 'vue-waterfall-plugin-next/dist/style.css'

const info = reactive({
  id: 1,
  labels: [],
  imageUrl: '',
  videoUrl: '',
})
const percentage = ref(0)
const showProgress = ref(false)
const router = useRouter()
const form = reactive({
  topic: '',
  videoType: '',
  modelType: '',
  labels: [],
})
const onSubmit = () => {
  console.log(form.topic, form)
  request.post('/ai/videos', form).then(res => {
    console.log(res)
    if(res.code === 1) {
      info.id = res.data.id
      info.imageUrl = res.data.imageUrl
      info.videoUrl = res.data.videoUrl
      info.labels = res.data.labels
      showProgress.value = true
      simulateProgressBar()
    }
  })
  // percentage.value = generateRandomIntegers()
}
const uploadHandler = () => {
  ElMessage({
    message: '上传成功',
    type: 'success',
  })
  router.push('/list')
}

function simulateProgressBar() {
  let progress = 0
  percentage.value = progress
  const startTime = Date.now()
  let previousProgress = 0
  const intervalId = setInterval(() => {
    const elapsedTime = Date.now() - startTime
    const duration = Math.random() * (20000 - 15000) + 8000
    progress = Math.min(100, (elapsedTime / duration) * 100)
    if (progress < previousProgress) {
      progress = previousProgress
    }
    previousProgress = progress
    percentage.value = Math.ceil(progress)
    if(percentage.value === 100) {
      showProgress.value = false
    }
    if (elapsedTime >= duration) {
      clearInterval(intervalId)
    }
  }, 100)
  return intervalId
}
const download = () => {

  window.open(info.videoUrl)
}

</script>

<template>
  <div class="creatVideoPage">
    <div class="leftWrap">
      <h2>订制自己的视频</h2>
      <el-form :model="form" label-width="auto">
        <el-form-item label="描述">
          <el-input v-model="form.topic" type="textarea" placeholder="请输入视频内容的描述" />
        </el-form-item>
        <el-form-item label="视频类别">
          <el-radio-group v-model="form.videoType">
            <el-radio :value="0">横向</el-radio>
            <el-radio :value="1">竖向</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="数字人形象">
          <el-radio-group v-model="form.modelType">
            <el-radio :value="0">Ann</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="视频标签">
          <el-checkbox-group v-model="form.labels">
            <el-checkbox value="汽车" name="汽车">
              汽车
            </el-checkbox>
            <el-checkbox value="制造" name="制造">
              制造
            </el-checkbox>
            <el-checkbox value="生产流程" name="生产流程">
              生产流程
            </el-checkbox>
            <el-checkbox value="建筑" name="建筑">
              建筑
            </el-checkbox>
            <el-checkbox value="安全" name="安全">
              安全
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
    
    
        <el-form-item>
          <el-button :disabled="showProgress" type="primary" @click="onSubmit">生成</el-button>
          <el-button :disabled="showProgress">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="rightWrap">
      <div class="demo-progress">
        <el-progress v-show="showProgress" :percentage="percentage" />
        <VideoPlayer
          v-show="percentage === 100"
          width="520px"
          height="280px"
          :video-url="info.videoUrl"
          :poster="info.imageUrl"
          :id="'videoPlayer' + info.id"
        /> 
        <el-button 
          v-show="percentage === 100" 
          type="primary" 
          @click="uploadHandler">上传</el-button>
        <el-button @click="download" v-show="percentage === 100">下载</el-button>
      </div>

    </div>
  </div>
  
</template>

<style scoped>
.creatVideoPage {
  display: flex;
  width: 100%;
  gap: 50px;
}
.demo-progress, .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}
.rightWrap {
  flex: 1;
}
</style>
