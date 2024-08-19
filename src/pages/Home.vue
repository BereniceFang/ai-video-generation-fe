<script setup lang="js">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import banner1 from '@/assets/banner1.jpg'
import banner2 from '@/assets/banner2.jpg'
import banner3 from '@/assets/banner3.jpg'
import banner4 from '@/assets/banner4.jpg'
import banner5 from '@/assets/banner5.jpeg'

const imgList = [banner1, banner2, banner3, banner4]
const myRef = ref()
const binnerWidth = ref()
const router = useRouter()

const checkLogin = () => {
  if (localStorage.getItem('token')) {
    router.push('/createVideo')
  } else {
    ElMessage({
      message: '请登录',
      type: 'warning',
    })
  }
}
onMounted(()=>{
  console.log(myRef.value?.clientWidth)
  binnerWidth.value = myRef.value?.clientWidth
})
</script>

<template>
  <div class="common-layout">
    <div class="block text-center binner-wrap" ref="myRef">
      <el-carousel :height="binnerWidth * 109 / 252 + 'px'">
        <el-carousel-item v-for="item in imgList" :key="item">
          <img :src="item" width="100%" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="block text-center">
      <h2>清工微光</h2>
      <h3>让每个人成为视频生成专家</h3>
      <h3>真诚 热爱 创新 务实</h3>
      <h3>还没想好写什么</h3>
      <h3>....</h3>
      <h3>....</h3>
      <el-button round  @click="checkLogin('/createVideo')">体验更专业的定制服务</el-button>
    </div>
  </div>
</template>

  <!-- <HelloWorld msg="Vite + Vue" />
</template> -->

<style scoped>
.page {
  background-color: #fefefe;
}
.el-header, .el-menu {
  display: flex;
  height: 40px;
  width: 100vw;
  padding: 0;
}
.header-logo {
  vertical-align: middle;
}
.header-title {
  font-size: 20px;
  line-height: 40px;
  font-weight: bold;
  color: var(color);
  margin-left: 10px;
}
.binner-wrap {
  margin: 0 auto;
  max-width: 2200px;
}
.text-center {
  text-align: center;
}
</style>
