<template>
  <div class="wrapper" :class="{ 'on-comment-show': commentsOn }">
    <article class="typo">
      <div class="toolbar">
        <button class="comment-toggle" @click="toggleComments"><i class="material-icons">mode_comment</i></button>
      </div>

      <header>
        <h1>{{ post.title }}</h1>
        <div class="post-toolbar" :class="{ 'post-toolbar-top' : toolbarTop, 'post-toolbar-top-show': toolbarTopShow }" >
          <div class="post-meta-wrapper">
            <div class="post-meta">
              <span v-if="toolbarTop" class="title">{{ post.title }}</span>
              <span><i class="material-icons">account_circle</i>{{ post.last_edit_by }}</span>
              <span><i class="material-icons">access_time</i>{{ post.updated_at | localTime }}</span>
              <span><i class="material-icons">label</i>{{ post.category_name }}</span>
            </div>
          </div>

          <div class="btn-group">
            <button @click="toggleRevisions">
              <i class="material-icons" v-if="this.$route.name === 'Revisions'">chrome_reader_mode</i>
              <i class="material-icons" v-else>archive</i>
            </button>
            <button><i class="material-icons" @click="toggleComments">chat_bubble</i></button>
          </div>
        </div>
      </header>

      <section>
        <router-view />
      </section>

      <div :class="{ 'comment-mask': commentsOn }" @click="toggleComments"></div>
    </article>
    <comments v-if="post.id" :postId="post.id" :class="{ 'comment-show': commentsOn }"></comments>
  </div>
</template>

<script>
import Comments from '@/components/Comments.vue'
export default {
  components: {
    Comments
  },
  data () {
    return {
      post: { },
      commentsOn: false,
      distanceToTop: 0,
      currentScroll: 0,
      lastScroll: 0,
      toolbarTop: false,
      toolbarTopShow: false
    }
  },
  beforeRouteUpdate (to, from, next) {
    if ((from.name === 'Content' && to.name === 'Revisions') ||
        (from.name === 'Revision' && to.name === 'Revisions')) {
      next()
    } else {
      this.getPost(to.params.id)
      next()
    }
  },
  metaInfo () {
    return {
      title: (this.post ? this.post.title : 'Loading...') + ' - Stanley\'s Blog'
    }
  },
  created () {
    this.$nextTick(function () {
      this.getPost(this.$route.params.id)
    })
  },
  mounted () {
    let el = document.querySelector('.post-toolbar')
    this.distanceToTop = el.getBoundingClientRect().top
    document.addEventListener('scroll', this.toggleToolbar, false)
  },
  updated () {
    window.Prism.highlightAll()
  },
  methods: {
    toggleRevisions () {
      let baseURL = '/post/' + this.post.id
      let routeName = this.$route.name
      if (routeName === 'Content' || routeName === 'Revision') {
        this.$router.push(baseURL + '/revisions')
      } else {
        this.$router.push(baseURL)
      }
    },
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
    },
    toggleToolbar () {
      this.currentScroll = window.pageYOffset
      if (this.currentScroll > this.distanceToTop + 20) {
        this.toolbarTop = true
        this.toolbarTopShow = true
        if (this.currentScroll < this.lastScroll) {
          this.toolbarTopShow = false
        } else {
          this.toolbarTopShow = true
        }
      } else {
        this.toolbarTop = false
        this.toolbarTopShow = false
      }
      this.lastScroll = this.currentScroll
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
}

.typo h1 {
  margin-top: 0;
}

.post-toolbar {
  background: #f3eaf9;
  color: #b57edc;
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1em;
  height: 24px;
  z-index: 5;
}

.title {
  font-weight: bold;
}

.post-meta {
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 0.8em;
  white-space: nowrap;
  padding-right: 8px;
}

.post-meta-wrapper {
  margin-top: -4px;
  overflow-x: auto;
  overflow-y: hidden;
}

.post-meta-wrapper::-webkit-scrollbar {
  display: none;
}

.post-toolbar-top {
  position: fixed;
  top: -24px;
  right: 0;
  left: 0;
  transition: all 0.1s ease-in;
  border-radius: 0px;
  box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);
}

.post-toolbar-top-show {
  top: 0 !important;
}

.post-meta .material-icons {
  font-size: 1em;
  vertical-align: -2px;
  padding: 0 5px;
}

.btn-group {
  display: flex;
}

.btn-group button {
  color: #b57edc;
  margin-top: -2px;
  height: 20px;
  width: 20px;
  background-color: transparent;
  outline: none;
  padding: 2px;
  box-sizing: border-box;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-group .material-icons {
  font-size: 12px;
}

.btn-group button:not(:last-child) {
  border-right: none; /* Prevent double borders */
}

/* Clear floats (clearfix hack) */
.btn-group:after {
  content: "";
  clear: both;
  display: table;
}

/* Add a background color on hover */
.btn-group button:hover {
  background-color: #ebdcf5;
}

@media screen and (min-width: 768px)
{
  .post-toolbar {
    height: 48px;
    padding: 0 16px;
  }

  .post-meta {
    font-size: 1em;
  }

  .btn-group .material-icons {
    font-size: 24px;
  }

  .btn-group button {
    width: 40px;
    height: 40px;
  }

  .post-toolbar-top {
    top: -48px;
  }

  .on-comment-show {
    padding-right: 300px;
  }

  .wrapper {
    transition: all 0.2s ease-in;
  }
}
</style>
