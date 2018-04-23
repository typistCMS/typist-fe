import Vue from 'vue'
import Router from 'vue-router'
const Posts = () => import('@/pages/Posts')
const Post = () => import('@/pages/Post')
const Revision = () => import('@/pages/Revision')
const Revisions = () => import('@/pages/Revisions')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/p' },
    {
      path: '/p',
      name: 'Posts',
      component: Posts,
      children: [
        {
          path: 'post/:id',
          name: 'Post',
          component: Post
        },
        {
          path: 'post/:id/revisions',
          name: 'Revisions',
          component: Revisions
        },
        {
          path: 'post/:post_id/revision/:revision_id',
          name: 'Revision',
          component: Revision
        }
      ]
    }
  ]
})
