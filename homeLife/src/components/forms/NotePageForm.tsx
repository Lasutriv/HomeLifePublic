// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import { ErrorMessage, Form, Field, Formik } from 'formik';
import { APIPOSTNewNotePage } from '../../api/Common';

// The base widget that builds the entire widget via other components.
function NotePageForm({isNoteSubmitModal, isModelShowing}) {
    
    async function submitForm(values: { title: any; pageId?: number; }, setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void; }) {
        // Call a new generic form that is an okay button.
        isNoteSubmitModal(true);
        isModelShowing(false);

        // Submit results to db
        APIPOSTNewNotePage(
            JSON.parse(localStorage.getItem('user')).id,
            values.title,
        );

        setSubmitting(false);
    }

    function resetForm() {
        isModelShowing(false);
    }

    return (
        <div className='form-container'>
            <Formik
                initialValues={ { title: '' } }
                validate={ values => {
                    const errors: Partial<{title: string}> = {};

                    if (!values.title) {
                        errors.title = 'Required';
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
                                <div className='form-field-title'>Title<div className='required-asterisk'>*</div></div>
                                <Field name='title' as='input' />
                                <ErrorMessage name='title' component='div' className='form-error' />
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


export default NotePageForm;