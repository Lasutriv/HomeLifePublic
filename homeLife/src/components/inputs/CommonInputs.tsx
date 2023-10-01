import { useField, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

import Select from 'react-select';
import DatePicker from 'react-datepicker';  // https://www.npmjs.com/package/react-datepicker
import TimePicker from 'rc-time-picker';  // https://react-component.github.io/time-picker/

import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import CreatableSelect from 'react-select/creatable';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            // @ts-ignore
            autoComplete='off'
        />
    );
};

export const CustomNumberField = (props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.field.name);

    // Use value to make this a controlled componenet, which is when form data is handled by the component's state.
    return (
        <div className='number-container'>
            <input
              {...props}
              placeholder="Enter your number"
              type="number"
              value={field.value}
              onChange={e => {
                e.preventDefault();
                const { value } = e.target;
                const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
                if (regex.test(value.toString())) {
                  setFieldValue(field.name, value);
                }
              }}
              onBlur={props.handleBlur}
            />
        </div>
    )
}
export const CustomPositiveNumberField = (props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.field.name);

    // Use value to make this a controlled componenet, which is when form data is handled by the component's state.
    return (
        <div className='number-container'>
            <input
              {...props}
              placeholder="Enter your number"
              type="number"
              value={field.value}
              onChange={e => {
                e.preventDefault();
                const { value } = e.target;
                const regex = /^[1-9][0-9]*$/;
                if (regex.test(value.toString())) {
                  setFieldValue(field.name, value);
                }
              }}
              onBlur={props.handleBlur}
            />
        </div>
    )
}

export const CustomOTPField = (props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.field.name);

    // Use value to make this a controlled componenet, which is when form data is handled by the component's state.
    return (
        <div className='number-container'>
            <input
              {...props}
              placeholder="Enter your number"
              type="number"
              value={field.value}
              onChange={e => {
                e.preventDefault();
                const { value } = e.target;
                // const regex = /^([0-9]|[1-9][0-9]{1,3})$/;
                setFieldValue(field.name, value);
                // const regex = /^-?[\d]+$/;
                // if (regex.test(value.toString())) {
                //   setFieldValue(field.name, value);
                // }
              }}
              onBlur={props.handleBlur}
            />
        </div>
    )
}

export const CustomSelectField = (props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.field.name);

    // Use value to make this a controlled componenet, which is when form data is handled by the component's state.
    return (
        <Select
            { ...props }
            className='select-container'
            classNamePrefix='select'
            onChange={value => {
                setFieldValue(field.name, value);
                props?.onChangeCallback(value);
            }}
        />
    );
}

export const CustomSelectCreatableField = (props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props.field.name);

    // Use value to make this a controlled componenet, which is when form data is handled by the component's state.
    return (
        <CreatableSelect 
            {...props}
            className='custom-select-creatable-container'
            classNamePrefix='custom-select-creatable'
            isMulti 
            options={props.options}
            onChange={value => {
                setFieldValue(field.name, value);
                props?.onChangeCallback(value);
            }} 
        />
    );
}

export const CustomSearchBar = (props) => {

    return (
        <input 
            className={'search-bar ' + props.classSuffix} 
            placeholder={props.placeholder}
            onChange={(e) => {
                props?.onChangeCallback(e.target.value);
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
            {/* Password */}
            <input
                type={showHidePassword ? 'text' : 'password'}
                { ...props }
                onChange={value => {
                    setFieldValue(field.name, value.target.value);
                }}
            />
            {/* Checkmark */}
            {/* @ts-ignore */}
            <div className='show-hide' for='checkbox-input'>
                <input
                    id='checkbox-input'
                    type='checkbox'
                    checked={showHidePassword ? false : true}
                    onChange={() => {
                        setShowHidePassword(!showHidePassword);
                    }}
                />
                <span className='checkmark'></span>
            </div>
        </div>
    )
}