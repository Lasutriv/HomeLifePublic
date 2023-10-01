// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the Pricing page of the HomeLife app.

import useScript from "./components/Common";

function Pricing() {
    useScript('https://js.stripe.com/v3/pricing-table.js')

    return (
        <div className='common-container pricing-container m-0 p-0'>
            <div className='lifted-container-95'>
                <h3 className="text-align-center">Pricing</h3>
                {/* <p className="text-align-center">Check back later for pricing!</p> */}
                <p className="text-align-center">We offer a variety of pricing options to fit your needs.</p>
                <p className="notice text-align-center">Before selecting a plan below, please make sure you've created an account first. Click the top left corner menu button and create an account!</p>
                <stripe-pricing-table pricing-table-id="prctbl_1Nteh2BnQFuvZbgRbf39K474"
                                      publishable-key={process.env.REACT_APP_TEST_SECRET_KEY}>
                </stripe-pricing-table>
            </div>
        </div>
    );
}

export default Pricing;