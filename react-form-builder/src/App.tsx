import { useState } from 'react';
import './App.css';
import { Form } from './form/form';
import { defaultEntity, FormBuilder } from 'typesafe-form-builder';

function App() {

    const [specification, setSpecification] = useState(
        FormBuilder
        .entity("Student", 
            q => q.select("name", "surname", "birthday")
                .children("grades", q => q.select("grade")
                    .child("course", q => q.select("name"))
                ),
                {
                    ...defaultEntity("Student"),
                    grades: [defaultEntity("Grades"), defaultEntity("Grades")]
                }
            )
        .entity("Course", 
            q => q.select("name", "studyPoints", "active"))
        .specification
    );

    const [result, setResult] = useState(specification);

    const onSpecificationChange = (newSpecification: typeof specification) => {
        setSpecification({...newSpecification});
    }
    
    const onFormSubmitted = (newSpecification: typeof specification) => setResult(newSpecification);

    return (
        <>
            <section className="main">
                <h1>Form</h1>
                <Form 
                    specification={specification}
                    onSpecificationChange={onSpecificationChange}
                    onSubmit={onFormSubmitted}
                />
            </section>

            <section className="main">
                <h1>Specification</h1>
                <p className="description">
                    This is a live view of the specification object.
                    <br/>
                    When values in the form are changed they are also updated in this object.
                </p>
                <pre>{JSON.stringify(specification, null, 2)}</pre>
            </section>

            <section className="main">
                <h1>Submitted Result</h1>
                <p className="description">
                    These are the submitted results of the form.
                    <br/>
                    When the submit button is clicked, a deep copy of the specification is made.
                    The last copy that was made is seen here.
                </p>
                <pre>{JSON.stringify(result, null, 2)}</pre>
            </section>
        </>
    );
}

export default App;
