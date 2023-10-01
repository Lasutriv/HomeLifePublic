// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import { ErrorMessage, Form, Field, Formik } from 'formik';
import { APIPOSTNewAnimal, APIPOSTNewNotePage } from '../../api/Common';
import { CustomNumberField, CustomSelectCreatableField, CustomSelectField } from '../inputs/CommonInputs';
import { Tooltip } from 'react-tooltip'

// The base widget that builds the entire widget via other components.
function AnimalForm({isAnimalSubmitModal, isModelShowing}) {
    const optionsAnimalType = [
        {value: 'dog', label: 'Dog'}, {value: 'cat', label: 'Cat'}, {value: 'horse', label: 'Horse'}, {value: 'cow', label: 'Cow'},
        {value: 'fish', label: 'Fish'}, {value: 'shrimp', label: 'Shrimp'}, {value: 'spider', label: 'Spider'}, {value: 'frog', label: 'Frog'},
        {value: 'bugs', label: 'Bugs'}, {value: 'otter', label: 'Otter'}, {value: 'sheep', label: 'Sheep'}, {value: 'ram', label: 'Ram'},
        {value: 'pig', label: 'Pig'}, {value: 'squirrel', label: 'Squirrel'}, {value: 'rabbit', label: 'Rabbit'}, {value: 'monkey', label: 'Monkey'},
        {value: 'deer', label: 'Deer'}, {value: 'bird', label: 'Bird'}, {value: 'crab', label: 'Crab'}, {value: 'turtle', label: 'Turtle'},
        {value: 'snake', label: 'Snake'}, {value: 'raccoon', label: 'Raccoon'}, {value: 'lobster', label: 'Lobster'}, {value: 'duck', label: 'Duck'},
        {value: 'dove', label: 'Dove'}, {value: 'crow', label: 'Crow'}, {value: 'bee', label: 'Bee'}, {value: 'egg', label: 'Egg'},
    ]
    const optionsAnimalSex = [
        {value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}
    ];
    const basicOptionsAnimalPrescriptions = [
        {value: 'heartworm', label: 'Heartworm'}, {value: 'flea', label: 'Flea'}, {value: 'tick', label: 'Tick'}, {value: 'other', label: 'Other'}
    ];
    const basicOptionsAnimalSurgeries = [
        {value: 'spayed', label: 'Spayed'}, {value: 'neutered', label: 'Neutered'}, {value: 'other', label: 'Other'}
    ]
    const basicOptionsAnimalVaccinations = [
        {value: 'rabies', label: 'Rabies'}, {value: 'parvo', label: 'Parvo'}, {value: 'distemper', label: 'Distemper'}, {value: 'other', label: 'Other'}
    ]

    async function submitForm(values: { animalName: string; animalType: {value: string, label: string}; animalBreed: string; animalSex: {value: string, label: string}; animalAge: number;
                                        animalWeight: number; animalImageRef: string; animalPrescriptions: string[]; animalSurgeries: string[];
                                        animalVaccinations: string[]; animalNotes: string; }, setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void; }) {
        // Call a new generic form that is an okay button.
        isAnimalSubmitModal(true);
        isModelShowing(false);

        // Submit results to db
        APIPOSTNewAnimal(
            JSON.parse(localStorage.getItem('user')).id,
            values.animalName,
            values.animalType,
            values.animalBreed,
            values.animalSex,
            values.animalAge,
            values.animalWeight,
            values.animalImageRef,
            values.animalPrescriptions,
            values.animalSurgeries,
            values.animalVaccinations,
            values.animalNotes
        );
        console.log("Form values: ", values);
        

        setSubmitting(false);
    }

    function resetForm() {
        isModelShowing(false);
    }

    return (
        <div className='form-container animal-form'>
            <Formik
                initialValues={{ 
                    animalName: '', animalType: {value: '', label: ''}, animalBreed: '', animalSex: {value: '', label: ''}, animalAge: 1, animalWeight: 1,
                    animalImageRef: '/', animalPrescriptions: [], animalSurgeries: [], animalVaccinations: [], animalNotes: ''
                }}
                validate={ values => {
                    const errors: Partial<{
                        animalName: string, animalType: string, animalBreed: string, animalSex: string, animalAge: string, 
                        animalWeight: string, animalImageRef: string, animalPrescriptions: string, animalSurgeries: string,
                        animalVaccinations: string, animalNotes: string
                    }> = {};

                    if (!values.animalName) {
                        errors.animalName = 'Required';
                    }
                    if (!values.animalType) {
                        errors.animalType = 'Required';
                    }
                    if (!values.animalSex) {
                        errors.animalSex = 'Required';
                    }
                    if (!values.animalAge) {
                        errors.animalAge = 'Required';
                    }
                    if (!values.animalWeight) {
                        errors.animalWeight = 'Required';
                    }


                    console.log("Animal values during validation: ", values);
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
                            <div className='field-group flex-100'>
                                <div className='field-group-input'>
                                    <div className='form-field-title'>Name<div className='required-asterisk'>*</div></div>
                                    <Field name='animalName' as='input' />
                                    <ErrorMessage name='animalName' component='div' className='form-error' />
                                </div>
                                <div className='field-group-input'>
                                    <div className='form-field-title'>Breed</div>
                                    <Field name='animalBreed' as='input' />
                                    <ErrorMessage name='animalBreed' component='div' className='form-error' />
                                </div>
                            </div>
                            <div className='field-group flex-100'>
                                <div className='field-group'>
                                    <div className='form-field-title'>Type<div className='required-asterisk'>*</div></div>
                                    <Field 
                                        component={ CustomSelectField } 
                                        name='animalType' 
                                        options={ optionsAnimalType } 
                                        value={values.animalType}    
                                        onChangeCallback={(value) => {
                                            // setReminderCount(value.value);
                                        }}
                                    />
                                    <ErrorMessage name='animalType' component='div' className='form-error' />
                                </div>
                                <div className='field-group'>
                                    <div className='form-field-title'>Sex<div className='required-asterisk'>*</div></div>
                                    <Field 
                                        component={ CustomSelectField } 
                                        name='animalSex' 
                                        options={ optionsAnimalSex }
                                        value={values.animalSex}
                                        onChangeCallback={(value) => {
                                            // setReminderCount(value.value);
                                        }}
                                    />
                                    <ErrorMessage name='animalSex' component='div' />
                                </div>
                            </div>
                            <div className='field-group-input-split'>
                                <div className='split-1'>
                                    <div className='form-field-title'>Age<div className='required-asterisk'>*</div></div>
                                    <Field 
                                        component={ CustomNumberField } 
                                        name='animalAge' 
                                    />
                                    <ErrorMessage name='animalAge' component='div' />
                                </div>
                                <div className='split-2'>
                                    <div className='form-field-title'>Weight (lbs)<div className='required-asterisk'>*</div></div>
                                    <Field 
                                        component={ CustomNumberField } 
                                        name='animalWeight' 
                                    />
                                    <ErrorMessage name='animalWeight' component='div' />
                                </div>
                            </div>
                            <div className='field-group flex-100'>
                                <div className='field-group'>
                                    <div 
                                        className='form-field-title'
                                        data-tooltip-id='animal-selections' 
                                        data-tooltip-content='You can create your own options by typing in the field.'
                                    >
                                        Animal Prescriptions
                                    </div>
                                    <Field 
                                        component={ CustomSelectCreatableField } 
                                        name='animalPrescriptions' 
                                        options={ basicOptionsAnimalPrescriptions }
                                    />
                                    <ErrorMessage name='animalPrescriptions' component='div' />
                                </div>
                                <div className='field-group'>
                                    <div 
                                        className='form-field-title'
                                        data-tooltip-id='animal-selections' 
                                        data-tooltip-content='You can create your own options by typing in the field.'
                                    >
                                        Animal Surgeries
                                    </div>
                                    <Field 
                                        component={ CustomSelectCreatableField } 
                                        name='animalSurgeries' 
                                        options={ basicOptionsAnimalSurgeries }
                                    />
                                    <ErrorMessage name='animalSurgeries' component='div' />
                                </div>
                                <div className='field-group'>
                                    <div 
                                        className='form-field-title' 
                                        data-tooltip-id='animal-selections' 
                                        data-tooltip-content='You can create your own options by typing in the field.'
                                    >
                                        Animal Vaccinations
                                    </div>
                                    <Field 
                                        component={ CustomSelectCreatableField } 
                                        name='animalVaccinations' 
                                        options={ basicOptionsAnimalVaccinations }
                                    />
                                    <ErrorMessage name='animalVaccinations' component='div' />
                                </div>
                            </div>
                            <div className='field-group'>
                                <div className='form-field-title'>Animal Notes</div>
                                <Field name='animalNotes' as='textarea' rows='4'/>
                                <ErrorMessage name='animalNotes' component='div' className='form-error' />
                            </div>
                        </div>
                        <Tooltip id='animal-selections' place='top-start' variant='info' />
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


export default AnimalForm;