import { useEffect, useState } from "react";
import { Task } from "./Task";
import { getCorrectDomain, _settings } from "../../AppSettings";

interface ITaskProps {
    id: number,
    userId: number,
    title: string,
    description: string,
    reminder: boolean,
    dueDate: string,
    dueTime: string
}

function ContentTasks({isReload, setIsReload}) {
    const [tasks, setTasks] = useState([]);
    // const [currentDate, setDate] = useState(`${moment().format("MMM do, YYYY")}`);
    const [isAPIDown, setIsAPIDown] = useState(true);

    useEffect(() => {
        if (_settings.IS_CONSTANT_LOADING_ENABLED) {
            const interval = setInterval(() => {
                // Refetch data every 2 second
                fetch(getCorrectDomain() + '/api/tasks', {
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
                    console.log("Fetched task data: " + JSON.stringify(data));
                    setTasks(data[0]);
                    setIsAPIDown(false);
                }).catch(function (error) {
                    console.log("API Tasks fetch error: '" + JSON.stringify(error) + "'.");
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
    }, []);

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));

        // Submit deletion to api
        let task: ITaskProps = tasks.find((task) => task.id === id)
        // console.log('Task for deletion: ', task);
        
        fetch(getCorrectDomain() + '/api/tasks/delete', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: task.id,
                userId: JSON.parse(localStorage.getItem('user')).id,
                title: task.title,
                description: task.description,
                reminder: task.reminder,
                dueDate: task.dueDate.toString(),
                dueTime: task.dueTime.toString(),
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

    // Grab data from our app's api
	useEffect(() => {
        try {
            fetch(getCorrectDomain() + '/api/tasks', {
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
                console.log("Fetched task data: " + JSON.stringify(data));
                setTasks(data[0]);
                setIsAPIDown(false);
                setIsReload(false);
            }).catch(function (error) {
                console.log("API Tasks fetch error: '" + JSON.stringify(error) + "'.");
                console.log("Is return equal to 'TypeError: Failed to fetch': " + (error === "TypeError: Failed to fetch"));
                if (error === "TypeError: Failed to fetch") {
                    setIsAPIDown(true);
                }
            });   
        } catch (error) {
            // console.log("API Tasks fetch error: " + error);
        }
	}, [isReload])

    return (
        <>
            { isAPIDown === true ? (
                <div>API is Down</div>
            ) : (
                // <div>{ currentDate.toString() }</div>
                <></>
            ) }
            {/* TODO: Add sorting and filtering. */}
            { tasks.length > 0 ? (
                    tasks.map((task) => (<Task key={ task.id } task={ task } onDelete={ deleteTask } />))
                ) : (
                    <div>No tasks available.</div>
                )
            }
        </>
    );
}

export default ContentTasks;