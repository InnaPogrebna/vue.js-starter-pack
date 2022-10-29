<template>
  <div id="app">
    <Navigation v-if="isCalendly === false" />
    <NavigationCalendly v-else />
    <router-view></router-view>
    <Autorization v-if="isRegister" :isAuth="isAuth" @getAuth="getAuth" />
    <Calendly
      v-if="isRegister"
    />
  </div>
</template>

<script>
import Registration from "./components/Registration.vue";
import Autorization from "./components/Autorization.vue";
import Calendly from "./components/Calendly.vue";
import Navigation from "./components/Navigation.vue";
import NavigationCalendly from "./components/NavigationCalendly.vue";
export default {
  name: "app",
  components: {
    Navigation,
    NavigationCalendly,
    Registration,
    Autorization,
    Calendly
  },
  data() {
    return {
      isAuth: false,
      isRegister: false,
      isCalendly: false
    };
  },
  beforeCreate() {
    if (typeof localStorage["token"] !== "undefined") {
      this.$router.push("/calendly");
      return (this.isCalendly = true);
    } else {
      this.$router.push("/authorization");
      return (this.isCalendly = false);
    }
  },
  updated() {
    this.getAuth();
  },
  mounted() {
    this.getAuth();
  },
  methods: {
    getAuth() {
      if (typeof localStorage["token"] !== "undefined") {
        this.$router.push("/calendly");
        return (this.isCalendly = true);
      } else {
        return (this.isCalendly = false);
      }
    },
    getRegister(register) {
      this.isRegister = register;
    },
    getCalendly(calendly) {
      this.isCalendly = calendly;
    }
  }
};
</script>

<style lang="scss">
@import "styles/main.scss";
</style>
