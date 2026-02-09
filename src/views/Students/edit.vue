<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Edit Student</h4>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label>Name <span class="text-danger">*</span></label>
          <input type="text" v-model="model_student.name"
            :class="['form-control', showError && !model_student.name ? 'is-invalid' : '']" />
        </div>

        <div class="mb-3">
          <label>Email <span class="text-danger">*</span></label>
          <input type="email" v-model="model_student.email"
            :class="['form-control', showError && !model_student.email ? 'is-invalid' : '']" />
        </div>

        <div class="mb-3">
          <label>Phone <span class="text-danger">*</span></label>
          <input type="tel" v-model="model_student.phone"
            :class="['form-control', showError && !model_student.phone ? 'is-invalid' : '']" />
        </div>

        <div class="mb-3">
          <label>Status <span class="text-danger">*</span></label>
          <input type="text" v-model="model_student.status"
            :class="['form-control', showError && !model_student.status ? 'is-invalid' : '']" />
        </div>

        <div class="mb-3">
          <button type="button" class="btn btn-primary" @click="updateStudent">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "studentsEdit",
  data() {
    return {
      showError: false,
      model_student: {
        name: '',
        email: '',
        phone: '',
        status: ''
      }
    };
  },
  mounted() {
    const studentId = this.$route.params.id;
    this.getStudentData(studentId);
  },
  methods: {
    getStudentData(id) {
      axios.get(`http://localhost:3000/students/${id}`)
        .then(response => {
          this.model_student = response.data;
        })
        .catch(error => {
          console.error(error);
          alert("Student not found");
        });
    },
    updateStudent() {
      this.showError = true;

      if (
        !this.model_student.name ||
        !this.model_student.email ||
        !this.model_student.phone ||
        !this.model_student.status
      ) {
        alert("Please fill in all required fields!");
        return;
      }

      const studentId = this.$route.params.id;
      axios.put(`http://localhost:3000/students/${studentId}`, this.model_student)
        .then(() => {
          alert("Student updated successfully");
          this.$router.push('/students');
        })
        .catch(error => {
          console.error(error);
          alert("Failed to update student");
        });
    }
  }
};
</script>

<style scoped>
.is-invalid {
  border-color: red;
}
</style>
