<template>
  <div id="app">
    <tp-nav />
    <main>
      <router-view class="router-view"/>
    </main>
  </div>
</template>

<style>
#app {
  margin-top: 64px;
}

main {
  display: flex;
  padding: 8px;
}
</style>

<script>
import Nav from '@/components/Nav'
export default {
  components: { 'tp-nav': Nav }
}
</script>
