import { useEffect, useState } from "react";

interface ILoadingProps {
    size?: number;
}

function Loading({size}: ILoadingProps) {
    const [loadingText, setLoadingText] = useState("Loading");

    // Change loading text every 1 second
    useEffect(() => {
        const interval = setInterval(() => {
            if (loadingText === "Loading...") {
                setLoadingText("Loading");
            } else {
                setLoadingText(loadingText + ".");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [loadingText]);

    return (
        <div className="loading">
            <div className="loading-spinner"></div>
            <div className="loading-text">{ loadingText }</div>
        </div>
    );
}

export default Loading;