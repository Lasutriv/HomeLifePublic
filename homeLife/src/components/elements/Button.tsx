import PropTypes from "prop-types";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";

export const Button = (props) => {
    return (
        <button className="btn" onClick={props.onClick}>{ props.text }</button>
    );
}

export const MenuButton = ({text, onClick, style}) => {
    return (
        <button className="menuBtn" onClick={onClick} style={style}>{ text }</button>
    );
}

export const TabButton = (props) => {
    return (
        <button className={"tabBtn " + props.classes} onClick={props.onClick} style={props.style}>{ props.text }</button>
    );
}

export const FilterAscending = (props) => {
    return (
        <button className={"filterBtn " + props.classes} onClick={props.onClick} style={props.style}>
            {props.isAsc ? (
                <><TbSortAscending /> Asc</>
            ) : (
                <><TbSortDescending /> Desc</>
            )}
        </button>
    );
}

export const ListOrGrid = (props) => {
    return (
        <>
            {props.currentView === 'List' ? (
                <i className="fas fa-list" onClick={props.onClick}></i>
            ) : (
                <i className="fas fa-th-large" onClick={props.onClick}></i>
            )}
        </>
    );
}

Button.defaultProps = {
    text: "Button"
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    classes: PropTypes.string
}

MenuButton.defaultProps = {
    text: "Button",
}

MenuButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    classes: PropTypes.string
}

TabButton.defaultProps = {
    text: "Button",
}

TabButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    classes: PropTypes.string
}

ListOrGrid.defaultProps = {
    
}

ListOrGrid.propTypes = {
    currentView: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}