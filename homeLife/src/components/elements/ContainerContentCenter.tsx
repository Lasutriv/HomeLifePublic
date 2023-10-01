import { useEffect, useState } from "react";
import {Button, ListOrGrid, TabButton} from "./Button";
import ContentBillsUpcoming from "./ContentBillsUpcoming";
import ContentBillsOverview from "./ContentBillsOverview";
import { TruncateDecimals } from "../Common";
import { IBillProps } from "./Bill";
import { APIGetBills, APIGetBillsByUser, APIGetSharedBills, ISharedBillProps } from "../../api/Common";
import { getCorrectDomain, _settings } from "../../AppSettings";

function ContainerContentCenter({clickFunc}) {
    const [bills, setBills] = useState([]);
    // const [currentDate, setDate] = useState(`${moment().format("MMM do, YYYY")}`);
    const [isAPIDown, setIsAPIDown] = useState(true);
    const [currentView, setCurrentView] = useState('List');
    const [isShowingUpcomingBills, setIsShowingUpcomingBills] = useState(true);
    // Amounts
    const [userBillsAmount, setUserBillsAmount] = useState(0.0);
    const [sharedBillsAmount, setSharedBillsAmount] = useState(0.0);
    const [totalBillsAmount, setTotalBillsAmount] = useState(0.0);

    // Update total bills
    useEffect(() => {
        let totalAmount = 0.0;
        
        bills.forEach((bill: IBillProps) => {
            totalAmount += bill.amount;
        });

        setTotalBillsAmount(totalAmount);
    }, [bills]);

    // Refetch data every second
    useEffect(() => {
        const fetchData = async () => {           
            const allBills = await APIGetBills();
            const currentUserId = JSON.parse(localStorage.getItem('user')).id;
            const currentUserBills = await APIGetBillsByUser(currentUserId);
            const sharedBills = await APIGetSharedBills();
            const allDataForSharedBillsWithCurrentUser = [];
            console.log('Shared bills: ', JSON.stringify(sharedBills, null, '\t'));

            // Get users bills amount
            let usersAmount = 0.0;
            currentUserBills?.forEach((bill: IBillProps) => {
                usersAmount += bill.amount;
            })
            setUserBillsAmount(usersAmount);

            if (sharedBills.length > 0) {
                // Check for any bills that are shared with the current user
                const sharedBillsWithCurrentUser = [];
                sharedBills.forEach((sharedBill: ISharedBillProps) => {
                    if (sharedBill.userIdB === currentUserId) {
                        sharedBillsWithCurrentUser.push(sharedBill);
                    }
                });
                // Get exact bill data for all shared bills with current user and add to a list for later aggregation
                // with current user's bills
                let sharedAmount = 0.0;
                allBills.forEach((bill: IBillProps) => {
                    sharedBillsWithCurrentUser.forEach((sharedBill: ISharedBillProps) => {
                        if (bill.id === sharedBill.billId) {
                            sharedAmount += bill.amount
                            allDataForSharedBillsWithCurrentUser.push(bill);
                        }
                    })
                })
                setSharedBillsAmount(sharedAmount);
            }

            let allCurrentUserBills = [...currentUserBills];
            allDataForSharedBillsWithCurrentUser.forEach((sharedBillWithCurrentUser: ISharedBillProps) => {
                allCurrentUserBills.push(sharedBillWithCurrentUser);
            })

            setBills(allCurrentUserBills);

            // Get total for all bills
            let totalAmount = 0.0;
            allCurrentUserBills.forEach((bill: IBillProps) => {
                totalAmount += bill.amount;
            })
            setTotalBillsAmount(totalAmount);

            if (typeof currentUserBills !== "boolean" && currentUserBills !== true) {
                setIsAPIDown(false);
            } else {
                setIsAPIDown(true);
            }
        }

        if (_settings.IS_CONSTANT_LOADING_ENABLED) {
            const interval = setInterval(() => {
                fetchData();
            }, 2000);
            return () => {
                clearInterval(interval);
            };
        } else {
            fetchData();
        }
    }, []);

    const deleteBill = (id) => {
        setBills(bills.filter((bill) => bill.id !== id));

        // Submit deletion to api
        let bill = bills.find((bill) => bill.id === id)
        fetch(getCorrectDomain() + '/api/bills/delete', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: bill.id,
                userId: JSON.parse(localStorage.getItem('user')).id,
                title: bill.title,
                description: bill.description,
                reminder: bill.reminder,
                dueDate: bill.dueDate.toString(),
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

    const onClick = (e) => {
        clickFunc(true);
        e.preventDefault();
    };

    const handleSelectUpcomingBills = (e) => {
        setIsShowingUpcomingBills(true);
        e.preventDefault();
    };

    const handleSelectOverviewBills = (e) => {
        setIsShowingUpcomingBills(false);
        e.preventDefault();
    };

    const handleViewChange =(e) => {
        if (currentView === 'List') {
            setCurrentView('Grid');
        } else {
            setCurrentView('List');
        }

        e.preventDefault();
    };

    return (
        <>
            <div className="top-bar-main-dash">
                <div className="bill-options">
                    <TabButton classes={isShowingUpcomingBills ? ('selected') : ('')} text="Upcoming Bills" onClick={handleSelectUpcomingBills}/>
                    <TabButton classes={!isShowingUpcomingBills ? ('selected') : ('')} text="Overview" onClick={handleSelectOverviewBills}/>
                </div>
                <ListOrGrid currentView={currentView} onClick={handleViewChange} />
                <Button text="Add" onClick={ onClick }/>
            </div>
            <div className="kpi-container">
                <div className="user-bills">Your Bills: ${TruncateDecimals(userBillsAmount, 2)}</div>
                <div className="shared-bills">Shared Bills: ${TruncateDecimals(sharedBillsAmount, 2)}</div>
                <div className="total-bills">Total Bills: ${TruncateDecimals(totalBillsAmount, 2)}</div>
            </div>
            <div className={"column-content " + (currentView === 'List' ? ('display-list') : ('display-grid'))}>
                {isShowingUpcomingBills && <ContentBillsUpcoming isAPIDown={isAPIDown} bills={bills} deleteBill={deleteBill} />}
                {!isShowingUpcomingBills && <ContentBillsOverview isAPIDown={isAPIDown} bills={bills} deleteBill={deleteBill} />}
            </div>
        </>
    );
}

export default ContainerContentCenter;