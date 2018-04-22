<template>
  <article class="typo">
    <div class="toolbar">
      <button class="comment-toggle" @click="toggleComments"><i class="material-icons">mode_comment</i></button>
    </div>
    <header>
      <h1>{{ this.post.title }}</h1>
      <p class="post-meta">Last edit by:&nbsp;{{ this.post.last_edit_by }} at {{ this.post.updated_at }}, under {{ this.post.category }}</p>
    </header>
    <section>
      <vue-markdown :source="post.content" :watches="['this.post.content']"></vue-markdown>
    </section>

    <comments v-if="post.id" :postId="post.id" :class="{ 'comment-show': commentsOn }"></comments>

    <div :class="{ 'comment-mask': commentsOn }" @click="toggleComments"></div>
  </article>
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
  .comment-toggle {
    bottom: 1em;
    right: 1em;
    position: absolute;
    background: none;
    color: #b57edc;
    outline: #b57edc;
    border: none;
  }

  .comments {
    position: absolute;
    right: -300px;
    top: 0;
    width: 300px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    transition: 0.38s ease-in-out;
    padding: 0.5em;
    box-sizing: border-box;
    z-index: 4;
    backdrop-filter: blur(5px);
  }

  .comment-show {
    right: 0;
  }
  .comment-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
  }

</style>
