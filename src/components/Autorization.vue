<template>
  <div class="autorization">
    <h2 class="autorization__title">Authorization</h2>
    <span class="autorization__text">Please authorize</span>
    <form class="autorization__form" @submit.prevent="auth">
      <div class="input-group flex-nowrap autorization__form__item">
        <label for="exampleInputPassword1" class="form-label">User</label>
        <div class="autorization__form__input">
          <span
            class="input-group-text autorization__form__icon-user"
            id="addon-wrapping"
          ></span>
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
      </div>
      <div class="input-group flex-nowrap autorization__form__item">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <div class="autorization__form__input">
          <span
            class="input-group-text autorization__form__icon-password"
            id="addon-wrapping"
          ></span>
          <input
            type="password"
            class="form-control"
            autocomplete="on"
            v-model="password"
            placeholder="Password"
            id="exampleInputPassword1"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary autorization__form__button">
        Submit
      </button>
    </form>
    <div>
      <span
        :class="{
          autorization__form__error: isError,
          autorization__form__notification: !isError
        }"
        >{{ message }}</span
      >
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { reactive } from "vue";
export default {
  name: "autorization",
  props: {
    isAuth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      username: "",
      password: "",
      isAuthProp: this.isAuth,
      isError: false,
      message: ""
    };
  },
  mounted() {
    localStorage.removeItem("token");
  },
  methods: {
    async auth() {
      const data = reactive({
        username: this.username,
        password: this.password
      });
      let response = await fetch("http://127.0.0.1:7000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      var res = await response.json();
      console.log(res);
      if (typeof res.data.token !== "undefined") {
        this.isAuthProp = true;
        this.isError = false;
        this.$router.push("/calendly");
        localStorage["token"] = res.data.token;
      } else {
        this.message = res.data.message;
        this.isAuthProp = false;
        this.isError = true;
      }
      // await this.setTokenStore(res.data.token);
      // await this.$emit("getAuth", this.isAuthProp);
    }
  }
  // ...mapMutations(['setTokenStore'])
};
</script>

<style scoped lang="scss">
.autorization {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__text {
    padding-top: 10px;
  }

  &__form {
    width: 500px;

    &__icon-user {
      background-image: url("../assets/user.svg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 70%;
    }
    &__icon-password {
      background-image: url("../assets/password.svg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 70%;
    }

    &__item {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-top: 15px;
    }

    &__input {
      display: flex;
      gap: 10px;
    }

    &__button {
      width: 50%;
      margin: 20px auto;
      display: flex;
      justify-content: center;
    }

    &__notification {
      opacity: 0;
    }

    &__error {
      opacity: 1;
      color: red;
    }
  }
}
</style>
