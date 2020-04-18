<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th>Nick</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">Apellidos</th>
          <th class="text-left">Email</th>
          <th class="text-left">Role</th>
          <th class="text-left">Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ user.nick}}</td>
          <td>{{ user.name}}</td>
          <td>{{ user.lastName}}</td>
          <td>{{ user.email}}</td>
          <td>{{ user.role.name}}</td>
          <td>
            <v-btn icon color="primary" title="editar" @click="showEditDialog(index, user)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="error" title="eliminar" @click="showDeleteDialog(index, user)">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-pagination
      :length="totalPages"
      :total-visible="5"
      v-model="page"
      @input="index"
    ></v-pagination>
    <edit/>
    <delete/>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Edit from './Edit';
  import Delete from './Delete';

  export default {
    name: 'Index',
    components: {
      Edit,
      Delete
    },
    data(){
      return {
        page: 1
      };
    },
    mounted() {
      this.index();
    },
    methods: {
      index() {
        this.$store.dispatch('user/index', {page: this.page});
      },
      showEditDialog(index, user) {
        this.$store.dispatch('user/showEditDialog', true);
        this.$store.dispatch('user/setUserToEdit', {index, ...user});
      },
      showDeleteDialog(index, user) {
        this.$store.dispatch('user/showDeleteDialog', true);
        this.$store.dispatch('user/setUserToDelete', {index, ...user});
      }
    },
    computed: {
      ...mapState('user', ['users', 'totalPages']),
    }
  }
</script>

<style scoped>

</style>
