import { useEffect, useState } from "react";
import { WorkTime } from "./WorkTime";
import { getCorrectDomain, _settings } from "../../AppSettings";

interface IWorkTimeProp {
    id: string,
    userId: string,
    clockInTime: string, 
    clockOutTime: string, 
    hasTakenBreak: number, 
    dayOfWork: string
}

function ContentWorkTimes({filterAsc, isReload, setIsReload}) {
    const [workTimes, setWorkTimes] = useState([]);
    // const [currentDate, setDate] = useState(`${moment().format("MMM do, YYYY")}`);
    const [isAPIDown, setIsAPIDown] = useState(true);

    // Update worktimes data based on filters
    useEffect(() => {
        let filteredData = filterAggregateWorktimes(workTimes);

        setWorkTimes(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterAsc])

    // Grab data from our app's api
	useEffect(() => {
        try {
            // fetch(getCorrectDomain() + "/api/worktimes")
            //     .then(res => res.json())
            //     .then(data => {
            //         // console.log('Fetched worktime data: ', data[0]);
            //         let aggregatedWorktimes = getAggregateWorktimes(data);
                    
            //         setWorkTimes(aggregatedWorktimes);
            //         setIsAPIDown(false);
            //     })
            //     .catch(error => {
            //         console.log("API Tasks fetch error: '" + JSON.stringify(error) + "'.");
            //         console.log("Is return equal to 'TypeError: Failed to fetch': " + (error === "TypeError: Failed to fetch"));
            //         if (error === "TypeError: Failed to fetch") {
            //             setIsAPIDown(true);
            //         }
            //     }) 
            fetch(getCorrectDomain() + '/api/worktimes', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: JSON.parse(localStorage.getItem('user')).id,
                })
            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            }).then(function (data) {
                console.log("Fetched worktime data: ", data);
                let aggregatedWorktimes = getAggregateWorktimes(data);
                console.log("Aggregate worktime data: ", aggregatedWorktimes);

                aggregatedWorktimes = filterAggregateWorktimes(aggregatedWorktimes);

                setWorkTimes(aggregatedWorktimes);
                setIsAPIDown(false);
                setIsReload(false);
            }).catch(function (error) {
                console.log("API Worktime fetch error: '" + JSON.stringify(error) + "'.");
                console.log("Is return equal to 'TypeError: Failed to fetch': " + (error === "TypeError: Failed to fetch"));
                if (error === "TypeError: Failed to fetch") {
                    setIsAPIDown(true);
                }
            });  
        } catch (error) {
            // console.log("API Tasks fetch error: " + error);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isReload]);

    useEffect(() => {
        if (_settings.IS_CONSTANT_LOADING_ENABLED) {
            const interval = setInterval(() => {
                // Refetch data every second
                // fetch(getCorrectDomain() + "/api/worktimes")
                // .then(res => res.json())
                // .then(data => {
                //     // console.log('Fetched worktime data: ', data[0]);
                //     let aggregatedWorktimes = getAggregateWorktimes(data);
                    
                //     setWorkTimes(aggregatedWorktimes);
                //     setIsAPIDown(false);
                // })
                // .catch(error => {
                //     console.warn('Something went wrong.', error);
                //     setIsAPIDown(true);
                // })
                fetch(getCorrectDomain() + '/api/worktimes', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: JSON.parse(localStorage.getItem('user')).id,
                    })
                }).then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response);
                }).then(function (data) {
                    console.log("Fetched worktime data: ", data);
                    let aggregatedWorktimes = getAggregateWorktimes(data);
                    console.log("Aggregate worktime data: ", aggregatedWorktimes);

                    aggregatedWorktimes = filterAggregateWorktimes(aggregatedWorktimes);
    
                    setWorkTimes(aggregatedWorktimes);
                    setIsAPIDown(false);
                }).catch(function (error) {
                    console.log("API Worktime fetch error: '" + JSON.stringify(error) + "'.");
                    console.log("Is return equal to 'TypeError: Failed to fetch': " + (error === "TypeError: Failed to fetch"));
                    if (error === "TypeError: Failed to fetch") {
                        setIsAPIDown(true);
                    }
                }); 
            }, 2000);
            return () => {
                clearInterval(interval);
            };
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReload]);

    const deleteWorkTime = (dayOfWork: string) => {
        setWorkTimes(workTimes.filter((worktime: IWorkTimeProp) => worktime.dayOfWork !== dayOfWork));

        // Submit deletion to api
        fetch(getCorrectDomain() + '/api/worktimes/delete', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: JSON.parse(localStorage.getItem('user')).id,
                dayOfWork: dayOfWork
            })
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            console.log(data);
        }).catch(function (error) {
            console.warn('Something went wrong.', error);
        });
    };

    // Returns work times in an aggregated format. Work times are stored in various ways with missing data. This
    // is due to the nature of the desired user flow. A user can submit a clock in time whenever, a clock out time
    // whenever, a break whenever, or complete the entire worktime for the day.
    const getAggregateWorktimes = (data) => {
        let tempData = data;
        let aggregatedWorktimes = [];
        if (data[0].length <= 1) {
            console.log("No worktimes to aggregate. Returning empty array from getAggregateWorktimes.");            
            aggregatedWorktimes = data[0];
            return aggregatedWorktimes;
        } else {
            console.log("Worktimes to aggregate: ", data[0]);

            data[0].foreach((worktime: IWorkTimeProp) => {
                // For each worktime, check for other worktimes on the same day. If there is any,
                // then combine them if you can.
                let newWorktime: IWorkTimeProp = {
                    "id": "",
                    "userId": "",
                    "clockInTime": "",
                    "clockOutTime": "",
                    "hasTakenBreak": -1,
                    "dayOfWork": ""
                };
                // eslint-disable-next-line array-callback-return
                let sameDayWorktimes = tempData[0].filter((tempWorktime: IWorkTimeProp) => {
                    // Check for similar worktimes to narrow down selection
                    if (worktime.userId === tempWorktime.userId && worktime.dayOfWork === tempWorktime.dayOfWork) {
                        // console.log("Match worktime");
                        return tempWorktime;
                    }
                });
                // Set new work time from a combination of other worktimes from the same day
                // console.log("Setup new work time:");
                sameDayWorktimes.forEach((sameDayWorkTime: IWorkTimeProp) => {
                    // console.log("New work time: ", newWorktime);
                    
                    // Check if new work time is empty
                    if (newWorktime.id === "" && newWorktime.userId === "" && newWorktime.clockInTime === ""
                        && newWorktime.clockOutTime === "" && newWorktime.hasTakenBreak === -1 
                        && newWorktime.dayOfWork === "") {
                        newWorktime = sameDayWorkTime;
                    }

                    // Set any values that the other worktimes can fill in
                    if (newWorktime.clockInTime === "-1" && sameDayWorkTime.clockInTime !== "-1") {
                        newWorktime.clockInTime = sameDayWorkTime.clockInTime;
                    }
                    if (newWorktime.clockOutTime === "-1" && sameDayWorkTime.clockOutTime !== "-1") {
                        newWorktime.clockOutTime = sameDayWorkTime.clockOutTime;
                    }
                    if (newWorktime.hasTakenBreak === -1 && (sameDayWorkTime.hasTakenBreak === 0 || sameDayWorkTime.hasTakenBreak === 1)) {
                        newWorktime.hasTakenBreak = sameDayWorkTime.hasTakenBreak;
                    } else if (newWorktime.hasTakenBreak !== -1 && (sameDayWorkTime.hasTakenBreak === 0 || sameDayWorkTime.hasTakenBreak === 1)
                                && sameDayWorkTime.clockInTime === '-1' && sameDayWorkTime.clockOutTime === '-1') {
                        // Check if there's a 'take break' entry. If so, that takes precedent over default value of false that other
                        // entries have. 'Take break' work times have -1 set for their clock in/out times.
                        newWorktime.hasTakenBreak = sameDayWorkTime.hasTakenBreak;
                    }
                    if (newWorktime.dayOfWork === "" && sameDayWorkTime.dayOfWork !== "") {
                        newWorktime.dayOfWork = sameDayWorkTime.dayOfWork;
                    }

                    // console.log("New work time after modification check: ", newWorktime);
                });

                if (sameDayWorktimes.length > 0) {
                    // newWorktime is setup since there were same day worktimes
                    if (aggregatedWorktimes.length > 0) {
                        let isIn = false;
                        aggregatedWorktimes.forEach((aWorktime: IWorkTimeProp) => {
                            if (aWorktime.id === newWorktime.id) {
                                isIn = true;
                            }
                        })
                        if (!isIn) {
                            aggregatedWorktimes.push(newWorktime);
                        }
                    } else {
                        aggregatedWorktimes.push(newWorktime);
                    }
                } else {
                    // No same day worktimes so newWorkTime is not setup
                    if (aggregatedWorktimes.length > 0) {
                        let isIn = false;
                        aggregatedWorktimes.forEach((aWorktime: IWorkTimeProp) => {
                            if (aWorktime.id === worktime.id) {
                                isIn = true;
                            }
                        })
                        if (!isIn) {
                            aggregatedWorktimes.push(worktime);
                        }
                    } else {
                        aggregatedWorktimes.push(worktime)
                    }
                }

                // console.log("Worktime: ", worktime);
                // console.log("Same day worktimes: ", sameDayWorktimes);
            });
        }
        // console.log('Aggregated worktimes: ', aggregatedWorktimes);

        return aggregatedWorktimes;
    }

    const filterAggregateWorktimes = (data) => {        
        let aggregatedWorktimes = [...data];

        // Filter tempdata
        if (filterAsc) {
            aggregatedWorktimes.sort(function(a: any, b: any){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(a.dayOfWork).valueOf() - new Date(b.dayOfWork).valueOf();
            });
        }
        if (!filterAsc) {            
            aggregatedWorktimes.sort(function(a: any, b: any){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.dayOfWork).valueOf() - new Date(a.dayOfWork).valueOf();
            });
        }
        
        return aggregatedWorktimes;
    }

    return (
        <>
            { isAPIDown === true ? (
                <div>API is Down</div>
            ) : (
                // <div>{ currentDate.toString() }</div>
                <></>
            ) }
            {/* TODO: Sort worktimes starting from Sunday */}
            { workTimes.length > 0 ? (
                    workTimes.map((workTime) => (<WorkTime key={ workTime.id } workTime={ workTime } onDelete={ deleteWorkTime } />))
                ) : (
                    <div>No work times available.</div>
                )
            }
        </>
    );
}

export default ContentWorkTimes;