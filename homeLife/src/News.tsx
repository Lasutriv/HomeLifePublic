// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the News page of the HomeLife app.

import { useEffect, useState } from "react";
import { APIGetNewsLatest } from "./api/Common";
import { Button } from "./components/elements/Button";
import SecurityClearance, { AppFeatureType } from "./components/privateRoute/SecurityClearance";
import { Link } from "react-router-dom";

interface INewsItemProps {
    title: string;
    link: string;
    description: string;
    pubDate: string;
    source_id: string;
    keywords: string;
    creator: string;
    image_url: string;
    video_url: string;
    content: string;
    country: string;
    category: string;
    language: string;
    nextPage: string;
}

function News() {
    const [news, setNews] = useState([]);
    const [isViewingFullNewsItem, setIsViewingFullNewsItem] = useState(-1);
    // const [newsSource, setNewsSource] = useState<NewsSources>();

    // type NewsSources = 'MHL News' | 'Domestic' | 'International';

    useEffect(() => {
        const getNews = async () => {
            const newsAPIResponse = await APIGetNewsLatest();
            console.log("Client side received response for getting news: ", newsAPIResponse);
            setNews(newsAPIResponse?.[0].response.results);
        };

        getNews();
    }, []);

    const handleNewsItemReadMore = (index) => { 
        // Modify the news item of the index to show the full content
        let newsItem = news[index];
        newsItem.content = newsItem.content.replace('...', '');
        news[index] = newsItem;
        setNews([...news]);
        setIsViewingFullNewsItem(index);
    }

    return (
        <div className='common-container news-container'>
            <SecurityClearance 
                featureType={AppFeatureType.News} 
                noClearanceNote={
                    <>News</>
                }
                feature={
                    <>
                        <div className="news-header">
                            {/* <div className="news-header-item">
                                <select value={ newsSource } onChange={ (e) => {setNewsSource(e.target.value as NewsSources)} }>
                                    <option value="MHL News">MHL News</option>
                                    <option value="Domestic">Domestic</option>
                                    <option value="International">International</option>
                                </select>
                            </div> */}
                        </div>
                        <div className='news-content'>
                            <h1>News</h1>
                            {news?.map((newsItem: INewsItemProps, index) => {
                                return (
                                    <div className='news-item'>
                                        <h2><a href={newsItem.link} target="_blank" rel="noreferrer">{newsItem.title}</a></h2>
                                        <p className="news-headers">
                                            <div className="tag">{newsItem.pubDate}</div>
                                            <div className="tag">{newsItem.country} </div>
                                            <div className="tag">{newsItem.category}</div>
                                            {/* <div className="tag">{newsItem.creator}</div> */}
                                        </p>
                                        <p className="news-description">{newsItem.description}</p>
                                        <p className="news-content">
                                            {/* Trim and add a read more button */}
                                            {(newsItem.content?.length > 500 && isViewingFullNewsItem !== index) ? newsItem.content.substring(0, 500) + '...' : newsItem.content}
                                            {(newsItem.content?.length > 500 && isViewingFullNewsItem !== index) ? <Button text='Read more' onClick={() => handleNewsItemReadMore(index)} /> : null}
                                        </p>
                                    </div>
                                );
                            })}
                            <div className="news-footer">
                                <p className="text-center">News from: <a href="https://newsdata.io/">NewsData</a></p>
                            </div>
                        </div>
                    </>
                }
            />
        </div>
    );
}

export default News;