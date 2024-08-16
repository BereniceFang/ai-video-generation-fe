import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '@/pages/Home.vue'
import EditVideoView from '@/pages/EditVideo.vue'
import List from '@/pages/List.vue'
import QuestionList from '@/pages/QuestionList.vue'
import ShareVideo from '@/pages/ShareVideo.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/list', component: List },
  { path: '/editVideo/:videoId', component: EditVideoView },
  { path: '/questionList', component: QuestionList },
  { path: '/shareVideo/:videoId', component: ShareVideo },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router