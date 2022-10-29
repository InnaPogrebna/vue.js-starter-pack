<template>
  <div id="calendly" class="calendly">
    <div class="calendly__right calendly__list-block">
      <form class="calendly__autorization" @submit.prevent="addEmployees">
        <h3 class="calendly__autorization__form-title">Add new employee</h3>
        <div class="row">
          <div class="col">
            <input
              type="text"
              v-model="first_name"
              class="form-control"
              placeholder="First name"
              aria-label="First name"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <input
              type="text"
              v-model="last_name"
              class="form-control"
              placeholder="Last name"
              aria-label="Last name"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <input
              type="text"
              v-model="token"
              class="form-control"
              placeholder="Enter token"
              aria-label="token"
            />
          </div>
        </div>
        <!-- <div class="row">
          <div class="col">
            <input
              type="text"
              v-model="login"
              class="form-control"
              placeholder="Enter Login"
              aria-label="login"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <input
              type="text"
              v-model="password"
              class="form-control"
              placeholder="Enter Password"
              aria-label="password"
            />
          </div>
        </div> -->
        <button
          type="submit"
          class="btn btn-primary autorization__form__button calendly__btn calendly__btn-center"
          :class="{
            disabled:
              first_name.length === 0 ||
              last_name.length === 0 ||
              token.length === 0
          }"
        >
          Add employee
        </button>
        <!-- <div>
          <span
            :class="{
              error: isError,
              notification: !isError
            }"
            >{{ message }}</span
          >
        </div> -->
      </form>
      <form
        class="calendly__autorization calendly__list-block"
        @submit.prevent="addMeeting"
      >
        <h3 class="calendly__autorization__form-title">Add new meeting</h3>
        <div class="row">
          <div class="col">
            <input
              type="text"
              v-model="newMeeting"
              class="form-control"
              placeholder="Enter meetting"
              aria-label="Enter meeting"
            />
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary autorization__form__button calendly__btn calendly__btn-center"
          :class="{
            disabled: newMeeting.length === 0
          }"
        >
          Add meeting
        </button>
      </form>
    </div>
    <div class="calendly__center"></div>
    <div class="calendly__left">
      <div class="calendly__list">
        <div class="calendly__list-block">
          <h3 class="calendly__autorization__form-title">Choose employee</h3>
          <div class="calendly__list-wrapper">
            <select
              class="form-select"
              v-model="employee"
              aria-label="Default select example"
              @change="getSelectedEmployee"
            >
              <option value="" disabled selected>Select employee</option>
              <option v-for="(employee, index) of this.employees" :key="index"
                >{{ employee.first_name }}&nbsp{{ employee.last_name }}
              </option>
            </select>
            <button
              type="button"
              @click="removeEmployee"
              class="btn btn-primary autorization__form__button calendly__btn"
            >
              Delete employee
            </button>
          </div>
        </div>
        <div class="row calendly__list-block">
          <h3 class="calendly__autorization__form-title">Update employee</h3>
          <div class="col calendly__list-wrapper">
            <input
              type="text"
              v-model="newEmployee"
              class="form-control"
              placeholder="Update employee"
              aria-label="Update employee"
            />
            <button
              type="submit"
              @click="updateEmployee"
              :class="{
                disabled: newEmployee.length === 0
              }"
              class="btn btn-primary autorization__form__button calendly__btn"
            >
              Update employee
            </button>
          </div>
        </div>
      </div>
      <div class="calendly__meets calendly__list-block">
        <h3 class="calendly__autorization__form-title">Choose meeting</h3>
        <select
          class="form-select"
          aria-label="Default select example"
          @change="getMeetings"
          v-model="meeting"
        >
          <option value="" disabled selected>Select meeting</option>
          <option v-for="(meeting, index) of meetings" :key="index">{{
            meeting.name
          }}</option>
        </select>
        <button
          type="button"
          class="btn btn-primary autorization__form__button calendly__btn-center "
        >
          <a :href="`${calendlyLink}`" target="_blank" class="calendly__link"
            >Link meeting</a
          >
        </button>
      </div>
      <div class="calendly__list-block">
        <button
          type="button"
          class="btn btn-primary autorization__form__button calendly__btn-center calendly__btn-reserve"
        >
          Reserve meeting
        </button>
      </div>
    </div>
    <div
      class="message"
      :class="{
        message__visible: isMessage,
        message__hide: !isMessage
      }"
    >
      <p class="message__text">{{ notification }}</p>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "Calendly",
  data() {
    return {
      first_name: "",
      last_name: "",
      employee_id: 0,
      token: "",
      // login: "",
      // password: "",
      meeting: "",
      newMeeting: "",
      employee: {},
      newEmployee: "",
      index: 0,
      employees: [],
      meetings: [],
      uriEmployee: "",
      calendlyToken: "",
      isError: false,
      message: "",
      notification: "",
      isMessage: false,
      calendlyLink: ""
    };
  },

  async created() {
    let requestUser = await fetch(
      "http://127.0.0.1:7000/api/user/getUserInfo",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage["token"]
        }
      }
    );
    const req = await requestUser.json();
    this.employees = req.data[1];
    if (req.token === false) {
      this.$router.push("/authorization");
    } else {
      // this.calendly = true;
    }
    // this.employees = JSON.parse(localStorage.getItem("employees") || "[]");
    // this.meetings = JSON.parse(localStorage.getItem("meetings") || "[]");
  },
  async mounted() {
    this.$router.push("/calendly");
  },
  methods: {
    async addEmployees() {
      const newData = reactive({
        employee_id: this.employees.length + 1,
        first_name: this.first_name,
        last_name: this.last_name,
        user_token: this.token
        // login: this.login,
        // password: this.password
      });

      const response = await fetch(
        "http://127.0.0.1:7000/api/employees/addEmployees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ...newData, token: localStorage["token"] })
        }
      );

      const res = await response.json();
      await this.checkEmployee(res, newData);

      // localStorage["employees"] = JSON.stringify(this.employees);
    },
    checkEmployee(res, newData) {
      if (res.data.error === false) {
        this.isError = false;
        this.message = "";
        this.employees = [...this.employees, newData];
        this.isMessage = true;
        this.notification = res.data.message;

        this.first_name = "";
        this.last_name = "";
        this.token = "";
      } else {
        this.isError = true;
        this.isMessage = true;
        this.notification = res.data.message;
      }

      setTimeout(() => {
        this.isMessage = false;
        this.first_name = "";
        this.last_name = "";
        this.token = "";
      }, 2000);
    },
    // addMeeting() {
    //   if (this.meeting === "") {
    //     return;
    //   }
    //   this.meetings = [...this.meetings, this.meeting];
    //   this.meeting = "";
    //   localStorage["meetings"] = JSON.stringify(this.meetings);
    // },

    async getSelectedEmployee() {
      const arrayEmployee = this.employee.trim().split(/\s+/);
      const selectEmployee = this.employees.filter(
        item =>
          item.first_name === arrayEmployee[0] &&
          item.last_name === arrayEmployee[1]
      );

      this.calendlyToken = selectEmployee[0].user_token;
      if (this.calendlyToken) {
        const response = await fetch("https://api.calendly.com/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.calendlyToken
          }
        });
        const res = await response.json();
        if (res.title === "Unauthenticated") {
          this.isMessage = true;
          this.notification = `Error token`;
          this.meetings = [];

          setTimeout(() => {
            this.isMessage = false;
          }, 2000);
        } else {
          this.uriEmployee = await res.resource.uri;
          return await this.getMeetings();
        }
      }
    },

    async getMeetings() {
      if (this.uriEmployee) {
        const responseUser = await fetch(
          `https://api.calendly.com/event_types?user=${this.uriEmployee}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.calendlyToken
            }
          }
        );

        const calendlyEvents = await responseUser.json();
        const calMeeting = await calendlyEvents.collection.map(item => {
          if (item.name === this.meeting) {
            return item.scheduling_url.trim().split(/\s+/);
          }
          return "";
        });
        const link = await calMeeting.filter(str => str.length !== 0).join();
        this.calendlyLink = await link;
        this.meetings = await calendlyEvents.collection;
      } else {
        this.meetings = [];
      }
    },

    async removeEmployee() {
      let arrayEmployee = this.employee.trim().split(/\s+/);
      const removeEmployee = this.employees.filter(
        item =>
          item.first_name === arrayEmployee[0] &&
          item.last_name === arrayEmployee[1]
      );
      // const removeEmployee = this.getSelectEmployee();
      console.log("removeEmployee", removeEmployee);

      const response = await fetch(
        "http://127.0.0.1:7000/api/employees/removeEmployees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...removeEmployee,
            token: localStorage["token"]
          })
        }
      );

      const res = await response.json();
      console.log(res.data);

      if (res.error) {
        this.$router.push("/authorization");
      } else {
        this.notification = res.data.message;
        this.isMessage = true;
        this.employees = res.data.data;
        // this.employees = this.employees.filter(
        //   employee =>
        //     employee.first_name !== arrayEmployee[0] &&
        //     employee.last_name !== arrayEmployee[1]
        // );

        setTimeout(() => {
          this.isMessage = false;
        }, 2000);
      }
      // const arrayEmployee = this.employee.trim().split(/\s+/);

      // console.log(this.employees);
      // localStorage["employees"] = JSON.stringify(this.employees);
    },
    async updateEmployee() {
      const arrNewEmployee = this.newEmployee.trim().split(/\s+/);
      const arrayEmployee = this.employee.trim().split(/\s+/);
      const firstName = arrNewEmployee[0];
      const lastName = arrNewEmployee[1];
      const newEmployee = {
        firstName: firstName,
        lastName: lastName
      };
      const selectEmployee = this.employees.filter(
        item =>
          item.first_name === arrayEmployee[0] &&
          item.last_name === arrayEmployee[1]
      );

      const response = await fetch(
        "http://127.0.0.1:7000/api/employees/updateEmployees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...selectEmployee,
            newEmployee,
            token: localStorage["token"]
          })
        }
      );

      const res = await response.json();
      console.log(res);
      this.employees = res.data.data;
      this.notification = res.message;
      this.isMessage = true;
      this.newEmployee = "";
      setTimeout(() => {
        this.isMessage = false;
      }, 2000);

      // this.employees = this.employees.map(employee =>
      //   employee.first_name === arrayEmployee[0] &&
      //   employee.last_name === arrayEmployee[1]
      //     ? { first_name: firstName, last_name: lastName }
      //     : employee
      // );

      // localStorage["employees"] = JSON.stringify(this.employees);
    }
  }
};
</script>

<style scoped lang="scss">
.message {
  position: absolute;
  top: 0px;
  left: 40px;
  opacity: 0;
  width: 376px;
  height: 80px;
  // margin: auto;
  background-color: #c7d0f5c6;
  border-radius: 20px;

  &__text {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    height: 100%;
    font-weight: bold;
    padding: 0px 20px;
  }

  &__visible {
    opacity: 1;
  }
  &__hide {
    opacity: 0;
  }
}
.calendly {
  display: flex;
  justify-content: space-around;
  height: 90vh;
  padding: 40px 0;
  position: relative;

  &__right {
    width: 35%;
    //margin: 40px auto;
  }

  &__center {
    width: 3px;
    background-color: rgba(176, 168, 168, 0.786);
  }

  &__left {
    width: 40%;
  }

  &__list {
    &-wrapper {
      display: flex;
      gap: 20px;
    }

    &-block {
      margin-top: 40px;
    }
  }

  &__link {
    text-decoration: none;
    color: white;
  }

  &__autorization {
    display: flex;
    flex-direction: column;
    gap: 15px;

    &__form {
      &-title {
        text-align: start;
        font-size: 25px;
      }
    }
  }

  &__btn {
    width: 220px;
    text-align: center;

    &-center {
      display: flex;
      margin: auto;
      display: block;
    }

    &-reserve {
      width: 300px;
      padding: 10px;
    }
  }
}

.disabled {
  pointer-events: none;
  background-color: rgb(168, 182, 239);
  border: 1px solid rgb(168, 182, 239);
}

.notification {
  opacity: 0;
}

.error {
  opacity: 1;
  color: red;
}
</style>
