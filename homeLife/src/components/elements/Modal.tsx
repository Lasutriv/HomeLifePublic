import PropTypes from "prop-types";
import { getCorrectDomain } from "../../AppSettings";
import { Button, ExitButton } from "./Button";
import { useEffect } from "react";

export function Modal({title, textInfo, form, classes}) {
    return (
        // <button className="btn" onClick={props.onClick}>{ props.text }</button>
        <div className={"modal-container " + classes}>
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
    form: null,
    classes: "",
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    textInfo: PropTypes.string.isRequired,
    form: PropTypes.object,
    classes: PropTypes.string,
}
export default Modal;

export function ModalTooltip(props) {

    return (
        <div className="modal-container-tooltip" style={{left: props.position.x, top: props.position.y}}>
            <h3>{ props.title }</h3>
            <hr />
            <p>{ props.textInfo }</p>
            <div className="modal-buttons">
                <Button text="Okay" onClick={props.onClick} />
            </div>
        </div>
    );
}

ModalTooltip.defaultProps = {
    title: "<Title here>",
    textInfo: "<Infomration here>",
    position: {
        x: 0,
        y: 0,
    },
    onClick: () => {},
}

ModalTooltip.propTypes = {
    title: PropTypes.string.isRequired,
    textInfo: PropTypes.string.isRequired,
    position: PropTypes.object,
    onClick: PropTypes.func,
}

export const ModalGardenPlant = (props) => {
    return (
        // <button className="btn" onClick={props.onClick}>{ props.text }</button>
        <div className="modal-garden-item">
            <div className="item-header">
                <div className="title-with-tags">
                    <h3>{ props.title }</h3>
                    <div className="tags">
                        { props.tags.map((tag: string, index: number) => (
                            <div className={"tag " + tag.toLowerCase()} key={index}>
                                <span>{ tag }</span>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="btn-main">Add to My Garden</button>
            </div>
            <hr />
            <div className={"item-content " + (props.isSelected ? ("selected") : (""))}>
                <p className="item-description">
                    { props.description }
                </p>
                <div className="item-planting">
                    <h4>Prerequisites</h4>
                    <p>{ props.prerequisitesDescription }</p>
                </div>
                <div className="item-extra">
                    <h4>Extra</h4>
                    <p>{ props.extraDescription }</p>
                </div>
                <div className="item-companion-plants">
                    <h4>Companion Plants</h4>
                    <ul>
                        { props.companionPlants.map((plant: string, index: number) => (
                            <li key={index}>{ plant }</li>
                        ))}
                    </ul>
                </div>
                <div className="item-common-tasks">
                    <h4>Common Tasks</h4>
                    <ul>
                        { props.commonTasks.map((task: string, index: number) => (
                            <li key={index}>{ task }</li>
                        ))}
                    </ul>
                </div>
                <div className="item-common-pests">
                    <h4>Common Pests</h4>
                    <ul>
                        { props.commonPests.map((pest: string, index: number) => (
                            <li key={index}>{ pest }</li>
                        ))}
                    </ul>
                </div>
                <div className="item-nutrients">
                    <h4>Nutrients</h4>
                    <div className="nutrients-grid">
                        { Object.keys(props.nutrients).map((key, index) => (
                            <div className="nutrient-item" key={index}>
                                <span className="nutrient-name">{ key }</span>
                                <span className="nutrient-value">{ props.nutrients[key] }%</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="item-nutrients-source">
                    <a href={props.nutrientSource}>Nutrient Source</a>
                </div>
            </div>
        </div>
    );
}

ModalGardenPlant.defaultProps = {
    title: "<Title here>",
    type: "<Type here>",
    isSelected: false,
    description: "<Description here>",
    prerequisitesDescription: "<Prerequisites here>",
    extraDescription: "<Extra description here>",
    companionPlants: [],
    commonTasks: [],
    commonDiseases: [],
    commonPests: [],
    storingAndPreserving: "<Storing and preserving here>",
    nutritionDescription: "<Nutrient description here>",
    nutrients: {},
    tags: [],
    nutrientSource: "<Nutrient source here>",
}

ModalGardenPlant.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    prerequisitesDescription: PropTypes.string.isRequired,
    extraDescription: PropTypes.string,
    companionPlants: PropTypes.array,
    commonTasks: PropTypes.array,
    commonDiseases: PropTypes.array,
    commonPests: PropTypes.array,
    storingAndPreserving: PropTypes.string,
    nutritionDescription: PropTypes.string,
    nutrients: PropTypes.object,
    tags: PropTypes.array,
    nutrientSource: PropTypes.string,
}

export const ModalGardenImage = ({garden, exitCallback}) => {
    return (
        // <button className="btn" onClick={props.onClick}>{ props.text }</button>
        <div className="modal-container modal-garden-container">
            <div className="modal-relative-wrapper">
                <header></header>
                <div className="modal-garden-content">
                    <ExitButton handleCallback={exitCallback} callbackParam={garden.id} />
                    <div className="garden-card-image-container">
                        <div className="garden-card-title text-center">
                            <div className="header-text-container">
                                <div className="header-left-line"></div>
                                <h3>{garden?.name} Layout</h3>
                                <div className="header-right-line"></div>
                            </div>
                        </div>
                        {garden?.imageRef !== "" && garden?.imageRef !== "undefined" ? (
                            <img className="garden-card-image" src={getCorrectDomain() + '/api/usergardens/images?imageRef=' + garden?.imageRef} alt="Garden overview" />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <footer></footer>
            </div>
        </div>
    );
}

Modal.defaultProps = {
    garden: {
        id: "",
        name: "",
        description: "",
        imageRef: "",
        plants: [],
    },
    callback: () => {},
}

Modal.propTypes = {
    garden: {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageRef: PropTypes.string.isRequired,
        plants: PropTypes.array,
    },
    callback: PropTypes.func.isRequired,
}

export const ModalError = ({title, textInfo, exitCallback}) => {
    return (
        <div className="modal-container error-container">
            <ExitButton handleCallback={exitCallback} />
            <h3>{ title }</h3>
            <hr />
            <p>{ textInfo }</p>
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

export const ModalInformation = ({title, textInfo, exitCallback}) => {
    return (
        <div className="modal-container info-container">
            <ExitButton handleCallback={exitCallback} />
            <h3>{ title }</h3>
            <hr />
            <p>{ textInfo }</p>
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