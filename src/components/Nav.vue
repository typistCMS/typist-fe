<template>
  <nav :class="{ 'show-title': showTitle }">
    <div class="nav-left">
      <router-link to="/"><h1>Stanley's Blog</h1></router-link>
    </div>
    <div class="nav-right">
      <div class="category-wrapper">
        <ul>
          <li v-for="category in categories" :key="category.id">
            <router-link :to="'/category/' + category.id">
              {{ category.name }}
            </router-link>
          </li>
          <li><router-link to="/category/0">Uncategorized</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      currentScroll: 0,
      lastScroll: 0,
      showTitle: true,
      categories: []
    }
  },
  created () {
    this.getCategories()
    document.addEventListener('scroll', this.toggleTitle, false)
  },
  methods: {
    getCategories () {
      this.$http.get('/categories').then(({data}) => {
        this.categories = data
      })
    },
    toggleTitle () {
      this.currentScroll = window.pageYOffset
      if (this.currentScroll < this.lastScroll) {
        this.showTitle = true
      } else {
        this.showTitle = false
      }
      this.lastScroll = this.currentScroll
    }
  }
}
</script>

<style scoped>
nav {
  align-items: center;
  top: -34px;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 4;
  justify-content: space-between;
  padding: 2px 8px;
  background: #fff;
  transition: all 0.2s ease-in;
  box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);
}

.category-wrapper::-webkit-scrollbar {
  display: none;
}

.nav-left {
  display: flex;
  justify-content: space-between;
}

.nav-right {
  padding-top: 2px;
}

.show-title {
  top: 0;
}

ul {
  display: flex;
}

li {
  margin-left: 4px;
  padding: 0 5px;
  box-sizing: border-box;
  background: #f3eaf9;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
}

li:first-child {
  margin-left: 0;
}

.category-wrapper {
  overflow: auto;
}

a {
  text-decoration: none;
}

li a:hover {
  color: #9467b4;
}

h1 {
  font-size: 1.5em;
  margin: 0;
}

@media screen and (min-width: 768px)
{
  nav {
    height: 48px;
    top: -54px;
    display: flex;
    padding: 0 16px;
  }

  li {
    background: none;
    display: flex;
    align-items: center;
    font-size: 1em;
  }

  .nav-right {
    padding-top: 0;
  }
}
</style>
