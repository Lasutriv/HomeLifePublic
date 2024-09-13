// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the Maintenance page of the HomeLife app.
import './css/dashboards/Maintenance.css';

import { useEffect, useState } from "react";
import { COMMON_MAINTENANCE_DATA, DUMMY_MAINTENANCE_DATA } from "./components/MiscData";
import { ExitButton } from './components/elements/Button';
import { elementIsVisibleInViewport } from './components/Common';
import { useAppDispatch, useAppSelector } from './AppHooks';
import { setSelectedMaintenanceItem } from './slices/MaintenanceSlice';
import Modal, { ModalTooltip } from './components/elements/Modal';
import MaintenanceItemFormEdit from './components/forms/MaintenanceItemFormEdit';
import GenericOkayForm from './components/forms/GenericOkayForm';
import SecurityClearance, { AppFeatureType } from './components/privateRoute/SecurityClearance';

export interface IMaintenanceItemsProps {
    taskName: string;  // Name of the maintenance task
    taskDescription: string;  // Description of the maintenance task
    dueDate: Date;  // When the maintenance task is currently due
    reoccuringDue: ReoccuringDue;  // How often the maintenance task is due
    cost: number;  // Average cost of the maintenance task
    icon: string;  // Icon for the maintenance task
    status: Status;  // Status of the maintenance task (overdue, due, completed, pending, failed)
    toolTip: {
        title: string;  // Title of the tooltip
        description: string;  // Description of the tooltip
    }
}

type Status = 'overdue' | 'due' | 'completed' | 'pending' | 'failed';
type ReoccuringDue = 'daily' | 'weekly' | 'bi-weekly' | 'monthly' | 'bi-monthly' | 'quarterly' | 'yearly' | 'bi-yearly';

