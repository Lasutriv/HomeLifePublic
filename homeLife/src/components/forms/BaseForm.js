// Tanner Fry
// tfry@thinkbox312.com
// Component used for creating forms.

import React, { useState, useEffect } from 'react';

import { FormType, FormComponent } from '../types/Forms.tsx';

// The base form that is utilized in all other forms.
function BaseForm({ type, formClasses }) {
    const [form, setForm] = useState(FormType.null);
    formClasses = 'form-base ' + formClasses;
    
    useEffect(() => {
        if (type === FormType.TaskTrackerForm) {
            setForm(FormComponent.TaskTrackerForm);
        } else {
            console.error('Error: Form type "' + type + '" was supplied but does not match our form types.');
            setForm(FormComponent.null);
        }
    }, [])

    return (
        <div className='form-container'>
            <div className='form-wrapper'>
                <div className={ formClasses }>
                    { form }
                </div>
            </div>
        </div>
    );
}


export default BaseForm;