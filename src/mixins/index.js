export default {
  methods: {
    checkPermission (point) {
      return this.$store.getters.points.includes(point)
    }
  }
}
