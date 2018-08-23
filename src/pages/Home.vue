<template>
  <div class="home">
    <section>
      <h1>Most Recent</h1>
      <post-list></post-list>
    </section>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Nav from '@/components/Nav'
import PostList from '@/components/PostList'
export default {
  name: 'Home',
  components: { VueMarkdown, 'tp-nav': Nav, 'post-list': PostList },
  metaInfo: {
    title: 'Home - Stanley\'s Blog'
  }
}
</script>

<style scoped>
.home, section {
  width: 100%;
}

h1 {
  margin: 0em;
  font-size: 1.5em;
}

@media screen and (min-width: 768px)
{
  .home {
    display: flex;
    justify-content: center;
  }

  section {
    background: #fff;
    padding: 8px 16px;
    width: 768px;
    border-radius: 10px;
  }

}
</style>
