<template>
  <div id="app">
    <tp-nav />
    <main>
      <keep-alive include="Home,Category">
        <router-view class="router-view"/>
      </keep-alive>
    </main>
    <tp-footer />
  </div>
</template>

<style>
#app {
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  display: flex;
  flex: auto;
  padding: 8px;
}

blockquote {
  border-left: 1px solid #b57edc;
}

@media screen and (min-width: 768px)
{
  main {
    padding: 8px 16px;
  }

  #app {
    background: #fcfafe;
    padding-top: 48px;
  }
}
</style>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
export default {
  components: { 'tp-nav': Nav, 'tp-footer': Footer }
}
</script>
