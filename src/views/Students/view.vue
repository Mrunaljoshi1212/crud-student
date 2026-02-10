<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>
          Students
          <RouterLink
            to="/students/create"
            class="btn btn-primary float-end"
          >
            Add Student
          </RouterLink>
        </h4>
      </div>

      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <!-- Schema based headers -->
              <th v-for="field in studentSchema" :key="field.key">
                {{ field.label }}
              </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody v-if="students.length">
            <tr v-for="(student, index) in students" :key="student.id">
              <!-- Schema based cells -->
              <td v-for="field in studentSchema" :key="field.key">
                {{ student[field.key] }}
              </td>

              <td>
                <RouterLink
                  :to="`/students/${student.id}/edit`"
                  class="btn btn-success btn-sm mx-1"
                >
                  Edit
                </RouterLink>

                <button
                  class="btn btn-danger btn-sm mx-1"
                  @click="deleteStudent(student.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr>
              <td :colspan="studentSchema.length + 1" class="text-center">
                No students found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { studentSchema } from "@/config/studentSchema";

const API_URL = import.meta.env.VITE_API_URL;

export default {
  name: "StudentView",
  data() {
    return {
      students: [],
      studentSchema
    };
  },
  mounted() {
    this.getStudents();
  },
  methods: {
    async getStudents() {
      try {
        const res = await axios.get(`${API_URL}/students`);
        this.students = res.data;
      } catch (error) {
        console.error(error);
        alert("Failed to fetch students");
      }
    },

    async deleteStudent(id) {
      if (!confirm("Are you sure you want to delete this student?")) return;

      try {
        await axios.delete(`${API_URL}/students/${id}`);
        this.getStudents();
      } catch (error) {
        console.error(error);
        alert("Failed to delete student");
      }
    }
  }
};
</script>
