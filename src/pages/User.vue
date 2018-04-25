<template>
  <main class="typo">
    <header>
      <h1> {{ name }} </h1>
      <p> {{ description }} </p>
    </header>
  </main>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      description: ''
    }
  },
  created () {
    this.getUser(this.$route.params.id)
  },
  methods: {
    getUser (id) {
      this.$http.get('/user/' + id).then(({data}) => {
        this.name = data.name
        this.description = data.description
      })
    }
  }
}
</script>
