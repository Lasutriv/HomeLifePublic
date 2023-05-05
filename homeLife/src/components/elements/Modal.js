import PropTypes from "prop-types";

function Modal({title, textInfo, form}) {
    return (
        // <button className="btn" onClick={props.onClick}>{ props.text }</button>
        <div className="modal-container">
            <h3>{ title }</h3>
            <hr />
            <p>{ textInfo }</p>
            { 
                form ? (
                    form
                ) : (
                    <></>
                )
            }
        </div>
    );
}

Modal.defaultProps = {
    title: "<Title here>",
    textInfo: "<Infomration here>",
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    textInfo: PropTypes.string.isRequired,
}

export default Modal;