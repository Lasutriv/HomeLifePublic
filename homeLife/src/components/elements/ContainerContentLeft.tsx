import { useState } from "react";
import {FilterAscending} from "./Button";
import ContentWorkTimes from './ContentWorkTimes';

function ContainerContentLeft({clockInFunc, clockOutFunc, clockBreakFunc, clockCompleteFunc, isReload, setIsReload}) {
    const [isFilterAsc, setIsFilterAsc] = useState(true);

    const onClickFilterAsc = (e) => {
        setIsFilterAsc(!isFilterAsc);
        e.preventDefault();
    }
    const onClockInClick = (e) => {
        clockInFunc(true);
        e.preventDefault();
    };
    const onClockOutClick = (e) => {
        clockOutFunc(true);
        e.preventDefault();
    };
    const onClockBreakClick = (e) => {
        clockBreakFunc(true);
        e.preventDefault();
    };
    const onClockCompleteClick = (e) => {
        clockCompleteFunc(true);
        e.preventDefault();
    };

    return (
        <>
            <div className="top-bar-main-dash">
                <h2>Weekly Work</h2>
                <div className="worktime-buttons">
                    <img src={require("../../files/icons/ClockStart.png")} alt="Clock Start" onClick={ onClockInClick }/>
                    <img src={require("../../files/icons/ClockStop.png")} alt="Clock Stop" onClick={ onClockOutClick }/>
                    <img src={require("../../files/icons/ClockBreak.png")} alt="Clock Break" onClick={ onClockBreakClick }/>
                    <img src={require("../../files/icons/ClockDailyHours.png")} alt="Clock Daily Hours" onClick={ onClockCompleteClick }/>
                    {/* <Button text="Clock In" onClick={ onClockInClick }/>
                    <Button text="Clock Out" onClick={ onClockOutClick }/>
                    <Button text="Take Break" onClick={ onClockBreakClick }/>
                    <Button text="Complete" onClick={ onClockCompleteClick }/> */}
                </div>
            </div>
            <div className="worktime-filters">
                {isFilterAsc ? (
                    <><FilterAscending isAsc={true} onClick={onClickFilterAsc} /></>
                ) : (
                    <><FilterAscending isAsc={false} onClick={onClickFilterAsc} /></>
                )}
            </div>
            <div className="column-content">
                <ContentWorkTimes filterAsc={isFilterAsc} isReload={isReload} setIsReload={setIsReload}/>
            </div>
        </>
    );
}

export default ContainerContentLeft;