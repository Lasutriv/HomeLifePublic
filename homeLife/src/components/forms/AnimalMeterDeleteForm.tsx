// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import { ErrorMessage, Form, Formik } from 'formik';
import { APIPOSTDeleteAnimal, APIPOSTDeleteAnimalMeter, APIPOSTDeleteNote } from '../../api/Common';
import { INotesProps } from '../../Notes';
import { IAnimalProps } from '../../Animals';

interface IAnimalDeleteFormProps {
    animal: IAnimalProps;
    meterId: number;
    isAnimalDeleteSubmitModal: React.Dispatch<React.SetStateAction<boolean>>;
    isModelShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

// The base widget that builds the entire widget via other components.
function AnimalMeterDeleteForm( {animal, meterId, isAnimalDeleteSubmitModal, isModelShowing}: IAnimalDeleteFormProps ) {
    
    async function submitForm(_values: {}, setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void; }) {
        // Call a new generic form that is an okay button.
        isAnimalDeleteSubmitModal(true);
        isModelShowing(false);

        // Submit results to db
        const deleteAnimalMeter = async (animal: IAnimalProps) => {    
            const response = await APIPOSTDeleteAnimalMeter(
                meterId,
                animal.id,
            );
            console.log('Delete animal final response: ', response);
        }

        await deleteAnimalMeter(animal);

        setSubmitting(false);
    }

    function resetForm() {
        isModelShowing(false);
    }

    return (
        <div className='form-container'>
            <Formik
                initialValues={ { } }
                validate={ values => {
                    const errors: Partial<{}> = {};
                    
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
                            
                        </div>
                        <hr />
                        <div className='button-group'>
                            <button type='submit' disabled={ isSubmitting }>Delete</button>
                            <button type='reset'>Cancel</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}


export default AnimalMeterDeleteForm;