// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import { useState, useEffect } from 'react';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import { CustomPasswordField } from '../inputs/CommonInputs';
import { useNavigate } from 'react-router-dom';
import { getCorrectDomain } from '../../AppSettings';
import { useAppDispatch, useAppSelector } from '../../AppHooks';
import { setResetEmail } from '../../slices/UserSlice';

// The base widget that builds the entire widget via other components.
function PasswordPreResetForm(props) {  
    const navigate = useNavigate();
    const [isCheckingFormErrorPlacement, setIsCheckingFormErrorPlacement] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsCheckingFormErrorPlacement(true);
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
        dispatch(setResetEmail(values.email));
        navigate('/password-reset-otp');
    }

    function resetForm() {
        
    }

    return (
        <div className='form-container-login-register'>
            <Formik
                initialValues={ { email: ''} }
                validate={ values => {
                    setIsCheckingFormErrorPlacement(true);
                    const errors: Partial<{email, pass, firstName, lastName}> = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
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
                            <div className='pre-password-reset-header'>
                                <p>Enter email for a one time password to reset your current password</p>
                            </div>
                            <div className='field-group'>
                                {/* <div className='form-field-title'>Email<div className='required-asterisk'>*</div></div> */}
                                <Field type="email" name='email' placeholder="Email" as='input' autoFocus autoComplete="username" />
                                <ErrorMessage name='email' component='div' className='form-error' />
                            </div>
                        </div>
                        <hr />
                        <div className='button-group'>
                            <button type='submit' disabled={ isSubmitting }>Get OTP</button>
                            <button type='reset'>Cancel</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}


export default PasswordPreResetForm;