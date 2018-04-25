import Vue from 'vue'
import Router from 'vue-router'
const Post = () => import('@/pages/Post')
const Content = () => import('@/pages/Content')
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
      component: Post,
      children: [
        {
          path: '/',
          component: Content,
          name: 'Content'
        },
        {
          path: 'revisions',
          component: Revisions,
          name: 'Revisions'
        },
        {
          path: 'revision/:revision_id',
          component: Content,
          name: 'Revision'
        }
      ]
    }
  ]
})
