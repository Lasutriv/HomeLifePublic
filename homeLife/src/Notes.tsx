// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the News page of the HomeLife app.

import { useEffect, useState } from "react";
import { Button, TabButton } from "./components/elements/Button";

import './css/dashboards/Notes.css';
import NoteDraggable from "./components/elements/dashboardElements/NoteDraggable";
import GenericOkayForm from "./components/forms/GenericOkayForm";
import NoteForm from "./components/forms/NoteForm";
import Modal from "./components/elements/Modal";
import { APIGetNotesByUser, APIGetNotesPagesByUser, APIPOSTDeleteNote, APIPOSTDeleteNotePage, APIPOSTUpdateNote } from "./api/Common";
import NotePageForm from "./components/forms/NotePageForm";
import NoteDeleteForm from "./components/forms/NoteFormDelete";
import Loading from "./components/elements/Loading";
import { addOption } from "./slices/MenuSlice";
import { setSelectedNote, setSelectedPage } from "./slices/NoteSlice";
import { useAppDispatch, useAppSelector } from "./AppHooks";
import { set } from "immer/dist/internal";
import SecurityClearance, { AppFeatureType, AppSubFeatureType } from "./components/privateRoute/SecurityClearance";
import { Link } from "react-router-dom";

export interface INotesProps {
    id: number;
    pageId: number;
    title: string;
    link: string;
    description: string;
    pubDate: string;
    encrypted: boolean;
    x?: number;
    y?: number;
    z?: number;
    children?: any;
    updateNotePosition?: any;
    deleteNote?: any;
    editNote?: any;
}

export interface IPageTabProps {
    id: number;
    title: string;
}

