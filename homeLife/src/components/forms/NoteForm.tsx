// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import { ErrorMessage, Form, Field, Formik } from 'formik';
import { CustomDatePickerField } from '../inputs/CommonInputs';
import { APIPOSTNewNote } from '../../api/Common';

// The base widget that builds the entire widget via other components.
function NoteForm({pageId, isNoteSubmitModal, isModelShowing}) {
    
    async function submitForm(values, setSubmitting) {
        // Call a new generic form that is an okay button.
        isNoteSubmitModal(true);
        isModelShowing(false);

        // Submit results to db
        APIPOSTNewNote(
            JSON.parse(localStorage.getItem('user')).id,
            pageId,
            values.title,
            values.link,
            values.description,
            values.pubDate,
            values.encrypted,
            0,
            0,
            0
        );

        setSubmitting(false);
    }

    function resetForm() {
        isModelShowing(false);
    }

    return (
        <div className='form-container'>
            <Formik
                initialValues={ { pageId: pageId, title: '', link: '', description: '', pubDate: '', encrypted: false} }
                validate={ values => {
                    const errors: Partial<{pageId, title, link, description, pubDate, encrypted, x, y, z}> = {};
                    
                    if (!values.pageId) {
                        errors.pageId = 'Page ID is required. Check that a page is selected in the Notes dashboard.';
                    }
                    if (!values.title) {
                        errors.title = 'Required';
                    }
                    if (!values.link) {
                        errors.link = 'Required';
                    }
                    if (!values.description) {
                        errors.description = 'Required'
                    }
                    if (!values.pubDate) {
                        errors.pubDate = 'Required'
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
                enableReinitialize={true}  // Makes sure form has latest props passed in that are modified from parent state
            >
                { ({ isSubmitting }) => (
                    <Form>
                        <div className='form-group-background-info'>
                            <div className='field-group'>
                                <div className='form-field-title'>Title<div className='required-asterisk'>*</div></div>
                                <Field name='title' as='input' />
                                <ErrorMessage name='title' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                <div className='form-field-title'>Link<div className='required-asterisk'>*</div></div>
                                <Field name='link' as='input' />
                                <ErrorMessage name='link' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                <div className='form-field-title'>Description<div className='required-asterisk'>*</div></div>
                                <Field name='description' as='textarea' rows='4'/>
                                <ErrorMessage name='description' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                <div className='form-field-title'>Publish Date<div className='required-asterisk'>*</div></div>
                                <Field component={ CustomDatePickerField } name='pubDate' />
                                <ErrorMessage name='pubDate' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                <div className='form-field-title'>Encrypted</div>
                                <Field
                                    name="encrypted"
                                    render={({ field }) => (
                                        <>
                                            <div className="checkbox-item">
                                                <input 
                                                    {...field} id="encryptedTrue" value="true" name="encrypted" 
                                                    type="checkbox"
                                                />
                                                <label htmlFor="encryptedTrue">True</label>
                                            </div>
                                        </>
                                    )}
                                />
                                <ErrorMessage name='encrypted' component='div' className='form-error' />
                            </div>
                            <ErrorMessage name='pageId' component='div' className='form-error' />
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


export default NoteForm;