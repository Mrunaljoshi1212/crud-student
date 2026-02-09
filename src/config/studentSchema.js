export const studentSchema = [
    {
        key: "name",
        label: "Name",
        type: "text",
        required: true
    },
    {
        key: "email",
        label: "Email",
        type: "email",
        required: true
    },
    {
        key: "phone",
        label: "Phone",
        type: "tel",
        required: true
    },
    {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Active", "Inactive"],
        required: true
    },
    {
        key: "dob",
        label: "Date of Birth",
        type: "date",
        required: false
    },
    {
        key: "address",
        label: "Address",
        type: "text",
        required: false
    }
];
