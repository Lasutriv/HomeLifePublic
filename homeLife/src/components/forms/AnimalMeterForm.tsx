// Tanner Fry
// tannerf1101@yahoo.com
// Component used for creating an animal meter.

import { ErrorMessage, Form, Field, Formik } from 'formik';
import { APIPOSTNewAnimal, APIPOSTNewAnimalMeter, APIPOSTNewNotePage } from '../../api/Common';
import { CustomNumberField, CustomPositiveNumberField, CustomSelectCreatableField, CustomSelectField } from '../inputs/CommonInputs';
import { Tooltip } from 'react-tooltip'
import { useState } from 'react';

function AnimalMeterForm({selectedAnimal, isAnimalMeterSubmitModal, isModelShowing}) {
    const [meterCount, setMeterCount] = useState(0);

    let optionMeterTypes = [
        { value: 'food', label: 'Food' },
        { value: 'vet', label: 'Vet' },
        { value: 'bath', label: 'Bath' },
        { value: 'nails', label: 'Nails' },
        { value: 'teeth', label: 'Teeth' },
    ];

    selectedAnimal.meters.forEach((meter) => {
        // Remove any options that are already present in the selected animal
        optionMeterTypes = optionMeterTypes.filter((option) => {
            return option.value !== meter.type;
        });
    });

    async function submitForm(values: { meterTypes: {value: string, label: string}[] }, setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void; }) {
        // Call a new generic form that is an okay button.
        isAnimalMeterSubmitModal(true);
        isModelShowing(false);

        // Submit results to db
        // APIPOSTNewAnimalMeter(
            
        // );
        console.log("Form values: ", values);
        values.meterTypes.forEach((meterType, index) => {
            APIPOSTNewAnimalMeter(
                selectedAnimal.id,
                meterType.value,
                values['meterValue-' + index],
                values['meterTotal-' + index]
            ).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            }).then((data) => {
                console.log("Submitted Animal meter data: ", data);
            }).catch((error) => {
                console.log("Submitted Animal meter error: ", error);
            });
        });
        

        setSubmitting(false);
    }

    function resetForm() {
        isModelShowing(false);
    }

    function getMeterFields(number) {
        const meterFields = [];

        for (let i = 0; i < meterCount; i++) {
            const meterValueName = 'meterValue-' + i;
            const meterTotalName = 'meterTotal-' + i;

            meterFields.push(
                <div className='field-group'>
                    <div className='form-field-title'>Meter #{i + 1}<div className='required-asterisk'>*</div></div>
                    <div className='field-group'>
                        <div 
                            className='form-field-title'
                            data-tooltip-id='meter-types-value' 
                            data-tooltip-content="The meter's starting point in days. Starting value should not be larger than ending value."
                        >Starting Value (days)<div className='required-asterisk'>*</div></div>
                        <Field 
                            component={ CustomPositiveNumberField } 
                            name={meterValueName} 
                        />
                        <ErrorMessage name={meterValueName} component='div' />
                    </div>
                    <div className='field-group'>
                        <div 
                            className='form-field-title'
                            data-tooltip-id='meter-types-total' 
                            data-tooltip-content="The meter's ending point, or total, in days."
                        >Total (days)<div className='required-asterisk'>*</div></div>
                        <Field 
                            component={ CustomPositiveNumberField } 
                            name={meterTotalName} 
                        />
                        <ErrorMessage name={meterTotalName} component='div' />
                    </div>
                    <Tooltip id='meter-types-value' place='top-start' variant='info' />
                    <Tooltip id='meter-types-total' place='top-start' variant='info' />
                </div>
            );
        }

        return meterFields;
    }

    return (
        <div className='form-container animal-meter-form'>
            <Formik
                initialValues={{ 
                    meterTypes: []
                }}
                validate={ values => {
                    const errors: Partial<{
                        meterTypes: string;
                    }> = {};

                    if (!values.meterTypes && values.meterTypes.length === 0) {
                        errors.meterTypes = 'Required';
                    }

                    // Check if animal already has a meter of the same type
                    values.meterTypes.forEach((meterType) => {
                        selectedAnimal.meters.forEach((meter) => {
                            if (meter.type === meterType.value.toLowerCase()) {
                                errors.meterTypes = 'Animal already has a meter of type "' + meterType.value.toLowerCase() + '". Please remove and add a different meter.';
                            }
                        });
                    });


                    console.log("Animal meter values during validation: ", values);
                    return errors;
                    
                }}
                onSubmit={ (values, { setSubmitting }) => {
                    submitForm(values, setSubmitting);
                    setSubmitting(false);
                }}
                onReset={ (values) => {
                    resetForm();
                }}
                enableReinitialize={true}
            >
                { ({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                        <div className='form-group-background-info'>
                            <div className='field-group'>
                                <div 
                                    className='form-field-title'
                                    data-tooltip-id='meter-types-selection' 
                                    data-tooltip-content='You can create your own options by typing in the field.'
                                >
                                    Animal Meter Types
                                </div>
                                <Field 
                                    component={ CustomSelectCreatableField } 
                                    name='meterTypes' 
                                    options={ optionMeterTypes }
                                    onChangeCallback={(value) => {
                                        setMeterCount(value.length);
                                        console.log("Meter count via field value.length: ", value.length);  
                                    }}
                                />
                                {meterCount > 0 && (
                                    getMeterFields(meterCount)
                                )}
                                <ErrorMessage name='meterTypes' component='div' className='form-error'/>
                            </div>
                        </div>
                        <Tooltip id='meter-types-selection' place='top-start' variant='info' />
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


export default AnimalMeterForm;