<template>
  <v-alert type="error">
    <ul>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </v-alert>
</template>

<script>
  export default {
    name: 'Errors',
    props: {
      errors: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