function Notes() {
    const [notesData, setNotesData] = useState<INotesProps[]>([]);
    const [pageTabData, setPageTabData] = useState<any[]>([]);
    const [isNoteModal, setIsNoteModal] = useState<boolean>(false);
    const [isNoteSubmitModal, setIsNoteSubmitModal] = useState<boolean>(false);
    const [isNoteEditModal, setIsNoteEditModal] = useState<boolean>(false);
    const [isNoteEditSubmitModal, setIsNoteEditSubmitModal] = useState<boolean>(false);
    const [isPageTabModal, setIsPageTabModal] = useState<boolean>(false);
    const [isPageTabSubmitModal, setIsPageTabSubmitModal] = useState<boolean>(false);
    const [isSureDeleteNoteModal, setIsSureDeleteNoteModal] = useState<boolean>(false);
    const [isSureDeleteNoteSubmitModal, setIsSureDeleteNoteSubmitModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // const selectedPage = useSelector((state: IMainNoteSlice) => state.mainNoteSlice.selectedPage);
    const selectedPage = useAppSelector((state) => state.notes.selectedPage);
    const selectedNote = useAppSelector((state) => state.notes.selectedNote);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Set selected page to -1 so we don't have a page selected when we first load the page, thus no notes will be displayed
        dispatch(setSelectedPage({ id: -1, title: '' }));
    }, []);

    useEffect(() => {
        getNotesAndPagesData();

        // Set height of notes content based on header so we can perform absolute positions within
        // the notes section
        const notesHeader = document.querySelector('.notes-header') as HTMLElement;
        const notesContent = document.querySelector('.notes-content') as HTMLElement;
        if (notesHeader && notesContent) {
            notesContent.style.height = 'calc(100% - ' + notesHeader.clientHeight + 'px)';
        }

        dispatch(addOption({ text: 'Delete Page' }));
        
    }, []);

    useEffect(() => {
        getNotesAndPagesData();  // Refresh data on changes in page
        
    }, [selectedNote, selectedPage, isNoteSubmitModal, isPageTabSubmitModal, isSureDeleteNoteSubmitModal, isNoteEditModal]);
    
    const handleTabDelete = async () => {
        console.log('Delete tab: ', selectedPage.id);
        // TODO: Confirm with user that they want to delete all notes for the selected page tab
        // Delete all notes for page tab
        const notesResponse = await APIGetNotesByUser(JSON.parse(localStorage.getItem('user')).id);
        console.log('Notes response: ', notesResponse);

        notesResponse.forEach(async (note: INotesProps) => {
            if (note.pageId === selectedPage.id) {
                console.log('Delete note: ', note.id);
                const response = await APIPOSTDeleteNote(
                    note.id,
                    JSON.parse(localStorage.getItem('user')).id,
                    selectedPage.id
                );
                console.log('Delete note response: ', response);
            }
        });

        // Delete the page tab
        const response = await APIPOSTDeleteNotePage(
            selectedPage.id,
            JSON.parse(localStorage.getItem('user')).id,
            selectedPage.id
        );
        console.log('Delete page tab response: ', response);

        // Update redux store
        dispatch(setSelectedPage({ id: -1, title: '' }));
    }

    const getNotesAndPagesData = async () => {
        setIsLoading(true);
        // Get all page tabs for the user
        await APIGetNotesPagesByUser(JSON.parse(localStorage.getItem('user')).id).then((response) => {
            console.log('Page tabs response: ', response);
            setPageTabData(response);
        });
        // Get all notes for the user
        await APIGetNotesByUser(JSON.parse(localStorage.getItem('user')).id).then((response) => {
            console.log('Notes response: ', response);
            setNotesData(response);
        });
        setIsLoading(false);
    }

    const handleTabClick = (tab: IPageTabProps) => {
        dispatch(setSelectedPage(tab));
    }

    const handleTabAdd = () => {
        setIsPageTabModal(true);
    }

    const handleNoteClick = (note: INotesProps) => {
        dispatch(setSelectedNote(note));
    }

    const updateNotePosition = async (noteId: number, title: string, link: string, description: string, pubDate: string, encrypted: boolean, x: number, y: number, z: number) => {
        console.log('Update note with position: ', noteId, title, link, description, pubDate, encrypted, x, y, z);

        console.log('Type of encrypted: ', typeof encrypted);
        
        
        const response = await APIPOSTUpdateNote(
            noteId,
            JSON.parse(localStorage.getItem('user')).id,
            selectedPage.id,
            title,
            link,
            description,
            pubDate,
            encrypted as boolean,
            x,
            y,
            z
        );
        console.log('Update note position final response: ', response);        
    }

    return (
        <div className='common-container notes-container'>
            <SecurityClearance 
                featureType={AppFeatureType.Notes} 
                subFeatureType={AppSubFeatureType.NotesUnencrypted}
                noClearanceNote={
                    <>Notes</>
                }
                feature={
                    <>
                        <div className='notes-header'>
                            <div className="pages-tabs">
                                {/* eslint-disable-next-line array-callback-return */}
                                {pageTabData.length > 0 && pageTabData?.map((tab: IPageTabProps) => {
                                    if (tab.id !== undefined) {
                                        return (
                                            <TabButton classes={'pages-tab tab-' + tab.id + (selectedPage.id === tab.id ? ' selected' : '')} text={tab.title} onClick={() => { handleTabClick(tab) }} />
                                        );
                                    }
                                })}
                                {/* Remove icon */}
                                <i className="fas fa-plus-circle" onClick={() => { handleTabAdd() } } />
                                <i className="fas fa-times-circle" onClick={() => { handleTabDelete() } } />
                            </div>
                            <div className='pages-buttons'>
                            </div>
                        </div>
                        <div className='notes-content'>
                            <Button text='Add Note' onClick={ () => { setIsNoteModal(true) } } />
                            <div className='notes-display'>
                                {/* eslint-disable-next-line array-callback-return */}
                                {isLoading ? (
                                    <Loading />
                                ) : (
                                    <>
                                        {notesData?.length > 0 && notesData?.map((note: INotesProps) => {
                                            if (note.pageId === selectedPage.id) {
                                                return (
                                                    // <TestManyDraggables/>
                                                    <NoteDraggable
                                                        id={note.id}
                                                        pageId={note.pageId}
                                                        title={note.title}
                                                        link={note.link}
                                                        description={note.description}
                                                        pubDate={note.pubDate}
                                                        encrypted={note.encrypted}
                                                        x={note.x}
                                                        y={note.y}
                                                        z={note.z}
                                                        updateNotePosition={updateNotePosition}
                                                        editNote={() => { setIsNoteEditModal(true) }}
                                                        deleteNote={ () => {
                                                            dispatch(setSelectedNote(note));
                                                            setIsSureDeleteNoteModal(true);
                                                        } }
                                                        isNoteEditModal={isNoteEditModal}
                                                        setIsNoteEditModal={setIsNoteEditModal}
                                                        setIsNoteEditSubmitModal={setIsNoteEditSubmitModal}
                                                        onClick={() => { handleNoteClick(note) }}
                                                    />
                                                );
                                            }
                                        })}
                                    </>   
                                )}
                                {/* Modals */}
                                {isPageTabModal && (
                                    <Modal 
                                        title="Add Page" 
                                        textInfo="Add a page by filling in the below information."
                                        form={<NotePageForm isNoteSubmitModal={setIsPageTabSubmitModal} isModelShowing={setIsPageTabModal} />}
                                    />
                                )}
                                {isPageTabSubmitModal && (
                                    <GenericOkayForm title="Submitted!" description="Your page has been created." isShowingGenericOkayForm={setIsPageTabSubmitModal}/>
                                )}
                                {isNoteSubmitModal && (
                                    <GenericOkayForm title="Submitted!" description="Your note has been created." isShowingGenericOkayForm={setIsNoteSubmitModal}/>
                                )}
                                {isNoteModal && (
                                    <Modal 
                                        title="Add Note" 
                                        textInfo="Add a note by filling in the below information."
                                        form={<NoteForm pageId={selectedPage.id} isNoteSubmitModal={setIsNoteSubmitModal} isModelShowing={setIsNoteModal} />}
                                    />
                                )}
                                {isSureDeleteNoteSubmitModal && (
                                    <GenericOkayForm title="Submitted!" description="Your note has been deleted." isShowingGenericOkayForm={setIsSureDeleteNoteSubmitModal}/>
                                )}
                                {isSureDeleteNoteModal && (
                                    <Modal 
                                        title={"Delete Note"}
                                        textInfo={"Are you sure you want to delete " + selectedNote.title + "?"}
                                        form={<NoteDeleteForm note={selectedNote} isNoteSubmitModal={setIsSureDeleteNoteSubmitModal} isModelShowing={setIsSureDeleteNoteModal} />}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                }
            />
        </div>
    );
}

export default Notes;