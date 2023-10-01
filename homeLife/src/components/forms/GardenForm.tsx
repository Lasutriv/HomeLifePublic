// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import { ErrorMessage, Form, Field, Formik } from 'formik';
import { getCorrectDomain } from '../../AppSettings';

// The base widget that builds the entire widget via other components.
function GardenForm({isGardenSubmitModal, isModelShowing}) {
    
    async function submitForm(values, setSubmitting) {
        // Call a new generic form that is an okay button.
        isGardenSubmitModal(true);
        isModelShowing(false);

        // Submit results to db
        fetch(getCorrectDomain() + '/api/usergardens/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: JSON.parse(localStorage.getItem('user')).id,
                name: values.name,
                description: values?.description,
                imageRef: values?.imageRef,
            })
        }).then(function (response) {
            console.log("Client task add request body: ", JSON.stringify({
                userId: JSON.parse(localStorage.getItem('user')).id,
                name: values.name,
                description: values?.description,
                imageRef: values?.imageRef,
            }));
            isGardenSubmitModal(false);
            
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            console.log(data);
        }).catch(function (error) {
            console.warn('Something went wrong.', error);
        });

        setSubmitting(false);
    }

    function resetForm() {
        isModelShowing(false);
    }

    return (
        <div className='form-container'>
            <Formik
                initialValues={ { name: '', description: '', iamgeRef: '' } }
                validate={ values => {
                    const errors: Partial<{name, description}> = {};
                    
                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    if (!values.description) {
                        errors.description = 'Required'
                    }

                    return errors;
                }}
                onSubmit={ (values, { setSubmitting }) => {
                    submitForm(values, setSubmitting);
                    setSubmitting(false);
                }}
                onReset={ (values) => {
                    resetForm();
                }}
            >
                { ({ isSubmitting }) => (
                    <Form>
                        <div className='form-group-background-info'>
                            <div className='field-group'>
                                <div className='form-field-title'>Name<div className='required-asterisk'>*</div></div>
                                <Field name='name' as='input' />
                                <ErrorMessage name='name' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                <div className='form-field-title'>Description<div className='required-asterisk'>*</div></div>
                                <Field name='description' as='textarea' rows='4'/>
                                <ErrorMessage name='description' component='div' className='form-error' />
                            </div>
                        </div>
                        <hr />
                        <div className='button-group'>
                            <button type='submit' disabled={ isSubmitting }>Add</button>
                            <button type='reset'>Cancel</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}


export default GardenForm;