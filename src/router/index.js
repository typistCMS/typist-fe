import Vue from 'vue'
import Router from 'vue-router'
const Post = () => import('@/pages/Post')
const Category = () => import('@/pages/Category')
const Content = () => import('@/pages/Content')
const Revisions = () => import('@/pages/Revisions')
const Home = () => import('@/pages/Home')
const User = () => import('@/pages/User')

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
      path: '/category/:id',
      name: 'Category',
      component: Category
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
    },
    {
      path: '/user/:id',
      component: User,
      name: 'User'
    }
  ]
})
