<template>
  <v-card :loading="loading">
    <v-card-text>
      <div class="text-right">
        <v-btn color="green" title="crear" fab @click="showCreateDialog">
          <v-icon color="white">mdi-plus</v-icon>
        </v-btn>
      </div>
      <index/>
      <create/>
    </v-card-text>
  </v-card>
</template>

<script>
  import {mapState} from 'vuex';
  import Index from '../components/user/Index';
  import Create from '../components/user/Create';

  export default {
    name: "User",
    components: {
      Index,
      Create,
    },
    computed: {
      ...mapState('user', ['loading']),
    },
    methods: {
      showCreateDialog() {
        this.$store.dispatch('user/showCreateDialog', true)
      }
    }
  }
</script>

<style scoped>

</style>
