<template>
  <post-list :params="'?category=' + this.$route.params.id"></post-list>
</template>

<script>
import PostList from '@/components/PostList'
export default {
  components: { 'post-list': PostList }
}
</script>
