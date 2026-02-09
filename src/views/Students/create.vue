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

                    <!-- INPUT -->
                    <input
                        v-if="field.type !== 'select'"
                        :type="field.type"
                        v-model="student[field.key]"
                        :class="[
                            'form-control',
                            showError && field.required && !student[field.key]
                                ? 'is-invalid'
                                : ''
                        ]"
                    />

                    <!-- SELECT -->
                    <select
                        v-else
                        v-model="student[field.key]"
                        :class="[
                            'form-control',
                            showError && field.required && !student[field.key]
                                ? 'is-invalid'
                                : ''
                        ]"
                    >
                        <option value="">Select {{ field.label }}</option>
                        <option
                            v-for="opt in field.options"
                            :key="opt"
                            :value="opt"
                        >
                            {{ opt }}
                        </option>
                    </select>
                </div>

                <button class="btn btn-primary" @click="saveStudent">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { studentSchema } from "@/config/studentSchema";

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
        saveStudent() {
            this.showError = true;

            const invalid = this.studentSchema.some(
                field => field.required && !this.student[field.key]
            );

            if (invalid) {
                alert("Please fill all required fields");
                return;
            }

            axios
                .post("http://localhost:3000/students", this.student)
                .then(() => {
                    alert("Student added successfully");

                    Object.keys(this.student).forEach(
                        key => (this.student[key] = "")
                    );

                    this.showError = false;
                    this.$router.push("/students");
                })
                .catch(() => {
                    alert("Failed to add student");
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
