// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for question and answering of the HomeLife app.

import './css/components/Q&A.css';
import { Button } from './components/elements/Button';
import { useEffect, useRef, useState } from 'react';
import QuestionsAndAnswersArticle from './components/elements/dashboardElements/QuestionsAndAnswersArticle';
import QAAddMyHomeLifeToiPhoneHome from './components/content/QAAddMyHomeLifeToiPhoneHome';
import QABillingAndPayment from './components/content/QABillingAndPayment';
import QAPasswordReset from './components/content/QAPasswordReset';

function QuestionsAndAnswers() {
    const [selectedSupport, setSelectedSupport] = useState<number>(0);
    const [hasChangedArticles, setHasChangedArticles] = useState<boolean>(false);
    const scrollArticle = useRef(null);

    useEffect(() => {
        if (scrollArticle.current && hasChangedArticles) {
            scrollArticle.current.scrollIntoView({ behavior: 'smooth' });
            console.log("Scrolling to article");
            
        }
    }, [hasChangedArticles]);

    return (
        <div className="common-container q-and-a-container m-0 p-0">
            <div className="header">
                <div className='header-text-container'>
                    <span className="header-title">We're here to help and</span>
                    <span className="header-subtitle">find answers to your questions</span>
                </div>
                <img src={require('./files/splashScreens/Home-Under-Construction.png')} />
            </div>
            <div className="content">
                <div className="contact-container">
                    Contact us! <br />
                    <a href="mailto:support@digimasteredworks.com">Support@digimasteredworks.com</a>
                </div>
                <div className="support-container">
                    <div className="support-item">
                        <div className="support-item-header">
                            Getting Started
                        </div>
                        <div className="support-item-content">
                            <Button text="Open" onClick={() => {setSelectedSupport(0)}} />
                        </div>
                    </div>
                    <div className="support-item">
                        <div className="support-item-header">
                            Guides
                        </div>
                        <div className="support-item-content">
                        <Button text="Open" onClick={() => {setSelectedSupport(1)}} />
                        </div>
                    </div>
                    <div className="support-item">
                        <div className="support-item-header">
                            Common Questions
                        </div>
                        <div className="support-item-content">
                        <Button text="Open" onClick={() => {setSelectedSupport(2)}} />
                        </div>
                    </div>
                </div>
                <div className='q-and-a-articles-container'>
                    <div className='article-list'>
                        <div className='scroll-article' ref={scrollArticle}></div>
                        {selectedSupport === 0 && (
                            <>
                                <div className='grid-item'>
                                    <QuestionsAndAnswersArticle 
                                        title="Billing and Payment"
                                        content={<QABillingAndPayment />}
                                        setHasSelectedArticle={setHasChangedArticles}
                                    />
                                </div>
                                <div className='grid-item'>
                                    <QuestionsAndAnswersArticle 
                                        title="How to add MyHomeLife to your iPhone home screen"
                                        content={<QAAddMyHomeLifeToiPhoneHome />}
                                        setHasSelectedArticle={setHasChangedArticles}
                                    />
                                </div>
                            </>
                        )}
                        {selectedSupport === 1 && (
                            <>
                            
                            </>
                        )}
                        {selectedSupport === 2 && (
                            <>
                                <div className='grid-item'>
                                    <QuestionsAndAnswersArticle 
                                        title="Password Reset"
                                        content={<QAPasswordReset />}
                                        setHasSelectedArticle={setHasChangedArticles}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionsAndAnswers;