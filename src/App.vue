<template>
  <div id="app">
    <!-- <router-link v-bind:to="'/autorization'">Autorization</router-link> -->
    <!-- <router-view></router-view> -->
    <Autorization v-if="!isAuth" :isAuth="isAuth" @getAuth="getAuth"/>
    <Calendly v-if="isAuth" />
  </div>
</template>

<script>
import Autorization from './components/Autorization.vue';
import Calendly from './components/Calendly.vue';
export default {
    name: "app",
    components: {
      Autorization,
      Calendly,
    },
  data() {
    return {
      isAuth: false,
    }
  },
  methods: {
    getAuth(auth) {
      this.isAuth = auth;
    },
  }
}
</script>

<style lang="scss">
    @import 'styles/main.scss';
</style>
