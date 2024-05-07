import { Formik, Field, Form } from 'formik';
import "../../assets/css/stepper/stepOne.css"

const StepOne = () => (
    <div className="card">
        <h1>My Form</h1>
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
        >
            <Form className="form-container">
                <div className="form-field">
                    <label htmlFor="firstName">First Name</label>
                    <Field id="firstName" name="firstName" placeholder="John" />
                </div>

                <div className="form-field">
                    <label htmlFor="lastName">Last Name</label>
                    <Field id="lastName" name="lastName" placeholder="Doe" />
                </div>
                
                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <Field
                        id="email"
                        name="email"
                        placeholder="john@doe.com"
                        type="email"
                    />
                </div>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    </div>
);

export default StepOne;