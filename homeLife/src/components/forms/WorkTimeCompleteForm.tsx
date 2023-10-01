// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a complete work time entry.

import { ErrorMessage, Form, Field, Formik } from 'formik';
import { CustomDatePickerField, CustomTimePickerField } from '../inputs/CommonInputs';
import moment from 'moment';
import { getCorrectDomain } from '../../AppSettings';

// Form to take in complete user input info and submit to api
function WorkTimeCompleteForm({isClockCompleteSubmitModal, isModelShowing}) {
    async function submitForm(values, setSubmitting) {
        console.log("dayOfWork moment: ", moment(new Date(values.dayOfWork)));
        // Submit results to db
        fetch(getCorrectDomain() + '/api/worktimes/clockcomplete', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: JSON.parse(localStorage.getItem('user')).id,
                clockInTime: values.clockInTime,
                clockOutTime: values.clockOutTime,
                hasTakenBreak: (values.hasTakenBreak === "false"),
                dayOfWork: moment(new Date(values.dayOfWork)).format("MM-DD-YYYY"),
            })
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            isClockCompleteSubmitModal(true);
            isModelShowing(false);
            console.log(JSON.stringify(data));
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
                initialValues={ { clockInTime: '', clockOutTime: '', hasTakenBreak: 'false', dayOfWork: '' } }
                validate={ values => {
                    const errors: Partial<any> = {};
                    
                    if (!values.clockInTime) {
                        errors.clockInTime = 'Required'
                    }
                    if (!values.clockOutTime) {
                        errors.clockOutTime = 'Required';
                    }
                    if (!values.dayOfWork) {
                        errors.dayOfWork = 'Required';
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
                        <div className='form-group-inputs'>
                            <div className='field-group'>
                                <div className='form-field-title'>Clock In Time</div>
                                <Field component={ CustomTimePickerField } name='clockInTime' />
                                <ErrorMessage name='clockInTime' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                <div className='form-field-title'>Clock Out Time</div>
                                <Field component={ CustomTimePickerField } name='clockOutTime' />
                                <ErrorMessage name='clockOutTime' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                <div className='form-field-title'>Have Taken Break</div>
                                <Field
                                    name="hasTakenBreak"
                                    render={({ field }) => (
                                        <>
                                            <div className="checkbox-item">
                                                <input 
                                                    {...field} id="reminderTrue" value="true" name="hasTakenBreak" 
                                                    type="checkbox"
                                                />
                                                <label htmlFor="reminderTrue">True</label>
                                            </div>
                                        </>
                                    )}
                                />
                                <ErrorMessage name='hasTakenBreak' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                <div className='form-field-title'>Day of Work<div className='required-asterisk'>*</div></div>
                                <Field component={ CustomDatePickerField } name='dayOfWork' />
                                <ErrorMessage name='dayOfWork' component='div' className='form-error' />
                            </div>
                        </div>
                        <hr />
                        <div className='button-group'>
                            <button type='submit' disabled={ isSubmitting }>Submit</button>
                            <button type='reset'>Cancel</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}


export default WorkTimeCompleteForm;