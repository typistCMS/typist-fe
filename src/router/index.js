import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/pages/Posts'
import Post from '@/pages/Post'
import Revision from '@/pages/Revision'
import Revisions from '@/pages/Revisions'

Vue.use(Router)

export default new Router({
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
