<template>
  <div>
    <article class="typo">
      <div class="toolbar">
        <button class="comment-toggle" @click="toggleComments"><i class="material-icons">mode_comment</i></button>
      </div>

      <header>
        <h1>{{ post.title }}</h1>
        <p class="post-meta">Last edit by&nbsp;{{ post.last_edit_by }} {{ post.updated_at | localTime }}, under {{ post.category_name }}</p>
      </header>

      <section>
        <vue-markdown :source="post.content" :watches="['this.post.content']"></vue-markdown>
      </section>

      <div :class="{ 'comment-mask': commentsOn }" @click="toggleComments"></div>
    </article>
    <comments v-if="post.id" :postId="post.id" :class="{ 'comment-show': commentsOn }"></comments>
  </div>
</template>

<script>
import Comments from '@/components/Comments.vue'
import VueMarkdown from 'vue-markdown'
export default {
  components: {
    VueMarkdown, Comments
  },
  data () {
    return {
      post: { },
      commentsOn: false
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.getPost(to.params.id)
    next()
  },
  created () {
    this.$nextTick(function () {
      this.getPost(this.$route.params.id)
    })
  },
  updated () {
    window.Prism.highlightAll()
  },
  methods: {
    getPost (postId) {
      let loader = this.$loading.show()
      this.$http.get('/post/' + postId).then(({data}) => {
        this.post = data
        loader.hide()
      }).catch((error) => {
        console.log(error)
      })
    },
    toggleComments () {
      this.commentsOn = !this.commentsOn
    }
  }
}
</script>

<style scoped>
article {
  padding: 0 1em;
}

@media screen and (min-width: 768px) {
  article {
    padding: 0 5%;
  }

}

</style>
