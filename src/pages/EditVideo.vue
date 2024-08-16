<script setup lang="js">
import { reactive, ref, onMounted } from "vue"
import VideoPlayer from "@/components/videoPlayer.vue"
import { useRouter, useRoute } from 'vue-router'
import request from '@/request.js'
import dayjs from 'dayjs'

const router = useRouter()
const route = useRoute()
const info = ref({})
const drawer = ref(false)
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
console.log(route)
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
onMounted(async () => {
  request.get(`/videos/${route.params.videoId}`).then(res => {
    if(res.code === 1) {
      info.value = res.data
    }
  })
})
</script>

<template>
  <div class="videoEditPage">
    <div>
      <VideoPlayer
        width="520px"
        height="280px"
        :video-url="info.videoUrl"
        :poster="info.imageUrl"
        :id="'videoPlayer' + info.id"
      /> 
    </div>
    <div class="info-wrap">
      <div class="info-item">
        <span class="info-title">标题</span>
        <span class="info-text">{{info.title}}</span>
      </div>

      <div class="info-item">
        <span class="info-title">时长</span>
        <span class="info-text">{{formatSeconds(info.videoDuration)}}</span>
      </div>

      <div class="info-item">
        <span class="info-title">描述</span>
        <span class="info-text">{{info.description}}</span>
      </div>

      <div class="info-item">
        <span class="info-title">标签</span>
        <span class="info-text">
          <el-tag size="small" type="primary" v-for="item in info.labels" :key="item">{{item}}</el-tag>
        </span>
      </div>

      <div class="info-item">
        <span class="info-title">来源</span>
        <span class="info-text">{{info.source}}</span>
      </div>

      <div class="info-item">
        <span class="info-title">更新时间</span>
        <span class="info-text">
          <span class="info-text">{{info.updateTime}}</span>
        </span>
      </div>
      <div class="btn-wrap">
        <el-button type="primary" @click="downloadHandler">下载</el-button>
        <el-button type="primary" @click="gotoEditHandler">编辑</el-button>
      </div>
    </div>
  </div>
  <el-drawer v-model="drawer" direction="rtl" size="60%">
    <template #header>
      <h4>编辑试题</h4>
    </template>
    <template #default>
      <el-form :model="form" label-width="auto">
        <el-form-item label="预习">
          <el-switch v-model="editData.enableBeforeClass" />
        </el-form-item>
        <el-form-item v-if="editData.enableBeforeClass" label="预习内容">
          <el-radio-group v-model="editData.beforeClassType">
            <el-radio :value="1">ai生成</el-radio>
            <el-radio :value="0">自定义</el-radio>
            <el-input
              v-if="editData.beforeClassType === 0" 
              v-model="editData.beforeClassContent" 
              type="textarea" 
              placeholder="请输入自定义预习内容" 
            />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="课间考试">
          <el-switch v-model="editData.enableInClass" />
        </el-form-item>
        <template v-if="editData.enableInClass">
          <el-form-item label="课间考题数量">
            <el-input-number 
              v-model="editData.inClassQuestionCount" 
              :min="1" 
              :max="10" 
              @change="inClassCountChangeHandler" 
            />
          </el-form-item>
          <el-form-item label="考试题目">
            <el-radio-group v-model="editData.inClassType">
              <el-radio :value="1">ai生成</el-radio>
              <el-radio :value="0">自定义</el-radio>
              <el-button 
                v-if="editData.inClassType === 0" 
                type="primary" 
                link
                @click="goToQuestionListHandler(1)"
              >
                {{editData.inClassQuestionIds.length ? `已选择${editData.inClassQuestionIds.length}题` : '去选择' }}
              </el-button>
            </el-radio-group>
          </el-form-item>
        </template>
        <el-form-item label="课后考试">
          <el-switch v-model="editData.enableAfterClass" />
        </el-form-item>
        <template v-if="editData.enableAfterClass">
          <el-form-item label="课后考题数量">
            <el-input-number 
              v-model="editData.afterClassQuestionCount" 
              :min="1" 
              :max="10" 
              @change="inClassCountChangeHandler" 
            />
          </el-form-item>
          <el-form-item label="考试题目">
            <el-radio-group v-model="editData.afterClassType">
              <el-radio :value="1">ai生成</el-radio>
              <el-radio :value="0">自定义</el-radio>
              <el-button 
                v-if="editData.afterClassType === 0" 
                type="primary" 
                link
                @click="goToQuestionListHandler(2)"
              >
                {{editData.afterClassQuestionIds.length ? `已选择${editData.afterClassQuestionIds.length}题` : '去选择' }}
              </el-button>
            </el-radio-group>
          </el-form-item>
        </template>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">生成分享链接</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped>
.videoEditPage {
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
</style>
