import { useState } from 'react';
import './App.scss';
import { Form } from './form/form';
import { defaultEntity, FormBuilder } from 'typesafe-form-builder';

function App() {

    /**
     * The specification to be rendered by the form builder React renderer.
     * The specification is first built using the FormBuilder's entity and select functions.
     * This demonstrates how the form builder would be used by a developer.
     * 
     * In this example the `entity` function is also given a default student object
     * and two grades. This shows that a developer can provide an already existing object
     * to the form builder, whose values can then be edited in the form.
     * Alternatively, for `entity("Course")` no data is provided. Instead, the entity function
     * will create a default `Course` object to be querried.
     */
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

    /**
     * The result property will contain a deep copy of the specification containing the
     * user's data when the submit button is pressed.
     */
    const [result, setResult] = useState(specification);
    
    /**
     * State variable used to toggle between form input and the submitted results element.
     */
    const [submitted, setSubmitted] = useState(false);

    /**
     * Called when the data in the specification is modified by the form.
     * @param newSpecification new specification object with updated data.
     */
    const onSpecificationChange = (newSpecification: typeof specification) => {
        setSpecification({...newSpecification});
    }
    
    /**
     * This is an example function to show how a developer who uses the
     * form builder might handle the submit event.
     * In the underlying form builder a deep copy of the specification is made.
     * The developer can then handle this data in their own way.
     */
    const onFormSubmitted = (newSpecification: typeof specification) => {
        console.log("su")
        setResult(newSpecification);
        setSubmitted(true);
    }

    /**
     * Used to return to the form input view when the back button in the results
     * element is pressed.
     */
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
