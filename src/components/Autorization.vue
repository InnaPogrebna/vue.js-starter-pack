<template>
  <div class="autorization">
    <h2 class="autorization__title">Autorization</h2>
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
    <!-- <div v-if="isAuth">
      <span>{{ username }}</span>
      <span>{{ password }}</span>
    </div> -->
    <div>
      <span
        :class="{
        autorization__form__error: isError,
        autorization__form__notification: !isError,
      }"
      >It's not correct username or password</span>
    </div>
  </div>
</template>

<script>
export default {
    name: "autorization",
    props: {
    isAuth: {
      type: Boolean,
      default: false,
    },
  },
    data() {
        return {
            username: "",
            password: "",
            isAuthProp: this.isAuth,
            isError: false,
        };
    },
    methods: {
        auth() {
            if (this.username === "duck_admin" && this.password === "Tfw54dv7H") {
                this.isAuthProp = true;
                
            }
            else {
                this.isAuthProp  = false;
                this.isError = true;
            }
            this.$emit('getAuth', this.isAuthProp)
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.autorization {
  height: 100vh;
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
