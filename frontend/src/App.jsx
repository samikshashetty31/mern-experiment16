import { useEffect, useState } from "react";

function App() {

    const [students, setStudents] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/api/students")
            .then(response => response.json())
            .then(data => {
                setStudents(data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);

    return (
        <div className="container">

            <h1>MERN Student Management</h1>

            <p>
                Student data fetched from MongoDB
            </p>

            <div className="students">

                {students.map(student => (

                    <div className="card" key={student._id}>

                        <h2>{student.name}</h2>

                        <p>
                            <strong>Course:</strong> {student.course}
                        </p>

                        <p>
                            <strong>Year:</strong> {student.year}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default App;