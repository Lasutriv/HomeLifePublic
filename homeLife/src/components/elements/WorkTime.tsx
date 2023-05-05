import { useEffect, useState } from "react";

interface IWorkTimeProps {
    workTime: {id: string, clockInTime: string, clockOutTime: string, hasTakenBreak: number, dayOfWork: string},
    onDelete(id: string): any
}
  
export const WorkTime = ({ workTime, onDelete }: IWorkTimeProps) => {
    const [workTimeDateString, setWorkTimeDateString] = useState('');  // String used in UI element

    useEffect(() => {
        // https://stackoverflow.com/questions/16616950/date-function-returning-invalid-date-in-safari-and-firefox
        // TODO: Passed date to DateTimeFormat needs to be in ISO8601 format. Example: 2019-10-30T14:01:59.689Z
        console.log('Day of work info below.');
        console.log('Day of work value: ', workTime.dayOfWork);
        console.log('Date value: ', new Date(workTime.dayOfWork));
        // console.log('Date value formatted: ', Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(workTime.dayOfWork).getDate()));
        // console.log('Date value formatted and split: ', Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(workTime.dayOfWork)).split(", "));
        // console.log('Date value final form: ', Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(workTime.dayOfWork)).split(", ")[0]);
        
        
        
        
        // let day = Intl.DateTimeFormat('en-US', { weekday: 'long' })?.format(new Date(workTime.dayOfWork))?.split(", ")?.[0] ?? '';
        // let date = Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })?.format(new Date(workTime.dayOfWork))?.split(", ")?.[0] ?? '';
        // setWorkTimeDateString(day.toString() + ' - ' + date.toString());
        setWorkTimeDateString(workTime.dayOfWork);
    }, [])

    return (
        <div className="content-worktime">
            <i style={{ color: 'red', cursor: 'pointer' }} className="fa-solid fa-x fa-xs" onClick={ () => onDelete(workTime.dayOfWork) }></i>
            <h4>
                {/* hasTakenBreak is stored as 0/1 */}
                {/* <div className="dayofWork">Day of Work{ new Date(workTime.dayOfWork).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</div> */}
                {/* <div className="dayofWork">{ new Date(workTime.dayOfWork).toLocaleDateString('en-us', { weekday:"long"}) } - { new Date(workTime.dayOfWork).toLocaleDateString('en-us', { month: 'short', day: 'numeric'}) }</div> */}
                <div className="dayofWork">{ workTimeDateString }</div>
            </h4>
            <div className="worktime-data">
                <div className="clockInTime">
                    Clock In:&nbsp;
                    { (workTime.clockInTime == "-1") ? (
                        workTime.clockInTime
                    ) : (
                        Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(workTime.clockInTime)).split(", ").pop()
                    )}
                </div>
                <div className="clockOutTime">
                    Clock Out:&nbsp;
                    { (workTime.clockOutTime == "-1") ? (
                        workTime.clockOutTime
                    ) : (
                        Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(workTime.clockOutTime)).split(", ").pop()
                    )}
                </div>
                <div className="hasTakenBreak">Has Taken Break: { workTime.hasTakenBreak === 1 ? "false" : "true"}</div>
            </div>
        </div>
    );
};