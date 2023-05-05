// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import React, { useState, useEffect } from 'react';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import { CustomDatePickerField, CustomTimePickerField, CustomSelectField } from '../inputs/CommonInputs.js';
import { getCorrectDomain } from '../../AppSettings';

// The base widget that builds the entire widget via other components.
function TaskForm({isTaskSubmitModal, isModelShowing}) {
    const [reminderCount, setReminderCount] = useState(0);
    let optionsReminder = [{value: 0, label: 0}, {value: 1, label: 1}, {value: 2, label: 2}, {value: 3, label: 3}];
    
    async function submitForm(values, setSubmitting) {
        // Call a new generic form that is an okay button.
        isTaskSubmitModal(true);
        isModelShowing(false);

        // Submit results to db
        fetch(getCorrectDomain() + '/api/tasks/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: JSON.parse(localStorage.getItem('user')).id,
                title: values.taskName,
                description: values.description,
                reminder: (values.reminder == "false"),
                dueDate: JSON.stringify(values.dueDate).replaceAll('"', ''),
                dueTime: values.dueTime,
                reminderDueDate0: values['dueDate-0'],
                reminderDueDate1: values['dueDate-1'],
                reminderDueDate2: values['dueDate-2'],
                reminderDueTime0: values['dueTime-0'],
                reminderDueTime1: values['dueTime-1'],
                reminderDueTime2: values['dueTime-2'],
            })
        }).then(function (response) {
            console.log("Client task add request body: ", JSON.stringify({
                userId: JSON.parse(localStorage.getItem('user')).id,
                title: values.taskName,
                description: values.description,
                reminder: (values.reminder == "false"), 
                dueDate: JSON.stringify(values.dueDate).replaceAll('"', ''),
                dueTime: values.dueTime,
                reminderDueDate0: values['dueDate-0'],
                reminderDueDate1: values['dueDate-1'],
                reminderDueDate2: values['dueDate-2'],
                reminderDueTime0: values['dueTime-0'],
                reminderDueTime1: values['dueTime-1'],
                reminderDueTime2: values['dueTime-2'],
            }));
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            console.log(data);
        }).catch(function (error) {
            console.warn('Something went wrong.', error);
        });

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

    return (
        <div className='form-container'>
            <Formik
                initialValues={ { taskName: '', description: '', reminder: 'false', dueDate: '', 
                                dueTime: '', numReminders: {value: 0, label: 0} } }
                validate={ values => {
                    const errors = {};
                    
                    if (!values.taskName) {
                        errors.taskName = 'Required';
                    }
                    if (!values.description) {
                        errors.description = 'Required'
                    }
                    if (!values.dueDate) {
                        errors.dueDate = 'Required';
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
                        <div className='form-group-background-info'>
                            <div className='field-group'>
                                <div className='form-field-title'>Task Name<div className='required-asterisk'>*</div></div>
                                <Field name='taskName' as='input' />
                                <ErrorMessage name='taskName' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                <div className='form-field-title'>Description<div className='required-asterisk'>*</div></div>
                                <Field name='description' as='textarea' />
                                <ErrorMessage name='description' component='div' className='form-error' />
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
                            <div className='form-subgroup flex-100'>
                                <div className='form-subgroup flex-100'>
                                    <div className='field-group'>
                                        <div className='form-field-title'>Due Date<div className='required-asterisk'>*</div></div>
                                        <Field component={ CustomDatePickerField } name='dueDate' />
                                        <ErrorMessage name='dueDate' component='div' className='form-error' />
                                    </div>
                                    <div className='field-group'>
                                        <div className='form-field-title'>Due Time</div>
                                        <Field component={ CustomTimePickerField } name='dueTime' />
                                    </div>
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


export default TaskForm;