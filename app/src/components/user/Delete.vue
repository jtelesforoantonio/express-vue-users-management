<template>
  <v-row justify="center">
    <v-dialog persistent v-model="showDeleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Eliminar usuario</v-card-title>
        <v-card-text>
          ¿Estas seguro de querer eliminar este registro?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="red" text @click="destroy" :loading="isDeleting">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'Delete',
    data() {
      return {
        user: {
          index: '',
          id: ''
        }
      }
    },
    methods: {
      closeDialog() {
        this.$store.dispatch('user/showDeleteDialog', false);
      },
      destroy() {
        this.$store.dispatch('user/destroy', this.user);
      }
    },
    computed: {
      ...mapState('user', ['showDeleteDialog', 'isDeleting']),
    },
    watch: {
      showDeleteDialog(val) {
        if (val) {
          const userToDelete = this.$store.state.user.userToDelete;
          Object.assign(this.user, userToDelete);
        }
      }
    }
  }
</script>

<style scoped>

</style>
