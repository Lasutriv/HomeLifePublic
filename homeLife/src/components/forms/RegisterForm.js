// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import React, { useState, useEffect } from 'react';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import { CustomDatePickerField, CustomTimePickerField, CustomSelectField, CustomPasswordField } from '../inputs/CommonInputs.js';
import { useNavigate } from 'react-router-dom';
import { getCorrectDomain } from '../../AppSettings';

// The base widget that builds the entire widget via other components.
function RegisterForm(props) {  
    const navigate = useNavigate();
    async function submitForm(values, setSubmitting) {
        // TODO: Hash the password for storage

        // Submit results to db
        fetch(getCorrectDomain() + '/api/users/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: values.email,
                passHash: values.pass,
                firstName: values.firstName,
                lastName: values.lastName,
            })
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            navigate('/login')
            console.log(JSON.stringify(data));
        }).catch(function (error) {
            console.warn('Something went wrong.', error);
        });

        setSubmitting(false);
    }

    function resetForm() {
        
    }

    return (
        <div className='form-container-login-register'>
            <Formik
                initialValues={ { email: '', pass: '', firstName: '', lastName: '' } }
                validate={ values => {
                    const errors = {};
                    
                    if (!values.email) {
                        errors.email = 'Required';
                      } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                      }
                    if (!values.pass) {
                        errors.pass = 'Required'
                    }
                    if (!values.firstName) {
                        errors.firstName = 'Required';
                    }
                    if (!values.lastName) {
                        errors.lastName = 'Required';
                    }

                    return errors;
                }}
                onSubmit={ (values, { setSubmitting }) => {
                    console.log("Register form values: ", values);
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
                                {/* <div className='form-field-title'>Email<div className='required-asterisk'>*</div></div> */}
                                <Field type="email" name='email' placeholder="Email" as='input' autoFocus autoComplete="username" />
                                <ErrorMessage name='email' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                {/* <div className='form-field-title'>Password<div className='required-asterisk'>*</div></div> */}
                                <Field as={CustomPasswordField} name="pass" placeholder="Password" autoComplete="new-password" />
                                <ErrorMessage name='passHash' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                {/* <div className='form-field-title'>First Name<div className='required-asterisk'>*</div></div> */}
                                <Field name='firstName' placeholder='First name' as='input' />
                                <ErrorMessage name='firstName' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                {/* <div className='form-field-title'>Last Name<div className='required-asterisk'>*</div></div> */}
                                <Field name='lastName' placeholder='Last name' as='input' />
                                <ErrorMessage name='lastName' component='div' className='form-error' />
                            </div>
                        </div>
                        <hr />
                        <div className='button-group'>
                            <button type='submit' disabled={ isSubmitting }>Create</button>
                            <button type='reset'>Cancel</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}


export default RegisterForm;