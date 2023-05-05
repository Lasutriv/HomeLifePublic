// Tanner Fry
// tannerf1101@yahoo.com
// File for distinguishing between overview bills and upcoming.

import _settings from "../../AppSettings";
import { Bill } from "./Bill";

function ContentBillsUpcoming({isAPIDown, bills, deleteBill}) {

    return (
        <>
            { isAPIDown === true ? (
                <div>API is Down</div>
            ) : (
                // <div>{ currentDate.toString() }</div>
                <>
                    {/* TODO: Add sorting and filtering */}
                    { bills.length > 0 ? (
                        bills.map((bill) => (<Bill key={ bill.id } bill={ bill } onDelete={ deleteBill } isOverview={ false }/>))
                    ) : (
                        <div>No bills available.</div>
                    )}
                </>
            ) }
        </>
    );
}

export default ContentBillsUpcoming;