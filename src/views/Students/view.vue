<template>
  <div class="container mt-5">
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
                  @click="removeStudent(student.id)"
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

import { studentSchema } from "@/config/studentSchema";
import { getStudents, deleteStudent } from "@/services/api";

export default {
  name: "StudentView",
  data() {
    return {
      students: [],
      studentSchema
    };
  },
  mounted() {
    this.loadStudents();
  },
  methods: {
    async loadStudents() {
      try {
        const res = await getStudents();
        this.students = res.data;
      } catch (error) {
        console.error(error);
        alert("Failed to fetch students");
      }
    },

    async removeStudent(id) {
      if (!confirm("Are you sure you want to delete this student?")) return;

      try {
        await deleteStudent(id);
        this.loadStudents();
      } catch (error) {
        console.error(error);
        alert(
          "Delete failed (mock API – delete is simulated only)"
        );
      }
    }
  }
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
