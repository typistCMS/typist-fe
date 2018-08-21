<template>
  <div id="app">
    <tp-nav />
    <main>
      <keep-alive include="Home,Category">
        <router-view class="router-view"/>
      </keep-alive>
    </main>
  </div>
</template>

<style>
#app {
  margin-top: 60px;
}

main {
  display: flex;
  padding: 8px;
}

@media screen and (min-width: 768px)
{
  main {
    padding: 8px 16px;
  }

  #app {
    margin-top: 48px;
  }
}
</style>

<script>
import Nav from '@/components/Nav'
export default {
  components: { 'tp-nav': Nav }
}
</script>
