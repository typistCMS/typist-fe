<template>
  <div>
    <article class="typo">
      <div class="toolbar">
        <button class="comment-toggle" @click="toggleComments"><i class="material-icons">mode_comment</i></button>
      </div>

      <header>
        <h1>{{ post.title }}</h1>
        <div class="post-toolbar">
          <p class="post-meta">
            <i class="material-icons">account_circle</i>{{ post.last_edit_by }}
            <i class="material-icons">access_time</i>{{ post.updated_at | localTime }}
            <i class="material-icons">label</i>{{ post.category_name }}
          </p>
          <div class="btn-group">
            <router-link tag="button" to="revisions" append><i class="material-icons">archive</i></router-link>
            <button><i class="material-icons" @click="toggleComments">chat_bubble</i></button>
          </div>
        </div>
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
    console.log('Post route update')
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

.post-toolbar {
  background: #f3eaf9;
  color: #b57edc;
  padding: 5px 0.5em;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 768px) {
  .post-meta {
      font-size: 12px;
  }
}
.post-meta {
  display: flex;
  align-items: center;
  margin: 0;
}

.post-meta .material-icons {
  font-size: 1em;
  vertical-align: -2px;
  padding: 0 5px;
}

.btn-group button {
    background-color: #c194e2; /* Green background */
    border: 1px solid #b57edc; /* Green border */
    color: white; /* White text */
    padding: 2px 2px; /* Some padding */
    height: 28px;
    cursor: pointer; /* Pointer/hand icon */
    float: left; /* Float the buttons side by side */
    outline: none;
}

.btn-group button:not(:last-child) {
    border-right: none; /* Prevent double borders */
}

.btn-group button:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.btn-group button:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
/* Clear floats (clearfix hack) */
.btn-group:after {
    content: "";
    clear: both;
    display: table;
}

/* Add a background color on hover */
.btn-group button:hover {
    background-color: #b57edc;
}

@media screen and (min-width: 768px) {
  article {
    padding: 0 5%;
  }

}

</style>
