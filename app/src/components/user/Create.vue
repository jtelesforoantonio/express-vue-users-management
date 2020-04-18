<template>
  <v-row justify="center">
    <v-dialog persistent max-width="600px" v-model="showCreateDialog">
      <v-card>
        <v-card-title>
          <span class="headline">Crear usuario</span>
        </v-card-title>
        <ValidationObserver v-slot="{ handleSubmit }" ref="form">
          <v-card-text>
            <v-container>
              <errors v-show="errors.length" :errors="errors"/>
              <ValidationProvider name="nick" rules="required|nick" v-slot="{ errors }">
                <v-text-field
                  label="Nick *"
                  outlined
                  required
                  autofocus
                  v-model="user.nick"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
              <ValidationProvider name="nombre" rules="required|alpha_spaces" v-slot="{ errors }">
                <v-text-field
                  label="Nombre *"
                  outlined
                  required
                  v-model="user.name"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
              <ValidationProvider name="apellidos" rules="alpha_spaces" v-slot="{ errors }">
                <v-text-field
                  label="Apellidos"
                  outlined
                  required
                  v-model="user.lastName"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
              <ValidationProvider name="correo" rules="required|email" v-slot="{ errors }">
                <v-text-field
                  type="email"
                  label="Correo *"
                  outlined
                  required
                  v-model="user.email"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
              <ValidationProvider name="role" rules="required" v-slot="{ errors }">
                <v-select
                  outlined
                  label="Role *"
                  v-model="user.roleId"
                  :items="roles"
                  item-text="name"
                  item-value="id"
                  :error-messages="errors"
                ></v-select>
              </ValidationProvider>
              <ValidationProvider name="contraseña" rules="required" v-slot="{ errors }">
                <v-text-field
                  type="password"
                  label="Contraseña *"
                  outlined
                  required
                  v-model="user.password"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="closeDialog">Cancelar</v-btn>
            <v-btn color="green" text @click="handleSubmit(store)" :loading="isStoring">Guardar</v-btn>
          </v-card-actions>
        </ValidationObserver>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import { mapState } from 'vuex';
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  import Errors from "../common/Errors";
  import validate from "../../utils/validations/user/create";

  validate();

  export default {
    name: 'Create',
    components: {
      ValidationObserver,
      ValidationProvider,
      Errors
    },
    data() {
      return {
        user: {
          nick: '',
          name: '',
          lastName: '',
          email: '',
          password: '',
          roleId: '',
        },
        roles: [
          {
            id: 1,
            name: 'Admin'
          },
          {
            id: 2,
            name: 'Operador'
          },
          {
            id: 3,
            name: 'Administrativo'
          }
        ]
      }
    },
    methods: {
      clearForm() {
        this.$refs.form.reset();
        this.user.nick = '';
        this.user.name = '';
        this.user.lastName = '';
        this.user.email = '';
        this.user.password = '';
        this.user.roleId = '';
      },
      closeDialog() {
        this.$store.dispatch('user/showCreateDialog', false);
      },
      store() {
        this.$store.dispatch('user/store', this.user);
      }
    },
    computed: {
      ...mapState('user', ['showCreateDialog', 'isStoring', 'errors'])
    },
    watch: {
      showCreateDialog(val) {
        if (!val) {
          this.clearForm();
        }
      }
    }
  }
</script>

<style scoped>

</style>
