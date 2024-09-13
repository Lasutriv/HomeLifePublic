// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for question and answering of the HomeLife app.

import '../../../css/components/Q&A.css';
import React from 'react';

function QuestionsAndAnswersArticle({title, content, setHasSelectedArticle}: {title: string, content: React.ReactNode, setHasSelectedArticle: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [hasTitleBeenSelected, setHasTitleBeenSelected] = React.useState<boolean>(false);

    return (
        <div className="q-and-a-article m-0 p-0">
            <div className="article-header">
                <h2 className="article-title" onClick={() => {
                    setHasTitleBeenSelected(!hasTitleBeenSelected)
                    setHasSelectedArticle(!hasTitleBeenSelected);
                }}>{title}</h2>
            </div>
            <div className={'article-content ' + (hasTitleBeenSelected ? 'selected' : '')}>
                {content}
            </div>
        </div>
    );
}

export default QuestionsAndAnswersArticle;