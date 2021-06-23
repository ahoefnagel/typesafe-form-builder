import { useState } from 'react';
import './App.scss';
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
    
    const [submitted, setSubmitted] = useState(false);

    const onSpecificationChange = (newSpecification: typeof specification) => {
        setSpecification({...newSpecification});
    }
    
    const onFormSubmitted = (newSpecification: typeof specification) => {
        console.log("su")
        setResult(newSpecification);
        setSubmitted(true);
    }

    const onBackButton = () => setSubmitted(false);

    return (
        <div id="form-builder-example" data-submitted={submitted}>
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

            <section className="result">
                <h1>Form Submitted!</h1>
                <p>
                    These are the submitted results of the form.
                    <br/><br/>
                    When the submit button is clicked, a deep copy of the specification is made.
                    <br/>
                    This copy is seen here.
                    <br/><br/>
                    A developer using the form builder can choose how to handle these results.
                    <br/>
                    For example, sending them to a back-end endpoint.
                    <br/>
                    Right now, the results are simply displayed here.
                </p>
                <h3>Submitted Form Data</h3>
                <pre>{JSON.stringify(result, null, 2)}</pre>
                <input type="button" value="Back" onClick={onBackButton}></input>
            </section>
        </div>
    );
}

export default App;
