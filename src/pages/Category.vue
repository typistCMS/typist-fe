<template>
  <post-list class="post-list" :key="id" :params="'?category=' + this.id"></post-list>
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
