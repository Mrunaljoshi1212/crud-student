<template>
  ...
</template>

<script>
import axios from "axios";
import { studentSchema } from "@/config/studentSchema";

const API_URL = import.meta.env.VITE_API_URL;

export default {
  name: "studentsCreate",
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
        await axios.post(`${API_URL}/students`, this.student);
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
