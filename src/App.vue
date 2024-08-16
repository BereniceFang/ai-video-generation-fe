<script setup lang="js">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import request from '@/request.js'

const loginModal = ref(false)
const userInfo = ref({
  name: localStorage.getItem('name'),
})
const loginData = ref({
  email: 'admin@memgleam.com',
  password: '123456',
})
const loginHandler = () => {
  if (!userInfo.value?.id) {
    loginModal.value = true
  }
}
const loginConfirm = () => {
  request.post('/users/login', {
    email: loginData.value.email,
    password: loginData.value.password,
  }).then(res => {
    if (res.code === 1) {
      loginModal.value = false
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('name', res.data.name)
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
      userInfo.value = res.data
    }
  })
}
</script>

<template>
  <!-- <RouterLink to="/">Go to Home</RouterLink>
  <RouterLink to="/about">Go to About</RouterLink> -->

  <el-container>
      <el-header>
        <!-- <img src="@/assets/vue.svg" class="header-logo" alt="清工微光" width="40" />
        <span class="header-title">AI教育视频</span> -->
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
        >
          <el-menu-item index="0">
            <img
              style="width: 40px"
              src="@/assets/logo.png"
              alt="Element logo"
            />
            <span class="header-title">AI教育视频</span>
          </el-menu-item>
          <el-menu-item index="1" @click="$router.push('/list')">视频库</el-menu-item>
          <el-menu-item index="2" @click="$router.push('/questionList')">题库</el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="3" @click="alert('暂未开放此功能, 敬请期待')">升级VIP</el-menu-item>
          <el-menu-item index="4" @click="loginHandler">{{userInfo.name ? userInfo.name : '登录'}}</el-menu-item>
          <!-- <el-sub-menu index="4">
            <template #title>Workspace</template>
            <el-menu-item index="4-1">item one</el-menu-item>
            <el-menu-item index="4-2">item two</el-menu-item>
            <el-menu-item index="4-3">item three</el-menu-item>
            <el-sub-menu index="4-4">
              <template #title>item four</template>
              <el-menu-item index="4-4-1">item one</el-menu-item>
              <el-menu-item index="4-4-2">item two</el-menu-item>
              <el-menu-item index="4-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu> -->
        </el-menu>
      </el-header>
      <el-main>
        <RouterView class="page-wrap" />
      </el-main>
      <el-footer>
        <el-divider />
        <div>Released under the MIT License.</div>

        <div>Made with ❤️ by 清工微光</div>
      </el-footer>
    </el-container>
    <el-dialog v-model="loginModal" title="登录" width="400">
      <el-form :model="form">
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="loginData.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="loginData.password" autocomplete="off" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="loginModal = false">取消</el-button>
          <el-button type="primary" @click="loginConfirm">
            登录
          </el-button>
        </div>
      </template>
    </el-dialog>
</template>

<style scoped>
.el-header {
  padding: 0;
  width: 100vw;
}
.flex-grow {
  flex-grow: 1;
}
.el-footer {
  /* position: absolute;       */
  /* bottom: 60px; */
  width: 100%;
  padding: 20px 0;
  text-align: center;
  font-size: 14px;
}
</style>
