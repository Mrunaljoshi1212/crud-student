<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Edit Student</h4>
      </div>

      <div class="card-body">
        <div
          class="mb-3"
          v-for="field in studentSchema"
          :key="field.key"
        >
          <label>
            {{ field.label }}
            <span v-if="field.required" class="text-danger">*</span>
          </label>

          <input
            :type="field.type || 'text'"
            v-model="student[field.key]"
            class="form-control"
            :class="showError && field.required && !student[field.key]
              ? 'is-invalid'
              : ''"
          />
        </div>

        <button class="btn btn-primary" @click="updateStudent">
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import { studentSchema } from "@/config/studentSchema";
import { getStudentById, updateStudent } from "@/services/api";

export default {
  name: "StudentEdit",
  data() {
    return {
      student: {},
      studentSchema,
      showError: false
    };
  },
  mounted() {
    this.loadStudent();
  },
  methods: {
    async loadStudent() {
      try {
        const res = await getStudentById(this.$route.params.id);
        this.student = res.data;
      } catch (error) {
        console.error(error);
        alert("Student not found");
      }
    },

    async updateStudent() {
      this.showError = true;

      const invalid = this.studentSchema.some(
        field => field.required && !this.student[field.key]
      );

      if (invalid) {
        alert("Please fill all required fields");
        return;
      }

      try {
        await updateStudent(this.$route.params.id, this.student);
        alert("Student updated successfully");
        this.$router.push("/students");
      } catch (error) {
        console.error(error);
        alert("Failed to update student");
      }
    }
  }
};
</script>

<style scoped>
.is-invalid {
  border-color: red;
}
</style>
