<template>
  <div id="app">
    <nav v-bind:class="{ 'expand-list': !postActive, 'post-active': postActive }" @click="$router.push('/')">
      <select class="filter" v-model="categoryId" @change="changeCategory">
        <option value="" selected>All categories</option>
        <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.name }}</option>
        <option value="0">Uncategorized</option>
      </select>
    </nav>

    <aside v-bind:class="{ 'expand-list': !postActive, 'post-active': postActive }">
      <section v-for="post in posts" class="post" v-bind:key="post.id">
        <router-link tag="section" :to="'/post/' + post.id" class="expand_content" v-if="post.expand_content">
          <p class="post-meta">
            {{ post.last_edit_by }} - {{ post.updated_at | localTime }}
          </p>
          <vue-markdown v-if="post.expand_content" :source="post.content"></vue-markdown>
        </router-link>

        <header v-else>
          <router-link tag="h2" :to="'/post/' + post.id">{{ post.title }}</router-link>
          <p class="post-meta">
            Last edit by:&nbsp;<router-link to="/user/">{{ post.last_edit_by }}</router-link><br>
            under&nbsp;
            <span class="category"> {{ post.category_name }} </span>
          </p>
        </header>
      </section>

      <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading"></infinite-loading>
    </aside>

    <main>
      <button class="btn-close" @click="closePost()">Click to return</button>
      <router-view class="router-view"/>
      <footer><p>Powered by <a href="https://github.com/typistCMS">typistCMS</a></p></footer>
    </main>

  </div>
</template>

<style>
.router-view {
  flex: 1 0 auto;
}

footer {
  text-align: center;
  flex-shrink: 0;
  padding: 3em;
  font-size: 14px;
}

.btn-close {
  position: fixed;
  background: #b57edc;
  height: 2em;
  border: 0;
  outline: none;
  font-size: 12px;
  text-align: center;
  width: 100vw;
  padding: 0;
  color: #fff;
}

nav{
  position: fixed;
  top: 0;
  height: 3em;
  line-height: 3em;
  width: 100vw;
  background-color: #fff;
  text-align: center;
  z-index: 2;
  transition: 0.5s ease-in-out;
}

nav .filter {
  width: 96%;
  background-color: rgba(181, 126, 220, 0.2);
  border: 0px;
  color: rgba(181, 126, 220, 0.8);
  padding: 2px;
  outline-color: #b57edc;
  outline-width: thin;
}

nav h2 {
  margin: 0;
}

main {
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

aside {
  margin-top: 3em;
  overflow-y: auto;
  height: calc(100vh - 3em);
  margin-bottom: 1em;
  transition: 0.5s ease-in-out;
}

@media screen and (max-width: 767px) {
  aside {
    position: fixed;
    width: 100vw;
    top: 0px;
    left: 0px;
    z-index: 1;
    background-color: #fff;
  }

  main {
    background-color: #fff;
  }

  .post-active {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  #app {
    display: flex;
  }

  aside {
    width: 300px;
  }

  nav {
    box-sizing: border-box;
    width: 300px;
  }

  main {
    border-left: 1px solid #ccc;
    flex: 1;
  }

  .btn-close {
    display: none;
  }

  .expand-list {
    width: 40vw;
    box-sizing: border;
  }

}

  .post {
    border-bottom: 1px solid #ccc;
    padding: 0.1em 2%
  }

  .post .title {
    margin: 0.1em 0;
  }

  .post .post-meta {
    margin: 0;
    color: #999;
  }

  .post .category {
    background-color: #b57edc;
    color: #fff;
    padding: 0.2em 0.5em;
    font-size: 70%;
    border-radius: 1em;
    line-height: 1em;
  }

  body {
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';
  }
</style>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import VueMarkdown from 'vue-markdown'
export default {
  components: { InfiniteLoading, VueMarkdown },
  data () {
    return {
      page: 1,
      posts: [],
      categoryId: '',
      categories: []
    }
  },
  computed: {
    postActive () {
      return this.$route.name === 'Post' || this.$route.name === 'Revisions'
    }
  },
  watch: {
    categoryId: function (oldVal, newVal) {
    }
  },
  created () {
    this.getCategories()
  },
  methods: {
    infiniteHandler ($state) {
      let url = '/posts/' + this.page
      if (this.categoryId) {
        url += '/filter/category/' + this.categoryId
      }
      this.$http.get(url).then(({data}) => {
        if (data.posts.length) {
          this.posts = this.posts.concat(data.posts)
          ++this.page
          $state.loaded()
        } else {
          $state.complete()
        }
      }).catch(({response}) => {
        if (response.data.code === 404) {
          $state.complete()
        }
      })
    },
    closePost () {
      this.$router.push('/')
    },
    changeCategory () {
      this.posts = []
      this.page = 1
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
    },
    getCategories () {
      this.$http.get('/categories').then(({data}) => {
        this.categories = data
      })
    }
  }
}
</script>
