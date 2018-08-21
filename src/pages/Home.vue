<template>
  <div class="home">
    <h1>Most Recent</h1>
    <post-list></post-list>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Nav from '@/components/Nav'
import PostList from '@/components/PostList'
export default {
  components: { VueMarkdown, 'tp-nav': Nav, 'post-list': PostList }
}
</script>

<style scoped>
.home {
  width: 100%;
}

h1 {
  margin: 0em;
  font-size: 1.5em;
}
</style>
