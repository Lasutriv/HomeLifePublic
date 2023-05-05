// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import React, { useState, useEffect } from 'react';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import { CustomDatePickerField, CustomTimePickerField, CustomSelectField } from '../inputs/CommonInputs.js';
import _settings from '../../AppSettings';
import { APIGetUsers, APIPostNewBill, APIPostNewSharedBill, IUserFromUsersList } from '../../api/Common';

interface IFormBillErrorProps {
    billName: string,
    description: string,
    amount: string,
    dueDate: string
}

// The base widget that builds the entire widget via other components.
function BillForm({isBillSubmitModal, isModelShowing}) {
    const [isSharingBill, setIsSharingBill] = useState(false);
    const [reminderCount, setReminderCount] = useState(0);
    const [optionsUsers, setOptionsUsers] = useState([]);
    let optionsReminder = [{value: 0, label: 0}, {value: 1, label: 1}, {value: 2, label: 2}, {value: 3, label: 3}];
    
    useEffect(() => {
        if (isSharingBill) {
            getUsersFieldForShareBill();
        }
    }, [isSharingBill])

    useEffect(() => {
        console.log('Options - Users - Has Changed: ', optionsUsers);
        
    }, optionsUsers)

    async function submitForm(values, setSubmitting) {
        console.log('Submitting bill entry: ', values);
        // Call a new generic form that is an okay button.
        isBillSubmitModal(true);
        isModelShowing(false);

        // Submit results to db
        const newBillData = await APIPostNewBill(values);
        console.log('New bill data: ', newBillData);

        // TOOD: Submit isbillshared record so the other user can see the bill
        console.log('Share bill submit value: ', (values.shareBill == "false"));
        
        if ((values.shareBill == "false") == true) {
            APIPostNewSharedBill({
                billId: newBillData[0].insertedData.id,
                shareBill: (values.shareBill == "false"),
                userIdA: JSON.parse(localStorage.getItem('user')).id,
                userIdB: values.shareWithUser.value
            })
        }

        setSubmitting(false);
    }

    function resetForm() {
        isModelShowing(false);
    }

    function getReminderFields(number) {
        const reminderFields = [];

        for (let i = 0; i < reminderCount; i++) {
            const dueDateName = 'dueDate-' + i;
            const dueTimeName = 'dueTime-' + i;

            reminderFields.push(
                <div className='field-group'>
                    <div className='form-field-title'>Reminder #{i + 1}<div className='required-asterisk'>*</div></div>
                    <div className='field-group'>
                        <div className='form-field-title'>Due Date<div className='required-asterisk'>*</div></div>
                        <Field component={ CustomDatePickerField } name={dueDateName} />
                        <ErrorMessage name={dueDateName} component='div' className='form-error' />
                    </div>
                    <div className='field-group'>
                        <div className='form-field-title'>Due Time</div>
                        <Field component={ CustomTimePickerField } name={dueTimeName} />
                    </div>
                </div>
            );
        }

        return reminderFields;
    }

    async function getUsersFieldForShareBill() {
        // Get users from db and map their id with an options dropdown
        let userList = []
        const userData = await APIGetUsers();
        console.log(userData);
        
        // Map user data to a new options list
        userData.users.map((user: IUserFromUsersList) => {
            // Don't allow the user to share with themselves
            if (user.id !== JSON.parse(localStorage.getItem('user')).id) {
                userList.push({value: user.id, label: user.firstName + ' ' + user.lastName});
            }
        });

        // Store new user list as our options list
        setOptionsUsers(userList);
    }

    return (
        <div className='form-container'>
            <Formik
                initialValues={ { billName: '', description: '', amount: 0, reminder: 'false', autopay: 'false', 
                                  dueDate: '', shareBill: 'false', shareWithUser: {value: 0, label: 0}, 
                                  numReminders: {value: 0, label: 0} } }
                validate={ values => {
                    console.log('Validating values: ', values);
                    
                    const errors: IFormBillErrorProps = {
                        billName: '',
                        description: '',
                        amount: '',
                        dueDate: '',
                    };
                    
                    if (!values.billName) {
                        errors.billName = 'Required';
                    }
                    if (!values.description) {
                        errors.description = 'Required'
                    }
                    if (values.amount <= 0) {
                        errors.amount = 'Larger than 0$'
                    }
                    if (!values.dueDate) {
                        errors.dueDate = 'Required';
                    }
                    
                    if (values.billName && values.description && values.dueDate && values.amount > 0) {
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
                    <Form>
                        <div className='form-group-background-info'>
                            <div className='field-group'>
                                <div className='form-field-title'>Bill Name<div className='required-asterisk'>*</div></div>
                                <Field name='billName' as='input' />
                                <ErrorMessage name='billName' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                <div className='form-field-title'>Description<div className='required-asterisk'>*</div></div>
                                <Field name='description' as='textarea' />
                                <ErrorMessage name='description' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                <div className='form-field-title'>Amount<div className='required-asterisk'>*</div></div>
                                <Field name='amount' as='input' />
                                <ErrorMessage name='amount' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                <div className='form-field-title'>Reminder</div>
                                <Field
                                    name="reminder"
                                    render={({ field }) => (
                                        <>
                                            <div className="checkbox-item">
                                                <input 
                                                    {...field} id="reminderTrue" value="true" name="reminder" 
                                                    type="checkbox"
                                                />
                                                <label htmlFor="reminderTrue">True</label>
                                            </div>
                                        </>
                                    )}
                                />
                                <ErrorMessage name='reminder' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                <div className='form-field-title'>Autopay</div>
                                <Field
                                    name="autopay"
                                    render={({ field }) => (
                                        <>
                                            <div className="checkbox-item">
                                                <input 
                                                    {...field} id="reminderTrue" value="true" name="autopay" 
                                                    type="checkbox"
                                                />
                                                <label htmlFor="reminderTrue">True</label>
                                            </div>
                                        </>
                                    )}
                                />
                                <ErrorMessage name='autopay' component='div' className='form-error' />
                            </div>
                            <div className='form-subgroup flex-100'>
                                <div className='form-subgroup flex-100'>
                                    <div className='field-group'>
                                        <div className='form-field-title'>Due Date<div className='required-asterisk'>*</div></div>
                                        <Field component={ CustomDatePickerField } name='dueDate' />
                                        <ErrorMessage name='dueDate' component='div' className='form-error' />
                                    </div>
                                    <div className='field-group'>
                                        <div className='form-field-title'>Share this bill?</div>
                                        <Field
                                            name="shareBill"
                                            render={({ field }) => (
                                                <>
                                                    <div className="checkbox-item">
                                                        <input 
                                                            {...field} 
                                                            id="shareBillTrue" 
                                                            value="true" 
                                                            name="shareBill" 
                                                            type="checkbox"
                                                            onChange={(value) => {
                                                                setIsSharingBill(value.target.checked);
                                                            }}
                                                        />
                                                        <label htmlFor="shareBillTrue">True</label>
                                                    </div>
                                                </>
                                            )}
                                        />
                                        <ErrorMessage name='shareBill' component='div' className='form-error' />
                                    </div>
                                    {isSharingBill ? (
                                        <>
                                            <div className='field-group'>
                                                <div className='form-field-title'>with who<div className='required-asterisk'>*</div></div>
                                                <Field 
                                                    component={ CustomSelectField } 
                                                    name='shareWithUser' 
                                                    options={ optionsUsers } 
                                                    onChangeCallback={(value) => {
                                                        console.log('Share With User Value: ', value);
                                                    }}
                                                />
                                                <ErrorMessage name='shareWithUser' component='div' />
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <div className='field-group'>
                                        <div className='form-field-title'>Number of Reminders<div className='required-asterisk'>*</div></div>
                                        <Field 
                                            component={ CustomSelectField } 
                                            name='numReminders' 
                                            options={ optionsReminder } 
                                            onChangeCallback={(value) => {
                                                setReminderCount(value.value);
                                            }}
                                        />
                                        <ErrorMessage name='numReminders' component='div' />
                                    </div>
                                    {reminderCount > 0 ? (
                                        getReminderFields(reminderCount)
                                    ) : (
                                        <></>
                                    )}
                                </div>
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


export default BillForm;