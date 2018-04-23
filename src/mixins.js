module.export = {
  filters: {
    localTime (value) {
      return new Date(value + ' UTC').toLocaleString()
    }
  }
}
