// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the Privacy Policy page of the HomeLife app.

import { useNavigate } from "react-router";
import './css/components/About.css';

function PrivacyPolicy() {
    const navigate = useNavigate();
    

    return (
        <div className='privacy-container'>
            <div className="content-container">
                <div className="title">Privacy Policy</div>
                <p>DigiMastered Works LLC PRIVACY POLICY</p>
                <p>----</p>
                <p>Last Update: 9/25/2021</p>
                <p>----</p>
                <p>
                    This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from Https://Digimasteredworks.com (the “Site”).
                </p>
                <h3>PERSONAL INFORMATION WE COLLECT</h3>
                <p>
                    When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”
                </p>


                <p>
                    We collect Device Information using the following technologies:
                </p>
                <p>
                    “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.<br/>
                    “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.<br/>
                    “Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.<br/>
                    Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers or cryptocurrency wallet addresses), email address, and phone number.  We refer to this information as “Order Information".<br/>
                </p>
                <p>
                    When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.
                </p>
                <h3>HOW DO WE USE YOUR PERSONAL INFORMATION?</h3>
                <p>
                    We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).  Additionally, we use this Order Information to:
                </p>
                <p>
                    Communicate with you;<br/>
                    Protect your information;<br/>
                    Screen our orders for potential risk or fraud; and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.<br/>
                    We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).<br/>
                </p>
                <h3>SHARING YOUR PERSONAL INFORMATION</h3>
                <p>
                    We may share your Personal Information with third parties to help us use your Personal Information, as described above. We do not sell your Personal Information with third parties. 
                </p>
                <p>
                    Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.  
                </p>
                <h3>BEHAVIOURAL ADVERTISING</h3>
                <p>
                    We do not use your Personal Information to provide you with targeted advertisements or marketing communications. For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
                </p>
                <p>
                    You can opt out of targeted advertising by visiting the Digital Advertising Alliance’s opt-out portal at:  http://optout.aboutads.info/.
                </p>
                <h3>DO NOT TRACK</h3>
                <p>
                    Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.
                </p>
                <h3>YOUR RIGHTS</h3>
                <p>
                    If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
                </p>
                <p>
                    Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above.  Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.  
                </p>
                <h3>DATA RETENTION</h3>
                <p>
                    When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.  
                </p>
                <h3>MINORS</h3>
                <p>The Site is not intended for individuals under the age of 18.</p>
                <h3>CHANGES</h3>
                <p>
                    We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
                </p>
                <h3>CONTACT US</h3>
                <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:support@digimasteredworks.com">support@digimasteredworks.com</a>.</p>
            </div>
        </div>
    );
}

export default PrivacyPolicy;