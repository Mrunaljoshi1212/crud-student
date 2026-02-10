<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Add Student</h4>
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

        <button class="btn btn-primary" @click="saveStudent">
          Save
        </button>
      </div>
    </div>
  </div>
</template>


<script>

import { studentSchema } from "@/config/studentSchema";
import { createStudent } from "@/services/api";

export default {
  name: "StudentCreate",
  data() {
    const student = {};
    studentSchema.forEach(field => {
      student[field.key] = "";
    });

    return {
      student,
      studentSchema,
      showError: false
    };
  },
  methods: {
    async saveStudent() {
      this.showError = true;

      const invalid = this.studentSchema.some(
        field => field.required && !this.student[field.key]
      );

      if (invalid) {
        alert("Please fill all required fields");
        return;
      }

      try {
        await createStudent(this.student);
        alert("Student added successfully");
        this.$router.push("/students");
      } catch (error) {
        console.error(error);
        alert("Failed to add student");
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
