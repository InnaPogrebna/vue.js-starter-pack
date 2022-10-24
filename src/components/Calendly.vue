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
        <button
          type="submit"
          class="btn btn-primary autorization__form__button calendly__btn calendly__btn-center"
          :class="{
            disabled: first_name.length === 0 || last_name.length === 0
          }"
        >
          Add employee
        </button>
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
              v-model="meeting"
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
            disabled: meeting.length === 0
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
        <select class="form-select" aria-label="Default select example">
          <option value="" disabled selected>Select meeting</option>
          <option v-for="(meeting, index) of this.meetings" :key="index">{{
            meeting
          }}</option>
        </select>
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
  </div>
</template>

<script>
// import { mapState, mapMutations } from 'vuex'
export default {
  name: "Calendly",
  //   props: {
  //   dataEmployees: {
  //     type: Array,
  //     default() {
  //       return []
  //     },
  //   }
  // },
  data() {
    return {
      first_name: "",
      last_name: "",
      meeting: "",
      employee: "",
      newEmployee: "",
      index: 0,
      employees: [],
      meetings: []
    };
  },
  created() {
    this.employees = JSON.parse(localStorage.getItem("employees") || "[]");
    this.meetings = JSON.parse(localStorage.getItem("meetings") || "[]");
  },
    mounted() {
    this.$router.push("/calendly");
  },
  //   computed: {
  //   // ...mapState(['data']),
  // },
  methods: {
    addEmployees() {
      if (this.first_name === "" || this.last_name === "") {
        return;
      }
      this.employees = [
        ...this.employees,
        {
          first_name: this.first_name,
          last_name: this.last_name
        }
      ];
      this.first_name = "";
      this.last_name = "";
      localStorage["employees"] = JSON.stringify(this.employees);
      // this.setEmployees(this.employees)
    },
    addMeeting() {
      if (this.meeting === "") {
        return;
      }
      this.meetings = [...this.meetings, this.meeting];
      this.meeting = "";
      localStorage["meetings"] = JSON.stringify(this.meetings);
    },
    removeEmployee() {
      const arrayEmployee = this.employee.trim().split(/\s+/);
      this.employees = this.employees.filter(
        employee =>
          employee.first_name !== arrayEmployee[0] &&
          employee.last_name !== arrayEmployee[1]
      );
      console.log(this.employees);
      localStorage["employees"] = JSON.stringify(this.employees);
    },
    updateEmployee() {
      const arrayEmployee = this.employee.trim().split(/\s+/);
      const arrNewEmployee = this.newEmployee.trim().split(/\s+/);
      const firstName = arrNewEmployee[0];
      const lastName = arrNewEmployee[1];
      this.employees = this.employees.map(employee =>
        employee.first_name === arrayEmployee[0] &&
        employee.last_name === arrayEmployee[1]
          ? { first_name: firstName, last_name: lastName }
          : employee
      );
      this.newEmployee = "";
      localStorage["employees"] = JSON.stringify(this.employees);
    }
    // ...mapMutations(['setEmployees'])
  }
};
</script>

<!-- styling for the component -->
<style scoped lang="scss">
.calendly {
  display: flex;
  justify-content: space-around;
  height: 100vh;
  padding: 40px 0;

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
</style>