function Maintenance() {
    const [maintenanceItems, setMaintenanceItems] = useState([...DUMMY_MAINTENANCE_DATA] as IMaintenanceItemsProps[]);  // Array of maintenance items
    const [commonMaintenanceItems] = useState<IMaintenanceItemsProps[]>(COMMON_MAINTENANCE_DATA);  // Array of common maintenance items
    const maintenanceColorKeys = [
        'completed', 
        'pending', 
        'due', 
        'overdue', 
        'failed'
    ];
    const [isToolTipModalOpen, setIsToolTipModalOpen] = useState<boolean>(false);  // Is the tooltip modal open
    const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState<boolean>(false);  // Is the maintenance modal open
    const [isMaintenanceModalSubmitOpen, setIsMaintenanceModalSubmitOpen] = useState<boolean>(false);  // Is the maintenance modal submit open
    const [currentCommonMaintenanceTooltipItem, setCurrentCommonMaintenanceTooltipItem] = useState<IMaintenanceItemsProps | null>(null);  // Current common maintenance item that is being hovered over
    const [currentCommonMaintenanceTooltipItemPosition, setCurrentCommonMaintenanceTooltipItemPosition] = useState<{x: number, y: number}>({x: 0, y: 0});  // Current common maintenance item that is being hovered over
    const selectedMaintenanceItem = useAppSelector(state => state.maintenance.selectedMaintenanceItem);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // When selected is changed, add modal popup for user to edit the maintenance item
        if (selectedMaintenanceItem !== null) {
            setIsMaintenanceModalOpen(true);
        } else {
            setIsMaintenanceModalOpen(false);
        }
    }, [selectedMaintenanceItem]);

    const handleMaintenanceContainerScroll = () => {
        // console.log("Scrolling");
            
        let headers = document.querySelectorAll('.maintenance-container .header-with-items');
        let headerCementedItems = document.querySelectorAll('.maintenance-container .header-cemented-item');

        if (headers.length > 1) {
            if (elementIsVisibleInViewport(headerCementedItems[0], true)) {
                headers[1].classList.remove('sticky');
                headers[0].classList.add('sticky');
            } else {
                headers[1].classList.add('sticky');
                headers[0].classList.remove('sticky');
            }
        }
    
        // console.log("Headers: ", headers);
        // console.log("Header cemented items: ", headerCementedItems);
    }

    const onCommonMaintenanceItemHover = (item: IMaintenanceItemsProps) => {
        // Display tooltip with information about the common maintenance item
        setIsToolTipModalOpen(true);
        // Get position of item
        let itemElement = document.querySelector('.item-name-' + item.taskName.toLowerCase().replace(/\s/g, '-'));
        let itemPosition = itemElement.getBoundingClientRect();
        const parentPos = document.querySelector('.grid-container-common-tasks').getBoundingClientRect();
        const relativePos = {top: 0, right: 0, bottom: 0, left: 0};
        relativePos.top = itemPosition.top - parentPos.top;
        relativePos.right = itemPosition.right - parentPos.right;
        relativePos.bottom = itemPosition.bottom - parentPos.bottom;
        relativePos.left = itemPosition.left - parentPos.left;
        
        
        setCurrentCommonMaintenanceTooltipItemPosition((prevstate) => {
            return {
                ...prevstate,
                x: relativePos.left,
                y: relativePos.top + itemPosition.height + 10,
            }
        });
        setCurrentCommonMaintenanceTooltipItem(item);
    }

    const onCommonMaintenanceItemExit = (item: IMaintenanceItemsProps) => {
        // Hide tooltip with information about the common maintenance item
        setIsToolTipModalOpen(false);
        setCurrentCommonMaintenanceTooltipItem(null);
    }

    const removeMaintenanceObjective = (taskName: string) => {
        setMaintenanceItems(maintenanceItems.filter((item: IMaintenanceItemsProps) => item.taskName !== taskName));
        // Send api request to remove maintenance objectives from database for the user

    }

    const handleSearchingMaintenanceObjectives = (e: any) => {
        let searchValue = e.target.value;
        let newMaintenanceItems = DUMMY_MAINTENANCE_DATA.filter((item: IMaintenanceItemsProps) => {
            return item.taskName.toLowerCase().includes(searchValue.toLowerCase());
        });
        setMaintenanceItems(newMaintenanceItems);
    }

    return (
        <div className='common-container maintenance-container' onScroll={handleMaintenanceContainerScroll}>
            <SecurityClearance 
                featureType={AppFeatureType.Maintenance} 
                feature={
                    <>
                        <div className='header-with-items'>
                            <h3>Common home maintenance needs</h3>
                            <div className='grid-color-key-wrapper'>
                                <div className='grid-color-key-title'>
                                    <h4>Key</h4>
                                </div>
                                <div className='grid-color-key'>
                                    {maintenanceColorKeys.map((key: string) => {
                                        return (
                                            <div className='grid-color-key-item'>
                                                {/* Make sure key is capitalized */}
                                                <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                                                <div className={'grid-color-key-item-color ' + key} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='header-cemented-item' />
                        <div className="grid-container-common-tasks">
                            {commonMaintenanceItems.map((item: IMaintenanceItemsProps, index) => {
                                return (
                                    <div 
                                        className={"grid-item " + item.status + " item-name-" + item.taskName.toLowerCase().replace(/\s/g, '-')}
                                        onClick={() => {
                                            dispatch(setSelectedMaintenanceItem(item));
                                        }}
                                        onMouseEnter={(e) => {onCommonMaintenanceItemHover(item)}}
                                        // onMouseLeave={(e) => {onCommonMaintenanceItemExit(item)}}
                                        key={index}
                                    >
                                        <div className="maintenance-item">
                                            <div className="shadow" />
                                            <h4>{item.taskName}</h4>
                                        </div>
                                    </div>
                                );
                            })}
                            {isToolTipModalOpen && currentCommonMaintenanceTooltipItem.toolTip.title !== ""
                            && currentCommonMaintenanceTooltipItem.toolTip.description !== "" ? (
                                <ModalTooltip 
                                    title={currentCommonMaintenanceTooltipItem.toolTip.title} 
                                    textInfo={currentCommonMaintenanceTooltipItem.toolTip.description}
                                    position={currentCommonMaintenanceTooltipItemPosition}
                                    onClick={() => {
                                        setIsToolTipModalOpen(false);
                                        setCurrentCommonMaintenanceTooltipItem(null);
                                    }}
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className='header-with-items'>
                            <h3>Current maintenance objectives </h3>
                        </div>
                        <div className='header-cemented-item' />
                        <div className="search-field">
                            <input className="generic-search" type="text" placeholder="Search for current objectives..." onChange={(e) => {handleSearchingMaintenanceObjectives(e)}} />
                        </div>
                        <div className="maintenance-container-items">
                            {maintenanceItems.map((item: IMaintenanceItemsProps, index) => {
                                return (
                                    <div className="maintenance-item" key={index}>
                                        <div className="shadow" />
                                        <ExitButton handleCallback={removeMaintenanceObjective}/>
                                        <div className='header'>
                                            <h4 className='taskName'>{item.taskName}</h4>
                                            <div className='side-right'>
                                                <p className='dueDate'><span style={{color: 'wheat'}}>Due:</span> {item.dueDate.toDateString()}</p>
                                                <p className='reoccuringDue'><span style={{color: 'wheat'}}>Reoccuring:</span> {item.reoccuringDue}</p>
                                            </div>
                                        </div>
                                        <p className='taskDescription'>{item.taskDescription}</p>
                                        {/* <p>Reoccuring: {Math.floor(Math.random() * 30) + 1} days</p> */}
                                    </div>
                                );
                            })}
                        </div>
                        {/* Modals */}
                        {isMaintenanceModalSubmitOpen ? (
                            <GenericOkayForm title="Submitted!" description="Your maintenance item has been modified." isShowingGenericOkayForm={setIsMaintenanceModalSubmitOpen}/>
                        ) : (
                            <></>
                        )}
                        {isMaintenanceModalOpen && selectedMaintenanceItem !== null ? (
                            <Modal 
                                title='Edit Maintenance Item' 
                                callback={() => {setIsMaintenanceModalOpen(false)}} 
                                form={
                                    <MaintenanceItemFormEdit 
                                        maintenanceItem={selectedMaintenanceItem}
                                        isModelShowing={setIsMaintenanceModalOpen}
                                        setSubmitModal={setIsMaintenanceModalSubmitOpen}
                                    />
                                }
                            />
                        ) : (
                            <></>
                        )}
                    </>
                }
            />
        </div>
    );
}

export default Maintenance;