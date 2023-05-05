// Tanner Fry

import React, { useContext, useEffect, useState } from 'react';

import ContainerContentRight from "./components/elements/ContainerContentRight.js";
import ContainerContentLeft from './components/elements/ContainerContentLeft.js';
import Modal from "./components/elements/Modal.js";
import GenericOkayForm from "./components/forms/GenericOkayForm";
import BillForm from './components/forms/BillForm.tsx';
import TaskForm from "./components/forms/TaskForm";
import WorkTimeClockInForm from './components/forms/WorkTimeClockInForm.js';
import WorkTimeClockOutForm from './components/forms/WorkTimeClockOutForm.js';
import WorkTimeClockBreakForm from './components/forms/WorkTimeClockBreakForm.js';
import WorkTimeCompleteForm from './components/forms/WorkTimeCompleteForm.js';
import { GlobalContext } from './AppSettings.ts';
import ContainerContentCenter from './components/elements/ContainerContentCenter';

function GeneralDashboard() {
    const {globalData, setGlobalData} = useContext(GlobalContext);  // Holds global data
    const [isBillModal, setIsBillModal] = useState(false);
	const [isBillSubmitModal, setIsBillSubmitModal] = useState(false);
    const [isTaskModal, setIsTaskModal] = useState(false);
	const [isTaskSubmitModal, setIsTaskSubmitModal] = useState(false);
    const [isClockInModal, setIsClockInModal] = useState(false);
	const [isClockInSubmitModal, setIsClockInSubmitModal] = useState(false);
    const [isClockOutModal, setIsClockOutModal] = useState(false);
	const [isClockOutSubmitModal, setIsClockOutSubmitModal] = useState(false);
    const [isClockBreakModal, setIsClockBreakModal] = useState(false);
	const [isClockBreakSubmitModal, setIsClockBreakSubmitModal] = useState(false);
    const [isClockCompleteModal, setIsClockCompleteModal] = useState(false);
	const [isClockCompleteSubmitModal, setIsClockCompleteSubmitModal] = useState(false);
    
    return (
        <div className='general-dashboard-container'>
            {/* Content */}
            <div className="content-left-column">
                <ContainerContentLeft clockInFunc={setIsClockInModal} clockOutFunc={setIsClockOutModal} clockBreakFunc={setIsClockBreakModal} clockCompleteFunc={setIsClockCompleteModal} />
            </div>
            <div className="content-center-column">
                <ContainerContentCenter clickFunc={setIsBillModal} />
            </div>
            <div className="content-right-column">
                <ContainerContentRight clickFunc={setIsTaskModal} />
            </div>

            {/* Modals */}
            {isBillSubmitModal ? (
                <GenericOkayForm title="Submitted!" description="Your bill has been submitted." isShowingGenericOkayForm={setIsBillSubmitModal}/>
            ) : (
                <></>
            )}
            {isBillModal ? (
                <Modal 
                    title="Add Bill" 
                    textInfo="Add a bill by filling in the below information."
                    form={<BillForm isBillSubmitModal={setIsBillSubmitModal} isModelShowing={setIsBillModal} />}
                />
            ) : (
                <></>
            )}
            {isTaskSubmitModal ? (
                <GenericOkayForm title="Submitted!" description="Your task has been submitted." isShowingGenericOkayForm={setIsTaskSubmitModal}/>
            ) : (
                <></>
            )}
            {isTaskModal ? (
                <Modal 
                    title="Add Task" 
                    textInfo="Add a task by filling in the below information."
                    form={<TaskForm isTaskSubmitModal={setIsTaskSubmitModal} isModelShowing={setIsTaskModal} />}
                />
            ) : (
                <></>
            )}
            {isClockInSubmitModal ? (
                <GenericOkayForm title="Submitted!" description="Your time has been saved." isShowingGenericOkayForm={setIsClockInSubmitModal}/>
            ) : (
                <></>
            )}
            {isClockInModal ? (
                <Modal 
                    title="Clock In" 
                    textInfo="Add your clock in time and day."
                    form={<WorkTimeClockInForm isClockInSubmitModal={setIsClockInSubmitModal} isModelShowing={setIsClockInModal} />}
                />
            ) : (
                <></>
            )}
            {isClockOutSubmitModal ? (
                <GenericOkayForm title="Submitted!" description="Your time has been saved." isShowingGenericOkayForm={setIsClockOutSubmitModal}/>
            ) : (
                <></>
            )}
            {isClockOutModal ? (
                <Modal 
                    title="Clock Out" 
                    textInfo="Add your clock out time and day."
                    form={<WorkTimeClockOutForm isClockOutSubmitModal={setIsClockOutSubmitModal} isModelShowing={setIsClockOutModal} />}
                />
            ) : (
                <></>
            )}
            {isClockBreakSubmitModal ? (
                <GenericOkayForm title="Submitted!" description="Your time has been saved." isShowingGenericOkayForm={setIsClockBreakSubmitModal}/>
            ) : (
                <></>
            )}
            {isClockBreakModal ? (
                <Modal 
                    title="Clock Out" 
                    textInfo="Add your clock out time and day."
                    form={<WorkTimeClockBreakForm isClockBreakSubmitModal={setIsClockBreakSubmitModal} isModelShowing={setIsClockBreakModal} />}
                />
            ) : (
                <></>
            )}
            {isClockCompleteSubmitModal ? (
                <GenericOkayForm title="Submitted!" description="Your time has been saved." isShowingGenericOkayForm={setIsClockCompleteSubmitModal}/>
            ) : (
                <></>
            )}
            {isClockCompleteModal ? (
                <Modal 
                    title="Clock Out" 
                    textInfo="Add your clock out time and day."
                    form={<WorkTimeCompleteForm isClockCompleteSubmitModal={setIsClockCompleteSubmitModal} isModelShowing={setIsClockCompleteModal} />}
                />
            ) : (
                <></>
            )}
        </div>
    );
}

export default GeneralDashboard;