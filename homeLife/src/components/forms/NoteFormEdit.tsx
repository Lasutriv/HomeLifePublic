// Tanner Fry
// dev.lasutriv@gmail.com
// Component used for creating a trask for the task tracker.

import { ErrorMessage, Form, Field, Formik } from 'formik';
import { CustomDatePickerField } from '../inputs/CommonInputs';
import { APIPOSTUpdateNote } from '../../api/Common';
import { INotesProps } from '../../Notes';

interface INoteFormEditProps {
    note: INotesProps;
    pageId: number;
    isNoteSubmitModal: React.Dispatch<React.SetStateAction<boolean>>;
    isModelShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

// The base widget that builds the entire widget via other components.
function NoteFormEdit({note, pageId, isNoteSubmitModal, isModelShowing}: INoteFormEditProps) {
    
    async function submitForm(values, setSubmitting) {
        // Call a new generic form that is an okay button.
        isNoteSubmitModal(true);
        isModelShowing(false);

        // Submit results to db
        APIPOSTUpdateNote(
            note.id,
            JSON.parse(localStorage.getItem('user')).id,
            pageId ? pageId : note.pageId,
            values.title ? values.title : note.title,
            values.link ? values.link : note.link,
            values.description ? values.description : note.description,
            values.pubDate ? values.pubDate : note.pubDate,
            values.encrypted,
            note.x,
            note.y,
            note.z
        );

        setSubmitting(false);
    }

    function resetForm() {
        isModelShowing(false);
    }

    return (
        <div className='form-container-edit note-form'>
            <Formik
                initialValues={ { pageId: pageId, title: '', link: '', description: '', pubDate: '', encrypted: false} }
                validate={ values => {
                    const errors: Partial<{pageId, title, link, description, pubDate, encrypted, x, y, z}> = {};
                    console.log("Note edit form Values: ", values);

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
                        <div 
                            className={'handle note note-' + note.id} 
                            style={{left: note.x, top: note.y, zIndex: note.z}}
                        >
                            <div className='header-banner'>
                                <div className='note-title'>
                                    <Field name='title' as='input' placeholder={note.title} />
                                    <ErrorMessage name='title' component='div' className='form-error' />
                                </div>
                                <div className='note-buttons'>
                                    {/* Edit icon */}
                                    {/* <i className="fa-solid fa-edit fa-xs" onClick={ () => { this.props?.editNote() } }></i> */}
                                    {/* trashcan icon */}
                                    {/* <i className="fa-solid fa-trash-can fa-xs" onClick={ () => { this.props?.deleteNote() } }></i> */}
                                </div>
                                {/* <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div> */}
                            </div>
                            <div className='note-content'>
                                <div className='note-description'>
                                    <Field name='description' as='textarea' placeholder={note.description}/>
                                    <ErrorMessage name='description' component='div' className='form-error' />
                                </div>
                                <div className='note-date'>
                                    <Field component={ CustomDatePickerField } name='pubDate' placeholderText={note.pubDate.substring(0, 10)} />
                                    <ErrorMessage name='pubDate' component='div' className='form-error' />
                                </div>
                                <div className='note-encrypted'>
                                    <Field
                                        name="encrypted"
                                        render={({ field }) => (
                                            <>
                                                <div className="checkbox-item">
                                                    <input 
                                                        {...field} id="encryptedTrue" value="true" name="encrypted" 
                                                        type="checkbox"
                                                    />
                                                    <label htmlFor="encryptedTrue">Encrypted</label>
                                                </div>
                                            </>
                                        )}
                                    />
                                    <ErrorMessage name='encrypted' component='div' className='form-error' />
                                </div>
                                <div className='button-group'>
                                   <button type='submit' disabled={ isSubmitting }>Modify</button>
                                   <button type='reset'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                    // <Form>
                    //     <div className='form-group-background-info'>
                    //         <div className='field-group'>
                    //             <div className='form-field-title'>Title<div className='required-asterisk'>*</div></div>
                    //             <Field name='title' as='input' />
                    //             <ErrorMessage name='title' component='div' className='form-error' />
                    //         </div>
                    //         <div className='field-group'>
                    //             <div className='form-field-title'>Link<div className='required-asterisk'>*</div></div>
                    //             <Field name='link' as='input' />
                    //             <ErrorMessage name='link' component='div' className='form-error' />
                    //         </div>
                    //         <div className='field-group'>
                    //             <div className='form-field-title'>Description<div className='required-asterisk'>*</div></div>
                    //             <Field name='description' as='textarea' rows='4'/>
                    //             <ErrorMessage name='description' component='div' className='form-error' />
                    //         </div>
                    //         <div className='field-group'>
                    //             <div className='form-field-title'>Publish Date<div className='required-asterisk'>*</div></div>
                    //             <Field component={ CustomDatePickerField } name='pubDate' />
                    //             <ErrorMessage name='pubDate' component='div' className='form-error' />
                    //         </div>
                    //         <div className='field-group'>
                    //             <div className='form-field-title'>Encrypted</div>
                    //             <Field
                    //                 name="encrypted"
                    //                 render={({ field }) => (
                    //                     <>
                    //                         <div className="checkbox-item">
                    //                             <input 
                    //                                 {...field} id="reminderTrue" value="true" name="encrypted" 
                    //                                 type="checkbox"
                    //                             />
                    //                             <label htmlFor="reminderTrue">True</label>
                    //                         </div>
                    //                     </>
                    //                 )}
                    //             />
                    //             <ErrorMessage name='encrypted' component='div' className='form-error' />
                    //         </div>
                    //         <ErrorMessage name='pageId' component='div' className='form-error' />
                    //     </div>
                    //     <hr />
                    //     <div className='button-group'>
                    //         <button type='submit' disabled={ isSubmitting }>Add</button>
                    //         <button type='reset'>Cancel</button>
                    //     </div>
                    // </Form>
                )}
            </Formik>
        </div>
    );
}


export default NoteFormEdit;