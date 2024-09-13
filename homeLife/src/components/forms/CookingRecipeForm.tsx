// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import { ErrorMessage, Form, Field, Formik } from 'formik';
import { getCorrectDomain } from '../../AppSettings';
import { APIPOSTCookingRecipe } from '../../api/Common';
import { CustomSelectCreatableField } from '../inputs/CommonInputs';
import { Tooltip } from 'react-tooltip';

// The base widget that builds the entire widget via other components.
function CookingRecipeForm({isCookingRecipeSubmitModal, isModelShowing}) {
    
    async function submitForm(values, setSubmitting) {
        // Call a new generic form that is an okay button.
        isCookingRecipeSubmitModal(true);
        isModelShowing(false);

        // Submit results to db
        const postRecipeResponse = await APIPOSTCookingRecipe(JSON.parse(localStorage.getItem('user')).id, values.name, values.description, values.imageRef, values.ingredients, values.steps);

        console.log("Client cooking recipe add request respomse: ", postRecipeResponse);
        
        setSubmitting(false);
    }

    function resetForm() {
        isModelShowing(false);
    }

    return (
        <div className='form-container'>
            <Formik
                initialValues={ { name: '', description: '', imageRef: '/', ingredients: [], steps: [] } }
                validate={ values => {
                    const errors: Partial<{name, description, iamgeRef, ingredients, steps}> = {};
                    
                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    if (!values.description) {
                        errors.description = 'Required'
                    }
                    if (!values.ingredients) {
                        errors.ingredients = 'Required'
                    }
                    if (!values.steps) {
                        errors.steps = 'Required'
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
                                <div className='form-field-title'>Name<div className='required-asterisk'>*</div></div>
                                <Field name='name' as='input' />
                                <ErrorMessage name='name' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                <div className='form-field-title'>Description<div className='required-asterisk'>*</div></div>
                                <Field name='description' as='textarea' rows='4'/>
                                <ErrorMessage name='description' component='div' className='form-error' />
                            </div>
                            <div className='field-group'>
                                <div 
                                    className='form-field-title' 
                                    data-tooltip-id='options-tooltip' 
                                    data-tooltip-content='You can create your own options by typing in the field.'
                                >
                                    Ingredients
                                </div>
                                <Field 
                                    component={ CustomSelectCreatableField } 
                                    name='ingredients'
                                />
                                <ErrorMessage name='ingredients' component='div' />
                            </div>
                            <div className='field-group'>
                                <div 
                                    className='form-field-title' 
                                    data-tooltip-id='options-tooltip' 
                                    data-tooltip-content='You can create your own options by typing in the field.'
                                >
                                    Steps
                                </div>
                                <Field 
                                    component={ CustomSelectCreatableField } 
                                    name='steps'
                                />
                                <ErrorMessage name='steps' component='div' />
                            </div>
                            <Tooltip />
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


export default CookingRecipeForm;