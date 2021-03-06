<template>
  <section class="comments">
    <h2>Comments</h2>
    <form class="comment-input" v-on:submit.prevent="createComment">
      <textarea placeholder="What do you want to say..." v-model="content" required></textarea>
      <button type="submit"><i class="material-icons">send</i></button>
    </form>

    <ul class="comment-list">
      <li v-for="comment in comments" v-bind:key="comment.id" class="comment">
        <p class="comment-meta">
          <span><i class="material-icons">location_on</i> {{ comment.location }}</span>
          <span><i class="material-icons">access_time</i> {{ comment.created_at | localTime }}</span>
        </p>
        {{ comment.content }}
      </li>
      <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading"></infinite-loading>
    </ul>
  </section>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  props: ['postId'],
  components: { InfiniteLoading },
  data () {
    return {
      content: null,
      page: 1,
      comments: []
    }
  },
  watch: {
    postId (val, nVal) {
      this.comments = []
      this.page = 1
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
    }
  },
  methods: {
    createComment () {
      this.$http.post('comments/post/' + this.postId, {
        content: this.content
      }).then(({data}) => {
        console.log(data)
        this.comments.push(data)
      })
    },
    infiniteHandler ($state) {
      this.$http.get('comments/' + this.page + '/post/' + this.postId).then(({data}) => {
        if (data.comments.length) {
          this.comments = this.comments.concat(data.comments)
          if (data.count === this.comments.length) {
            $state.complete()
          }
          ++this.page
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    }
  }
}
</script>

<style>
  .comment {
    list-style: none;
    border-radius: 5px;
    background-color: rgba(240, 240, 240, 0.6);
    padding: 5px;
    margin-top: 5px;
  }

  .comment-meta {
    font-size: 12px;
    margin-bottom: 2px !important;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
  }

  .comment-meta .material-icons {
    font-size: 12px;
  }

  .comment-input {
    display: flex;
    flex-direction: row;
  }

  .comment-list {
    overflow-y: auto;
    height: 100vh;
  }

  .comment-list::-webkit-scrollbar {
    display: none;
  }

  .comment-input textarea {
    width: 100%;
    border: 1px solid #b57edc;
    border-radius: 2px;
    outline: #b57edc;
    outline-width: thin;
    padding: 8px;
    box-sizing: border-box;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.8);
  }

  .comment-input button {
    color: #b57edc;
    transition: all .2s ease-in-out;
    background: none;
    border: none;
    outline: none;
    padding: 3px;
  }

  .comment-input button:hover {
    transform: scale(1.1);
  }

  .comment-toggle {
    bottom: 1em;
    right: 1em;
    position: fixed;
    background: none;
    color: #b57edc;
    outline: #b57edc;
    border: none;
  }

  .comments {
    position: fixed;
    right: -300px;
    top: 0px;
    width: 300px;
    height: 100vh;
    transition: 0.38s ease-in-out;
    padding: 0.5em;
    box-sizing: border-box;
    z-index: 8;
    display: flex;
    background: #fff;
    flex-direction: column;
    box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);
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
    z-index: 2;
  }

  @media screen and (min-width: 768px)
  {
    .comments {
      top: 48px;
      z-index: 3;
    }
  }
</style>
