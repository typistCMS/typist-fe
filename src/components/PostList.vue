<template>
  <div class="list">
    <section v-for="post in posts" class="post" v-bind:key="post.id">
      <header>
        <div class="content-wrapper">
          <div class="avatar">
            <div class="avatar-placeholder"></div>
          </div>
          <div class="expanded-content">
            <p class="post-meta">
              <router-link :to="'/user/' + post.user_id">{{ post.last_edit_by }}</router-link>
               · {{ post.updated_at | localTime }}
            </p>
            <div class="post-content" v-if="post.expand_content">
              <vue-markdown v-if="post.expand_content" :source="post.content" class="expanded-contents"></vue-markdown>
              <router-link
                :to="'/post/' + post.id"
                class="expand_content"
                v-if="post.expand_content"
              >
                details
              </router-link>
            </div>

            <div v-else>
              <router-link :to="'/post/' + post.id"><h2>{{ post.title }}</h2></router-link>
              <router-link class="category" :to="'/category/' + post.category_id">{{ post.category_name }}</router-link>
            </div>

          </div>
        </div>
      </header>
    </section>

    <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading"></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import VueMarkdown from 'vue-markdown'
export default {
  props: {
    params: {
      type: String,
      default: ''
    }
  },
  components: { InfiniteLoading, VueMarkdown },
  data () {
    return {
      page: 1,
      posts: []
    }
  },
  watch: {
    categoryId (val, nVal) {
      this.posts = []
      this.page = 1
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$infiniteLoading:reset')
      })
    }
  },
  methods: {
    infiniteHandler ($state) {
      this.$http.get('posts/' + this.page + this.params).then(({data}) => {
        if (data.posts.length) {
          this.posts = this.posts.concat(data.posts)
          this.page += 1
          $state.loaded()
          if (data.count === this.posts.length) {
            $state.complete()
          }
        } else {
          $state.complete()
        }
      })
    }
  }
}
</script>

<style scoped>
.list {
  width: 100%;
}

section {
  padding: 8px 0;
  border-bottom: 1px solid rgba(0,0,0,0.14);
}

h2 {
  font-size: 1.2em;
}

.category {
  background: #b57edc;
  color: #fff;
  font-size: 70%;
  padding: 2px 5px;
  border-radius: 5px;
}

.material-icons {
  font-size: 0.8em;
}

.content-wrapper {
  display: flex;
}

.avatar {
  width: 48px;
  padding-right: 8px;
}

.post-meta {
  font-size: 0.9em;
  line-height: 1em;
}

.avatar-placeholder {
  height: 48px;
  width: 48px;
  border-radius: 50%;
  background: #ccc;
}

.expanded-contents {
  font-size: 0.9em;
}
</style>
