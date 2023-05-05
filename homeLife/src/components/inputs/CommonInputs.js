import { useField, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';

import Select from 'react-select';
import DatePicker from 'react-datepicker';  // https://www.npmjs.com/package/react-datepicker
import TimePicker from 'rc-time-picker';  // https://react-component.github.io/time-picker/

import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

export const CustomDatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.field.name);

    return (
        <DatePicker
            {...field}
            {...props}
            dateFormat='MM-dd-yyyy'
            // dateFormat='Y-m-d\TH:i:s'
            selected={(field.value && new Date(field.value)) || null}
            onChange={value => {
                setFieldValue(field.name, value);
            }}
            autoComplete='off'
        />
    );
};

export const CustomTimePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.field.name);
    var defaultTime = moment(moment().date()).hour(12).minute(30);

    // Set default value
    useEffect(() => {
        setFieldValue(field.name, defaultTime);
    }, [])

    return (
        <TimePicker
            {...props}
            defaultValue={ defaultTime }
            defaultOpenValue={ defaultTime }
            placeholder="12:30"
            showSecond={ false }
            onChange={value => {
                setFieldValue(field.name, value);
            }}
            autoComplete='off'
        />
    );
};

export const CustomSelectField = (props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.field.name);

    // Use value to make this a controlled componenet, which is when form data is handled by the component's state.
    return (
        <Select
            className='select-container'
            classNamePrefix='select'
            { ...props }
            onChange={value => {
                setFieldValue(field.name, value);
                props?.onChangeCallback(value);
            }}
        />
    );
}

export const CustomPasswordField = (props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.name);
    const [showHidePassword, setShowHidePassword] = useState(false);

    // Use value to make this a controlled componenet, which is when form data is handled by the component's state.
    return (
        <div className='password-container'>
            <input
                type={showHidePassword ? 'text' : 'password'}
                { ...props }
                onChange={value => {
                    setFieldValue(field.name, value.target.value);
                }}
            />
            <label className='show-hide' for='checkbox-input'>
                <input
                    id='checkbox-input'
                    type='checkbox'
                    checked={showHidePassword ? '' : 'checked'}
                    onChange={() => {
                        setShowHidePassword(!showHidePassword);
                    }}
                />
                <span className='checkmark'></span>
            </label>
        </div>
    )
}