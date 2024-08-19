<template>
  <el-input
    v-model="searchKey"
    style="width: 240px"
    placeholder="请输入关键字"
    :suffix-icon="Search"
    @blur="searchHandler"
  />
  <el-button type="primary" @click="saveChoose" v-if="showChoose">保存</el-button>
  <el-table :data="tableData" border fit 
    @selection-change="handleSelectionChange">
    <el-table-column v-if="showChoose" type="selection"/>
    <el-table-column prop="questionContent" label="题目" />
    <el-table-column label="选项" >
      <template #default="scope">
        <span>{{ formatOptions(scope.row.questionOptions) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="答案" >
      <template #default="scope">
        <span>{{ formatOptions(scope.row.questionOptions.filter(item => item.isAnswer === true)) }}</span>
      </template>
    </el-table-column>  
    <el-table-column
      label="标签"
      width="100"
      >
      <template #default="scope">
          <el-tag
            v-for="(item, index) in scope.row.labels"
            :key="index"
          >{{ item }}</el-tag>
      </template>
      </el-table-column>
  </el-table>
  <el-pagination :pageSize="pageSize" @current-change="getData" hide-on-single-page :currentPage="currentPage" background layout="prev, pager, next" :total="total" />
</template>
  
<script lang="js" setup>
import { ref, onMounted } from "vue"
import { useRouter, useRoute } from 'vue-router'
import request from '@/request.js'

const router = useRouter()
const route = useRoute()

const showChoose = ref(route.query?.flag)
console.log(route.query)
const total = ref()
const chooseList = ref([])
const tableData = ref([])
const searchKey = ref('')
const currentPage = ref(1)
const pageSize = 20
const formatOptions = list => {
  return list?.map(item => item.content).join(',')
}
const getData = (val = 1) => {
  currentPage.value = val
  request.get('/questions', {
    pageNo: currentPage.value,
    pageSize: pageSize,
    keyword: searchKey.value
  }).then(res => {
    if(res.code === 1) {
      tableData.value = res.data.records
      total.value = res.data.total
    }
  })
}
const searchHandler = () => {
  currentPage.value = 1
  getData()
}
const handleSelectionChange = val => {
  chooseList.value = val
}
const saveChoose = () => {
  console.log(chooseList.value.map(item => item.id))
  router.push({
    path:`/editVideo/${route.query?.id}`,
    query: {
      ids: chooseList.value.map(item => item.id),
      flag: route.query?.flag
    }
  })
}
onMounted(async () => {
  getData()
})
</script>
<style scoped>
.el-pagination {
  margin-top: 30px;
}
.el-table {
  margin-top: 20px;
}
.el-button {
  float: right;
}
</style>