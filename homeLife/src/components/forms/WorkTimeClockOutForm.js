// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a partial work time entry.

import React, { useState, useEffect } from 'react';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import { CustomDatePickerField, CustomTimePickerField, CustomSelectField, CustomPasswordField } from '../inputs/CommonInputs.js';
import moment from 'moment';
import { getCorrectDomain } from '../../AppSettings';

// Form to take in user input clock out info and submit to api
function WorkTimeClockOutForm({isClockOutSubmitModal, isModelShowing}) {
    async function submitForm(values, setSubmitting) {
        // Submit results to db
        fetch(getCorrectDomain() + '/api/worktimes/clockout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: JSON.parse(localStorage.getItem('user')).id,
                clockOutTime: values.clockOutTime,
                dayOfWork: moment(new Date(values.dayOfWork)).format("MM-DD-YYYY"),
            })
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            isClockOutSubmitModal(true);
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
                initialValues={ { clockOutTime: '', dayOfWork: '' } }
                validate={ values => {
                    const errors = {};
                    
                    if (!values.clockOutTime) {
                        errors.clockOutTime = 'Required'
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
                                <div className='form-field-title'>Clock Out Time</div>
                                <Field component={ CustomTimePickerField } name='clockOutTime' />
                                <ErrorMessage name='clockOutTime' component='div' className='form-error' />
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


export default WorkTimeClockOutForm;