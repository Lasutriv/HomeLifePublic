import React from "react";
import Draggable from "react-draggable";
import { INotesProps } from "../../../Notes";
import { Button } from "../Button";
import NoteFormEdit from "../../forms/NoteFormEdit";

interface INoteDraggableProps {
    id: number;
    pageId: number;
    title: string;
    link: string;
    description: string;
    pubDate: string;
    encrypted: boolean;
    x: number;
    y: number;
    z: number;
    children?: INotesProps[];
    updateNotePosition?: (noteId: number, title: string, link: string, description: string, pubDate: string, encrypted: boolean, x: number, y: number, z: number) => void;
    deleteNote?: Function;
    editNote?: Function;
    isNoteEditModal?: boolean;
    setIsNoteEditModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsNoteEditSubmitModal?: React.Dispatch<React.SetStateAction<boolean>>;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

class NoteDraggable extends React.Component<INoteDraggableProps> {

    eventLogger = (e: MouseEvent, data: Object) => {
      console.log('Event: ', e);
      console.log('Data: ', data);
    };

    state = {
        activeDrags: 0,
        deltaPosition: {
          x: 0, y: 0
        },
        position: {
            x: this.props.x, y: this.props.y
        },
        controlledPosition: {
          x: -400, y: 200
        }
      };
    
    handleDrag = (e, ui) => {
        const {x, y} = this.state.deltaPosition;
        // console.log('Drag delta: ', ui.deltaX, ui.deltaY);
        // console.log('Drag position: ', ui.x, ui.y);        
        
        this.setState({
            deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
            },
            position: {
                x: ui.x,
                y: ui.y
            }
        });
    };

    onStart = () => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.setState({activeDrags: ++this.state.activeDrags});
    };

    onStop = (e, ui) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.setState({activeDrags: --this.state.activeDrags});

        // Make a call back to the parent to update the note position via api call
        // const updateNotePosition = (noteId: number, title: string, link: string, description: string, pubDate: string, encrypted: string, x: number, y: number, z: number) => {
        this.props.updateNotePosition(this.props.id, this.props.title, this.props.link, this.props.description, this.props.pubDate, this.props.encrypted as boolean, ui.x, ui.y, this.props.z);
    };
    onDrop = (e) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.setState({activeDrags: --this.state.activeDrags});

        if (e.target.classList.contains("drop-target")) {
            alert("Dropped!");
            e.target.classList.remove('hovered');
        }
    };
    onDropAreaMouseEnter = (e) => {
        if (this.state.activeDrags) {
            e.target.classList.add('hovered');
        }
    }
    onDropAreaMouseLeave = (e) => {
        e.target.classList.remove('hovered');
    }

    // For controlled component
    adjustXPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = this.state.controlledPosition;
        this.setState({controlledPosition: {x: x - 10, y}});
    };

    adjustYPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {controlledPosition} = this.state;
        const {x, y} = controlledPosition;
        this.setState({controlledPosition: {x, y: y - 10}});
    };

    onControlledDrag = (e, position) => {
        const {x, y} = position;
        this.setState({controlledPosition: {x, y}});
    };

    onControlledDragStop = (e, position) => {
        this.onControlledDrag(e, position);
        this.onStop(e, position);
    };

render() {
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    // const {deltaPosition, controlledPosition} = this.state;
    return (
            <>
                {/* <div className="box" style={{height: '500px', width: '500px', position: 'relative', overflow: 'auto', padding: '0'}}>
                    <div style={{height: '1000px', width: '1000px', padding: '10px'}}>
                        <Draggable bounds="parent" {...dragHandlers}>
                        <div className="box">
                            I can only be moved within my offsetParent.<br /><br />
                            Both parent padding and child margin work properly.
                        </div>
                        </Draggable>
                        <Draggable bounds="parent" {...dragHandlers}>
                        <div className="box">
                            I also can only be moved within my offsetParent.<br /><br />
                            Both parent padding and child margin work properly.
                        </div>
                        </Draggable>
                    </div>
                </div> */}
                {this.props?.isNoteEditModal ? (
                    <NoteFormEdit isModelShowing={this.props?.setIsNoteEditModal } isNoteSubmitModal={this.props.setIsNoteEditSubmitModal} note={this?.props} pageId={this.props?.pageId}  />
                ) : (
                    <Draggable
                        axis="both"
                        handle=".handle"
                        bounds="parent"
                        defaultPosition={{x: this.props.x, y: this.props.y}}
                        position={null}
                        grid={[25, 25]}
                        scale={1}
                        onStart={this.onStart}
                        onDrag={this.handleDrag}
                        onStop={this.onStop}
                        {...dragHandlers}
                    >
                        <div 
                            className={'handle note note-' + this.props.id} 
                            style={{zIndex: this.props.z}}
                        >
                            <div className='header-banner'>
                                <div className='note-title'>{this.props.title}</div>
                                <div className='note-buttons'>
                                    {/* Edit icon */}
                                    <i className="fa-solid fa-edit fa-xs" onClick={ () => { this.props?.editNote() } }></i>
                                    {/* trashcan icon */}
                                    <i className="fa-solid fa-trash-can fa-xs" onClick={ () => { this.props?.deleteNote() } }></i>
                                </div>
                                {/* <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div> */}
                            </div>
                            <div className='note-content'>
                                {this.props.encrypted ? (
                                    <div className="w-100 text-align-center">
                                        <i 
                                            className="fa-solid fa-lock fa-xs" 
                                            onClick={() => {
                                                // TODO: call parent function to open user credential modal to verify encryption password
                                                // TODO: Create a modal to enter the password
                                                // TODO: Create a table to hold id of encrypted password and note reference id as foreign key
                                            }}
                                        ></i>
                                    </div>
                                ) : (
                                    <>
                                        <div className='note-description'>{this.props.description}</div>
                                        <div className='note-date'>{this.props.pubDate}</div>
                                    </>
                                )}
                                {/* <div className='note-encrypted'>{this.props.encrypted ? 'Encrypted' : 'Unencrypted'}</div> */}
                                <div className='note-encryption'>
                                    {this.props.encrypted ? (
                                        // <i className="fa-solid fa-lock fa-xs"></i>
                                        <></>
                                    ) : (
                                        <>Encryption: &nbsp; <i className="fa-solid fa-unlock fa-xs"></i></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Draggable>  
                )}
            </>
        );
    }
}

export default NoteDraggable;