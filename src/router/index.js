import Vue from 'vue'
import Router from 'vue-router'
const Post = () => import('@/pages/Post')
const Revision = () => import('@/pages/Revision')
const Revisions = () => import('@/pages/Revisions')
const Home = () => import('@/pages/Home')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post
    },
    {
      path: '/post/:id/revisions',
      name: 'Revisions',
      component: Revisions
    },
    {
      path: '/post/:post_id/revision/:revision_id',
      name: 'Revision',
      component: Revision
    }
  ]
})
