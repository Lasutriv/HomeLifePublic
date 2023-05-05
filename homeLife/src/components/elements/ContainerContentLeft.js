import { useEffect, useState } from "react";
import {Button, FilterAscending} from "./Button";
import ContentWorkTimes from './ContentWorkTimes';

function ContainerContentLeft({clockInFunc, clockOutFunc, clockBreakFunc, clockCompleteFunc}) {
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
            <div className="top-bar">
                <h2>Weekly Work</h2>
                <div className="worktime-buttons">
                    <Button text="Clock In" onClick={ onClockInClick }/>
                    <Button text="Clock Out" onClick={ onClockOutClick }/>
                    <Button text="Take Break" onClick={ onClockBreakClick }/>
                    <Button text="Complete" onClick={ onClockCompleteClick }/>
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
                <ContentWorkTimes filterAsc={isFilterAsc} />
            </div>
        </>
    );
}

export default ContainerContentLeft;