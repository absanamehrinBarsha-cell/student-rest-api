const express = require("express");
const app = express();
app.use(express.json());
let students = [
    {
        id: 1,
        name: "mehrin",
        email: "mehrin@example.com",
        department: "CSE"
    },
    {
        id: 2,
        name: "barsha",
        email: "barsha@example.com",
        department: "EEE"
    }
];
app.get("/", (req, res) => {
    res.send("Student Management REST API is running!");
});
app.get("/students", (req, res) => {
    res.json(students);
});
app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }
    res.json(student);
});
app.post("/students", (req, res) => {
    console.log("Received body:", req.body);

    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        email: req.body.email,
        department: req.body.department
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});
app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
   const student = students.find(student => student.id === id);
    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }
    student.name = req.body.name;
    student.email = req.body.email;
    student.department = req.body.department;
    res.json(student);
});
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const studentIndex = students.findIndex(student => student.id === id);
    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }
    students.splice(studentIndex, 1);
    res.json({
        message: "Student deleted successfully"
    });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});