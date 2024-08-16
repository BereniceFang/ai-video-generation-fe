<script setup lang="js">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import banner1 from '@/assets/banner1.jpg'

const imgList = [banner1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT24auNFnmM2n4j6vZ1NiexEaIaB5AN7ivCYg&s', '/src/assets/img3.jpeg', '/src/assets/img4.jpeg']
const myRef = ref()
const binnerWidth = ref()
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
      <el-button round  @click="ElMessage({
              message: '暂未开放此功能, 敬请期待',
            })">体验更专业的定制服务</el-button>
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
