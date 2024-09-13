import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ExitButton } from "../elements/Button";

function UnderConstruction({title, text}) {

    return (
        <div className="under-construction-container">
            <div className="under-construction-title">{title}</div>
            <div className="under-construction-text">{text}</div>
            <img className="under-construction-image" src={require("../../files/upgrades/Under-Construction-Image.png")} />
        </div>
    );
}

export default UnderConstruction;