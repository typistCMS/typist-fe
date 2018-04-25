<template>
  <main class="revisions">
    <table>
      <thead>
        <td>#</td>
        <td>Created By</td>
        <td>Created At</td>
      </thead>
      <tbody>
        <router-link
          tag="tr"
          :to="'/post/' + $route.params.id + '/revision/' + revision.id" v-for="revision in revisions"
          v-bind:key="revision.id"
        >
          <td> {{ revision.id }} </td>
          <td> {{ revision.user_name }} </td>
          <td> {{ revision.created_at | localTimeDetail }} </td>
        </router-link>
      </tbody>
    </table>
  </main>
</template>

<script>
export default {
  data () {
    return {
      revisions: []
    }
  },
  created () {
    this.retrieveRevisions()
  },
  methods: {
    retrieveRevisions () {
      this.$http.get('/post/' + this.$route.params.id + '/revisions').then(({data}) => {
        this.revisions = data
      })
    }
  }
}
</script>

<style scoped>
tr:first-child {
  background-color: #f3eaf9;
}

tr:first-child td {
  color: #b57edc;
}
</style>
