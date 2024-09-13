import PropTypes from "prop-types";
import { forwardRef, useEffect, useState } from "react";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { incrementUserClick } from "../../slices/UserSlice";
import { useAppDispatch } from "../../AppHooks";

interface IButtonProps {
    text: string;
    onClick?: any;
    classes?: string;
    icon?: any;
    styles?: object;
}

export const Button = forwardRef((props: IButtonProps, ref: any) => {
    const [hasIcon, setHasIcon] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (props.icon) {
            setHasIcon(true);
        }
    }, [props.icon]);
    

    return (
        <>
            {hasIcon ? (
                <button className={"btn-main " + (props.classes === undefined ? "" : props.classes)} onClick={props.onClick} ref={ref} style={props.styles}>
                    <div className="btn-container" onClick={() => { dispatch(incrementUserClick()) }}>
                        {props.icon}
                        {props.text}
                    </div>
                </button>
            ) : (
                <button className={"btn-main " + (props.classes === undefined ? "" : props.classes)} onClick={props.onClick} ref={ref} style={props.styles}>
                    <div className="btn-container" onClick={() => { dispatch(incrementUserClick()) }}>
                        { props.text }
                    </div>
                </button>
            )}
        </>
    );
});

export const BackButton = ({text, onClick, style}) => {
    return (
        <button className="btn-back" onClick={onClick} style={style}>{ text }</button>
    );
}

interface IMenuButtonProps {
    text: string;
    onClick: any;
    style?: React.CSSProperties;
    icon?: any;
}

export const MenuButton = (props: IMenuButtonProps) => {
    return (
        <>
            {props.icon ? (
                <button className="btn-menu" onClick={props.onClick} style={props.style}>
                    <div className="btn-container">
                        {props.icon}
                    </div>
                </button>
            ) : (
                <button className="btn-menu" onClick={props.onClick} style={props.style}>{ props.text }</button>
            )}
        </>
    );
}

export const TabButton = (props) => {
    return (
        <button className={"btn-tab " + props.classes} onClick={props.onClick} style={props.style}>{ props.text }</button>
    );
}

export const FilterAscending = (props) => {
    return (
        <button className={"btn-filter " + props.classes} onClick={props.onClick} style={props.style}>
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

export const ExitButton = (props) => {

    return (
        <i style={{ color: 'red', cursor: 'pointer' }} className="btn-exit fa-solid fa-x fa-xs" onClick={ () => props.handleCallback(props.callbackParam) }></i>
    );
}

Button.defaultProps = {
    text: "Button"
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    classes: PropTypes.string,
    icon: PropTypes.objectOf(PropTypes.any),
    styles: PropTypes.objectOf(PropTypes.any)
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

FilterAscending.defaultProps = {
    isAsc: true,
    onclick: () => {},
    classes: "",
    style: {}
}

FilterAscending.propTypes = {
    isAsc: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.string,
    style: PropTypes.object
}

ExitButton.defaultProps = {
    handleCallback: () => {},
    callbackParam: null
}

ExitButton.propTypes = {
    handleCallback: PropTypes.func.isRequired,
    callbackParam: PropTypes.any
}