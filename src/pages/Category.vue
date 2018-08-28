<template>
  <div class="category">
    <post-list class="post-list" :key="id" :params="'?category=' + this.id"></post-list>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
export default {
  name: 'Category',
  components: { 'post-list': PostList },
  data () {
    return {
      id: 0
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  beforeRouteEnter (to, from, next) {
    next(vm => { vm.id = vm.$route.params.id })
  },
  beforeRouteUpdate (to, from, next) {
    this.id = to.params.id
    console.log(this.id)
    next()
  },
  metaInfo: {
    title: 'Category - Stanley\'s Blog'
  }
}
</script>

<style scoped>
.category {
  width: 100%;
}

@media screen and (min-width: 768px)
{
  .category {
    display: flex;
    justify-content: center;
  }

  .post-list {
    background: #fff;
    padding: 8px 16px;
    width: 768px;
    border-radius: 5px;
  }
}
</style>
