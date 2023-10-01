// Tanner Fry
// tannerf1101@yahoo.com
// File containing content for the Hobbies page of the HomeLife app.

import { useEffect } from "react";

function Hobbies() {

    useEffect(() => {
        // Get user's gardening zone from local storage. If not found, ping the server for the user's gardening zone. If not found,
        // suggest the user to enter their gardening zone or location.
    }, []);

    return (
        <div className='common-container hobbies-container'>
            <h3>Hobbies</h3>
            <ul>
                <li>Gardening</li>
                <li>Cooking</li>
                <li>Woodworking</li>
                <li>Painting</li>
                <li>Photography</li>
                <li>Knitting</li>
                <li>Quilting</li>
                <li>Embroidery</li>
                <li>Scrapbooking</li>
                <li>Writing</li>
                <li>Reading</li>
                <li>Music</li>
                <li>Yoga</li>
                <li>Exercise</li>
                <li>Running</li>
                <li>Fishing</li>
                <li>Hunting</li>
                <li>Pottery</li>
                <li>Calligraphy</li>
                <li>Origami</li>
                <li>Flower Arranging</li>
                <li>Soap Making</li>
            </ul>
        </div>
    );
}

export default Hobbies;