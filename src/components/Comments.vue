<template>
  <section class="comments">
    <h2>Comments</h2>
    <form class="comment-input" v-on:submit.prevent="createComment">
      <textarea placeholder="What do you want to say..." v-model="content" required></textarea>
      <button type="submit"><i class="material-icons">send</i></button>
    </form>

    <ul>
      <li v-for="comment in comments" v-bind:key="comment.id">
        {{ comment.content }}
      </li>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
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
  .comment-input {
    display: flex;
    flex-direction: row;
  }

  .comment-input textarea {
    width: 100%;
    border: 1px solid #b57edc;
    border-radius: 2px;
    outline: #b57edc;
    outline-width: thin;
    padding: 3px;
    box-sizing: border-box;
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
</style>
