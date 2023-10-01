// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import { ErrorMessage, Form, Field, Formik } from 'formik';
import { CustomDatePickerField, CustomSelectField } from '../inputs/CommonInputs';
import { APIPOSTUpdateNote } from '../../api/Common';
import { INotesProps } from '../../Notes';

interface IMaintenanceItemsProps {
    maintenanceItem: IMaintenanceItemsProps;
    isModelShowing: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// The base widget that builds the entire widget via other components.
function MaintenanceItemFormEdit({maintenanceItem, setSubmitModal, isModelShowing}: IMaintenanceItemsProps) {
    const optionsStatus = [
        { value: 'completed', label: 'Completed' },
        { value: 'failed', label: 'Failed' },
        { value: 'overdue', label: 'Overdue' },
        { value: 'due', label: 'Due' },
        { value: 'pending', label: 'Pending' },
    ]

    async function submitForm(values, setSubmitting) {
        // Call a new generic form that is an okay button.
        setSubmitModal(true);
        isModelShowing(false);

        // Submit results to db
        

        setSubmitting(false);
    }

    function resetForm() {
        isModelShowing(false);
    }

    return (
        <div className='form-container-edit maintenance-form'>
            <Formik
                initialValues={ { status: ''} }
                validate={ values => {
                    const errors: Partial<{status}> = {};
                    console.log("maintenance edit form Values: ", values);

                    return errors;
                }}
                onSubmit={ (values, { setSubmitting }) => {
                    submitForm(values, setSubmitting);
                    setSubmitting(false);
                }}
                onReset={ (values) => {
                    resetForm();
                }}
                enableReinitialize={true}  // Makes sure form has latest props passed in that are modified from parent state
            >
                { ({ isSubmitting }) => (
                    <Form>
                        <div className='form-group-background-info'>
                            <div className='field-group'>
                                <div className='form-field-title'>Status<div className='required-asterisk'>*</div></div>
                                <Field 
                                    component={ CustomSelectField } 
                                    name='status' 
                                    options={ optionsStatus } 
                                    onChangeCallback={(value) => {
                                        console.log('Status Value: ', value);
                                    }}
                                />
                                <ErrorMessage name='status' component='div' />
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


export default MaintenanceItemFormEdit;