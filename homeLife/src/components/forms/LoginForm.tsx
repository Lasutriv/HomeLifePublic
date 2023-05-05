// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import React, { useState } from 'react';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { CustomPasswordField } from '../inputs/CommonInputs';
import { _settings } from '../../AppSettings';
import { APIGetUserLoginResponse, ReturnPropsAPIGetUserLoginResponse } from '../../api/Common';

function LoginForm(props) {  
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    async function submitForm(values, setSubmitting) {
        // TODO: Hash the password for storage

        // Submit results to db
        const apiLoginData: ReturnPropsAPIGetUserLoginResponse = await APIGetUserLoginResponse(values.email, values.pass);
        navigate(apiLoginData.newNavigationRoute);
        setErrorMessage(apiLoginData.errorMessage);

        setSubmitting(false);
    }

    function resetForm() {
        
    }

    return (
        <div className='form-container-login-register'>
            <Formik
                initialValues={ { email: '', pass: '' } }
                validate={ values => {
                    const errors = {
                        email: '',
                        pass: ''
                    };
                    
                    if (!values.email) {
                        errors.email = 'Required';
                      } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                      }
                    if (!values.pass) {
                        errors.pass = 'Required'
                    }

                    if (values.email && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(values.email) && values.pass) {
                        return {};
                    } else {
                        return errors;
                    }
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
                    <>
                        { isSubmitting ? (
                            <div className='loading-message'>
                                Loading
                            </div>
                        ) : (
                            <Form>
                                <div className='form-group-inputs'>
                                    <div className='field-group'>
                                        {/* <div className='form-field-title'>Email<div className='required-asterisk'>*</div></div> */}
                                        <Field type='email' name='email' placeholder='Email' as='input' autoFocus autoComplete='username'/>
                                        <ErrorMessage name='email' component='div' className='form-error' />
                                    </div>
                                    <div className='field-group'>
                                        {/* <div className='form-field-title'>Password<div className='required-asterisk'>*</div></div> */}
                                        <Field as={CustomPasswordField} name='pass' placeholder='Password' autoComplete='new-password' />
                                        <ErrorMessage name='pass' component='div' className='form-error' />
                                    </div>
                                </div>
                                <hr />
                                <div className='button-group'>
                                    <button type='submit' disabled={ isSubmitting }>Login</button>
                                    <button type='reset'>Cancel</button>
                                </div>
                                <div className='error-message'>
                                    {(errorMessage !== '' && errorMessage !== null) ? errorMessage : ''}
                                </div>
                            </Form>
                        )}
                    </>
                )}
            </Formik>
        </div>
    );
}


export default LoginForm;