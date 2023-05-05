// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating generic okay forms.

import React from 'react';
import { Form, Formik } from 'formik';
import Proptypes from 'prop-types';

// The base widget that builds the entire widget via other components.
function GenericOkayForm({title, description, isShowingGenericOkayForm}) {    
    async function submitForm(setSubmitting) {
        setSubmitting(false);
        isShowingGenericOkayForm(false);
    }

    return (
        <div className='generic-okay-form'>
            <Formik
                initialValues={ { } }
                validate={ values => {

                }}
                onSubmit={ (values, { setSubmitting }) => {
                    submitForm(setSubmitting);
                    setSubmitting(false);
                }}
                onReset={ (values) => {
                    
                }}
            >
                { ({ isSubmitting }) => (
                    <Form>
                        <div className='form-field-title'>{ title }</div>
                                <div className='form-field-description'>{ description }</div>
                        <hr />
                        <div className='button-group'>
                            <button type='submit' disabled={ isSubmitting }>Okay</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

GenericOkayForm.defaultProps = {
    title: "Title",
    description: "Description",
}

GenericOkayForm.propTypes = {
    title: Proptypes.string.isRequired,
    description: Proptypes.string.isRequired,
    isShowingGenericOkayForm: Proptypes.bool.isRequired,
}

export default GenericOkayForm;