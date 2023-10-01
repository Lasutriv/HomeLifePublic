// Tanner Fry
// tannerf1101@yahoo.com
// File for distinguishing between overview bills and upcoming.

import { Bill } from "./Bill";

// The overview bills show a general all bills with their data condensed
function ContentBillsOverview({isAPIDown, bills, deleteBill}) {
    return (
        <>
            { isAPIDown === true ? (
                <div>API is Down</div>
            ) : (
                // <div>{ currentDate.toString() }</div>
                <>
                    {/* TODO: Add sorting and filtering */}
                    { bills.length > 0 ? (
                        bills.map((bill: { id: any; title: string; description: string; dueDate: string; reminder: number; autopay: number; amount: number; }) => (<Bill key={ bill.id } bill={ bill } onDelete={ deleteBill } isOverview={ true }/>))
                    ) : (
                        <div>No bills available.</div>
                    )}
                </>
            ) }
        </>
    );
}

export default ContentBillsOverview;