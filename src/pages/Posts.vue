<template>
  <div id="posts">
    <nav>
      <select class="filter">
        <option selected>All categories</option>
        <option value="1">World</option>
        <option value="2">World2</option>
      </select>
    </nav>
    <aside>
      <section v-for="post in posts" class="post" :key="post.id">
        <header>
          <router-link tag="h2" :to="`/p/post/${post.id}`">{{ post.title }}</router-link>
          <p class="post-meta">
            Last edit by:&nbsp;<router-link :to="/user/">{{ post.last_edit_by }}</router-link><br>
            under&nbsp;
            <span class="category"> {{ post.category_name }} </span>
          </p>
        </header>
      </section>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </aside>
    <main v-bind:class=" { 'post-active': postActive } ">
      <button class="btn-close"  @click="closePost()">Click to return</button>
      <router-view />
    </main>
  </div>
</template>

<style>
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
}

aside {
  margin-top: 3em;
  overflow-y: auto;
  height: calc(100vh - 3em);
  margin-bottom: 1em;
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
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;
    background-color: #fff;
  }

  .post-active {
    z-index: 3;
  }
}

@media screen and (min-width: 768px) {
  #posts {
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
</style>

<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  components: { InfiniteLoading },
  data () {
    return {
      page: 1,
      posts: []
    }
  },
  computed: {
    postActive () {
      return this.$route.name === 'Post'
    }
  },
  methods: {
    infiniteHandler ($state) {
      this.$http.get('/posts/' + this.page).then(({data}) => {
        if (data.posts.length) {
          this.posts = this.posts.concat(data.posts)
          ++this.page
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    },
    closePost () {
      this.$router.go(-1)
    }
  }
}
</script>
