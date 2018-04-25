<template>
  <vue-markdown :source="$parent.post.content" :watches="['$parent.post.content']"></vue-markdown>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  components: {
    VueMarkdown
  },
  created () {
    if (this.$route.name === 'Revision') {
      this.$http.get('/post/' + this.$route.params.id + '/revision/' + this.$route.params.revision_id).then(({data}) => {
        this.$parent.post.content = data.content
        this.$parent.post.last_edit_by = data.created_by
        this.$parent.post.created_at = data.created_at
      })
    }
  }
}
</script>
