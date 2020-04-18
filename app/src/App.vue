<template>
  <v-app>
    <app-bar/>
    <v-content>
      <v-container
        fluid
      >
        <v-row>
          <v-col>
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import AppBar from './components/common/AppBar';

  export default {
    name: 'App',
    components: {
      AppBar
    },
    data: () => ({})
  };
</script>
