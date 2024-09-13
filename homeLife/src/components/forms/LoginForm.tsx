// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import React, { useEffect, useState } from 'react';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { CustomPasswordField } from '../inputs/CommonInputs';
import { APIGetUserLoginResponse, ReturnPropsAPIGetUserLoginResponse } from '../../api/Common';
import { SubscriptionPlan } from '../../App';
import { useAppDispatch, useAppSelector } from '../../AppHooks';
import { _settings_non_private_routes } from '../../AppSettings';
import { setLoggedIn, setSubscriptionStatus } from '../../slices/UserSlice';

interface ILoginFormProps {
    userPlan: SubscriptionPlan;
    // setUserPlan: React.Dispatch<React.SetStateAction<UserPlan>>
}

function LoginForm(props: ILoginFormProps) {  
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [isCheckingFormErrorPlacement, setIsCheckingFormErrorPlacement] = useState(false);
    const lastLocationWhileLoggedIn = useAppSelector(state => state.users.lastLocation);
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
        // TODO: Hash the password for storage

        // Submit results to db
        const apiLoginData: ReturnPropsAPIGetUserLoginResponse = await APIGetUserLoginResponse(values.email, values.pass);
        console.log("apiLoginData: ", apiLoginData);

        // Make sure we logged in successfully via APIGetUserLoginResponse
        if ((typeof JSON.parse(localStorage.getItem('user'))?.id) == 'number') {
            // TODO: Verify user credentials match server. If not, remove the local credentials
            dispatch(setLoggedIn(true));
        } else {
            dispatch(setLoggedIn(false));
            localStorage.removeItem('user');
            // Check if current route is in _settings_non_private_routes. If not, redirect to login
            if (!_settings_non_private_routes.includes(window.location.pathname)) {
                navigate('/login');
            }
        }
        
        if (lastLocationWhileLoggedIn === "" && apiLoginData.error === "") {
            // Default navigate to dashboard if no last location is set and no errors
            // console.log("Navigate to /dashboard");
            navigate("/dashboard");
        } else {
            // console.log("Navigate to lastLocationWhileLoggedIn: ", lastLocationWhileLoggedIn);
            // Navigate to user's last location if no errors and they weren't just on the login/register page
            if (lastLocationWhileLoggedIn !== '/login' && lastLocationWhileLoggedIn !== '/register'
                && apiLoginData.error === "") {
                navigate(lastLocationWhileLoggedIn);
            }
        } 
        console.log("apiLoginData.error: ", apiLoginData.error);
        
        setErrorMessage(apiLoginData.error);

        // Set user plan        
        // props.setUserPlan({...props.userPlan, plan: apiLoginData.subscriberPlan ? apiLoginData.subscriberPlan : SubscriptionPlan.Free} as UserPlan);
        dispatch(setSubscriptionStatus(apiLoginData.subscriberPlan ? apiLoginData.subscriberPlan : SubscriptionPlan.Free));

        setSubmitting(false);
    }

    function resetForm() {
        
    }

    function handleRegisterClick() {
        navigate("/register");
    }

    function handleResetPasswordClick() {
        navigate("/pre-password-reset");
    }

    return (
        <div className='form-container-login-register'>
            <Formik
                initialValues={ { email: '', pass: '' } }
                validate={ values => {
                    setIsCheckingFormErrorPlacement(true);
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
                enableReinitialize={false}
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
                                        <Field type='email' name='email' placeholder='Email' as='input' autoFocus autoComplete='username' />
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
                                    <button id="login-btn" type='submit' disabled={ isSubmitting }>Login</button>
                                    <button id="cancel-btn" type='reset'>Cancel</button>
                                    <button id="register-btn" type="button" onClick={handleRegisterClick}>Go to Register</button>
                                    <button id="register-btn" type="button" onClick={handleResetPasswordClick}>Reset Password</button>
                                </div>
                                <div className={`error-message ${(errorMessage !== '' && errorMessage !== null) ? 'with-background' : ''}`}>
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