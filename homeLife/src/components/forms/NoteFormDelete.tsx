// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import { ErrorMessage, Form, Formik } from 'formik';
import { APIPOSTDeleteNote } from '../../api/Common';
import { INotesProps } from '../../Notes';

interface INoteDeleteFormProps {
    note: INotesProps;
    isNoteSubmitModal: React.Dispatch<React.SetStateAction<boolean>>;
    isModelShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

// The base widget that builds the entire widget via other components.
function NoteDeleteForm( {note, isNoteSubmitModal, isModelShowing}: INoteDeleteFormProps ) {
    
    async function submitForm(_values: {}, setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void; }) {
        // Call a new generic form that is an okay button.
        isNoteSubmitModal(true);
        isModelShowing(false);

        // Submit results to db
        const deleteNote = async (note: INotesProps) => {    
            const response = await APIPOSTDeleteNote(
                note.id,
                JSON.parse(localStorage.getItem('user')).id,
                note.pageId,
            );
            console.log('Delete note final response: ', response);
        }

        const response = deleteNote(note);
        console.log('Delete note response: ', response);

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


export default NoteDeleteForm;