// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import { useState, useEffect } from 'react';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import { CustomNumberField, CustomOTPField, CustomPasswordField } from '../inputs/CommonInputs';
import { useNavigate } from 'react-router-dom';
import { getCorrectDomain } from '../../AppSettings';
import { useAppDispatch, useAppSelector } from '../../AppHooks';
import { setHasVerifiedOTP } from '../../slices/UserSlice';

// The base widget that builds the entire widget via other components.
function PasswordResetOTPForm(props) {  
    const navigate = useNavigate();
    const [isCheckingFormErrorPlacement, setIsCheckingFormErrorPlacement] = useState(false);
    const [otpInput, setOtpInput] = useState([0, 0, 0, 0]);
    const [generatedOTP, setGeneratedOTP] = useState(0);
    const resetEmail = useAppSelector(state => state.users.resetEmail);
    const lastLocation = useAppSelector(state => state.users.lastLocationUnauthenticated);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsCheckingFormErrorPlacement(true);
        if (lastLocation !== '/pre-password-reset') {
            navigate('/pre-password-reset');
        }
        resendOTP();
    }, [])

    useEffect(() => {
        console.log("otpInput via useeffect: ", otpInput);
        
    }, [otpInput])

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
        verifyOTP([values.otpInput1, values.otpInput2, values.otpInput3, values.otpInput4]);
        setSubmitting(false);
    }

    function resetForm() {
        navigate('/pre-password-reset');
    }

    function generateOTP() {
        // Generate one time password below
        let otp = Math.floor(1000 + Math.random() * 9000);
        setGeneratedOTP(otp);
        console.log("OTP: ", otp);
        
        return otp;
    }

    function verifyOTP(otpInput: number[]) {
        // Join otpInput array into a string and compare to generatedOTP
        console.log('Comparing OTP: ', parseInt(otpInput.join('')), ' to generatedOTP: ', generatedOTP);
        console.log('OTP Input type of string: ', typeof parseInt(otpInput.join('')));
        console.log('Generated otp type of number: ', typeof generatedOTP);
        
             
        if (parseInt(otpInput.join('')) == generatedOTP) {
            console.log("OTP Verified");
            dispatch(setHasVerifiedOTP(true));
            navigate('/password-reset');
        } else {
            console.log("OTP Not Verified");
        }
    }

    function resendOTP() {
        // Submit results to db
        fetch(getCorrectDomain() + '/api/reset/send-email', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: resetEmail,
                otp: generateOTP()
            })
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            console.log("OTP Successfully sent to email: ", resetEmail);
            console.log(JSON.stringify(data));
        }).catch(function (error) {
            console.warn('Something went wrong.', error);
        });
    }

    return (
        <div className='form-container-login-register'>
            <Formik
                initialValues={ { otpInput1: 0, otpInput2: 0, otpInput3: 0, otpInput4: 0} }
                validate={ values => {
                    setIsCheckingFormErrorPlacement(true);
                    const errors: Partial<{otpInput1, otpInput2, otpInput3, otpInput4}> = {};
                    
                    // Verify OTP fields are filled out
                    if (!values.otpInput1) {
                        errors.otpInput1 = 'Required';
                    }
                    if (!values.otpInput2) {
                        errors.otpInput2 = 'Required';
                    }
                    if (!values.otpInput3) {
                        errors.otpInput3 = 'Required';
                    }
                    if (!values.otpInput4) {
                        errors.otpInput4 = 'Required';
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
                        <div className='form-group-inputs otp-inputs'>
                            <div className='otp-container'>
                                <p>A one time password has been sent to your email.</p>
                                <p>Please check your spam folder.</p>
                                <div className='field-group'>
                                    <Field 
                                        component={ CustomOTPField } 
                                        name='otpInput1' 
                                    />
                                    <ErrorMessage name='otpInput1' component='div' />
                                </div>
                                <div className='field-group'>
                                    <Field 
                                        component={ CustomOTPField } 
                                        name='otpInput2' 
                                    />
                                    <ErrorMessage name='otpInput2' component='div' />
                                </div>
                                <div className='field-group'>
                                    <Field 
                                        component={ CustomOTPField } 
                                        name='otpInput3' 
                                    />
                                    <ErrorMessage name='otpInput3' component='div' />
                                </div>
                                <div className='field-group'>
                                    <Field 
                                        component={ CustomOTPField } 
                                        name='otpInput4' 
                                    />
                                    <ErrorMessage name='otpInput4' component='div' />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='button-group'>
                            <button type='submit' disabled={ isSubmitting }>Confirm</button>
                            <button type='reset'>Cancel</button>
                            <button id="register-btn" type="button" onClick={resendOTP}>Send OTP</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}


export default PasswordResetOTPForm;