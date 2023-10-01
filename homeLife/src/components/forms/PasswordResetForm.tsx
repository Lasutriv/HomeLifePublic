// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import { useState, useEffect } from 'react';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import { CustomPasswordField } from '../inputs/CommonInputs';
import { useNavigate } from 'react-router-dom';
import { getCorrectDomain } from '../../AppSettings';
import { useAppSelector } from '../../AppHooks';

// The base widget that builds the entire widget via other components.
function PasswordResetForm(props) {  
    const navigate = useNavigate();
    const [isCheckingFormErrorPlacement, setIsCheckingFormErrorPlacement] = useState(false);
    const resetEmail = useAppSelector(state => state.users.resetEmail);
    const hasVerifiedOTP = useAppSelector(state => state.users.hasVerifiedOTP);
    const previousPage = useAppSelector(state => state.users.lastLocationUnauthenticated);

    useEffect(() => {
        setIsCheckingFormErrorPlacement(true);
        // Check window history to make sure user went to this page from the password reset otp page
        if (previousPage !== '/password-reset-otp') {
            navigate('/pre-password-reset');
        }
    }, [])

    useEffect(() => {
        // Get form error element and change position
        let formErrorElements = document.getElementsByClassName('form-error');
        if (formErrorElements.length > 0) {
            // Loop
            for (let i = 0; i < formErrorElements.length; i++) {
                // Get form error element's width
                let formErrorElementWidth = formErrorElements[i].clientWidth;
                // Set form error element's left position
                let formErrorStyle = 'left: -' + (10 + formErrorElementWidth) + 'px;';
                // Set form error element's style
                formErrorElements[i].setAttribute('style', formErrorStyle);
            }
            console.log("formErrorElements: ", formErrorElements);
            
        }

        setIsCheckingFormErrorPlacement(false);
    }, [isCheckingFormErrorPlacement])

    async function submitForm(values, setSubmitting) {
        // TODO: Hash the password for storage
        if (hasVerifiedOTP) {
            // Submit results to db
            fetch(getCorrectDomain() + '/api/users/update-password', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: values.email,
                    passHash: values.pass,
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
        } else {
            alert('Please verify your OTP first.');
        }

        setSubmitting(false);
    }

    function resetForm() {
        
    }

    function handleLoginClick() {
        navigate('/login');
    }


    return (
        <div className='form-container-login-register'>
            <Formik
                initialValues={ { email: '', pass: '', pass2: ''} }
                validate={ values => {
                    setIsCheckingFormErrorPlacement(true);
                    const errors: Partial<{email, pass, firstName, lastName}> = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.pass) {
                        errors.pass = 'Required'
                    }
                    if (!values.pass2) {
                        errors.pass = 'Required'
                    }
                    if (values.pass !== values.pass2) {
                        errors.pass = 'Passwords do not match'
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
                                {/* <div className='form-field-title'>Password<div className='required-asterisk'>*</div></div> */}
                                <Field as={CustomPasswordField} name="pass2" placeholder="Password" autoComplete="new-password" />
                                <ErrorMessage name='passHash2' component='div' className='form-error' />
                            </div>
                        </div>
                        <hr />
                        <div className='button-group'>
                            <button type='submit' disabled={ isSubmitting }>Confirm</button>
                            <button type='reset'>Cancel</button>
                            <button type='button' onClick={ handleLoginClick }>Go to Login</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}


export default PasswordResetForm;