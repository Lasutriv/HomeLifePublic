// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { APIPOSTDeleteAnimal, APIPOSTDeleteNote, APIPOSTFeedback } from '../../api/Common';
import { INotesProps } from '../../Notes';
import { IAnimalProps } from '../../Animals';

interface IAnimalDeleteFormProps {
    isFeedbackSubmitModal: React.Dispatch<React.SetStateAction<boolean>>;
    isModelShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

// The base widget that builds the entire widget via other components.
function FeedbackForm( {isFeedbackSubmitModal, isModelShowing}: IAnimalDeleteFormProps ) {
    
    async function submitForm(_values: { feedback: string }, setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void; }) {
        // Call a new generic form that is an okay button.
        isFeedbackSubmitModal(true);
        isModelShowing(false);

        // Submit results to db
        // TODO: Make sure the date and time is submitted with the form
        const response = await APIPOSTFeedback(
            _values.feedback,
            new Date(),
        );
        console.log('Feedback response: ', response);

        setSubmitting(false);
    }

    function resetForm() {
        isModelShowing(false);
    }

    return (
        <div className='form-container'>
            <Formik
                initialValues={ { feedback: '' } }
                validate={ values => {
                    const errors: Partial<{feedback}> = {};

                    if (!values.feedback) {
                        errors.feedback = 'Required';
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
                                <div className='form-field-title'>Feedback<div className='required-asterisk'>*</div></div>
                                <Field name='feedback' as='textarea' rows='4'/>
                                <ErrorMessage name='feedback' component='div' className='form-error' />
                            </div>
                        </div>
                        <hr />
                        <div className='button-group'>
                            <button type='submit' disabled={ isSubmitting }>Submit</button>
                            <button type='reset'>Cancel</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}


export default FeedbackForm;