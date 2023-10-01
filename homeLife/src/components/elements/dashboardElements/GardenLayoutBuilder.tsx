import { useEffect, useLayoutEffect, useState } from "react";
import { Button, ExitButton } from "../Button";
import rough from 'roughjs/bundled/rough.esm.js';
import { APIPostImageUserGarden } from "../../../api/Common";
import { checkScreenSizeMobile } from "../../Common";


export interface IGardenLayoutBuilderProps {
    selectedGarden: { id: number, name: string, description: string, imageRef: string };
    setGardenLayoutError: (error: string) => void;
    setShowingMyGardenLayoutBuilder: (showing: boolean) => void;
}

const generator = rough.generator();

const createCanvasElement = (x1: number, y1: number, x2: number, y2: number, elementType: string) => {
    if (elementType === "line") {
        const roughElement = generator.line(x1, y1, x2, y2, { roughness: 0.5, stroke: 'black', strokeWidth: 2 });
        return { x1, y1, x2, y2, roughElement};
    } else if (elementType === "rect") {
        const roughElement = generator.rectangle(x1, y1, x2-x1, y2-y1, { roughness: 0.5, stroke: 'black', strokeWidth: 2 });
        return { x1, y1, x2, y2, roughElement};
    }
}

function GardenLayoutBuilder(props: IGardenLayoutBuilderProps) {
    // Drawing garden layout variables
    const [gardenCanvasRoughElements, setGardenCanvasRoughElements] = useState([] as any[]);
    const [gardenCanvasRoughElementsRedo, setGardenCanvasRoughElementsRedo] = useState([] as any[]);
    const [gardenCanvasPosition, setGardenCanvasPosition] = useState({ x: 0, y: 0 } as { x: number, y: number });
    const [gardenCanvasTextInput, setGardenCanvasTextInput] = useState("");
    const [drawing, setDrawing] = useState(false);
    const [elementType, setElementType] = useState("line");
    const [gardenCanvas, setGardenCanvas] = useState({} as HTMLCanvasElement);
    const [gardenCanvasContext, setGardenCanvasContext] = useState({} as CanvasRenderingContext2D);
    const [gardenLayoutError, setGardenLayoutError] = useState("");
    const [gardenLayoutSize, setGardenLayoutSize] = useState({ width: 0, height: 0 } as { width: number, height: number });

    useLayoutEffect(() => {
        // Draw garden layout
        const canvas = document.getElementById('garden-canvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        context.scale(1, 1);
        setGardenCanvas(canvas);
        setGardenCanvasContext(context);

        // Set canvas position
        const canvasPosition = canvas.getBoundingClientRect();
        setGardenCanvasPosition({ x: canvasPosition.x, y: canvasPosition.y });
        console.log("Canvas position: " + canvasPosition.x + ", " + canvasPosition.y);
        

        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        const rc = rough.canvas(canvas);
        
        // Draw all elementsp in the array
        console.log("Wrapping up - Drawing elements");
        
        gardenCanvasRoughElements.forEach(({ roughElement }) => rc.draw(roughElement));
    }, [gardenCanvasRoughElements]);

    useEffect(() => {
        // Check if user has screen size under 768px. If so, size down the layout builder
        // TODO: Implement layout builder full screen with mobile friendly controls and an exit button
        if (checkScreenSizeMobile()) {
            setGardenLayoutSize({ width: 250, height: 250 });
        } else {
            setGardenLayoutSize({ width: 500, height: 500 });
        }

        if (gardenCanvas === undefined || gardenCanvasContext === undefined) {
            console.log("Canvas is undefined. Can't draw elements.");
        }
        if (gardenLayoutError !== "") {
            console.log("Garden Layout Error: " + gardenLayoutError);
        }
        
    }, [gardenLayoutError, gardenCanvas, gardenCanvasContext]);

    const handleMouseDown = (e) => {
        if (e === undefined) return;
        if (gardenCanvas === undefined || gardenCanvasContext === undefined) return;
        // We don't want do any drawing when text is enabled. Instead we have a different flow
        if (elementType === "text") {
            const { clientX, clientY } = e; 
            // Factor in canvas position into mouse position
            const x = clientX - gardenCanvasPosition.x;
            const y = clientY - gardenCanvasPosition.y;
            gardenCanvasContext.font = "24px SwankyMooMoo";
            gardenCanvasContext.fillText(gardenCanvasTextInput, x, y);
            
        } else if (elementType === "line" || elementType === "rect") {
            setDrawing(true);
            const { clientX, clientY } = e; 
            // Factor in canvas position into mouse position
            const x = clientX - gardenCanvasPosition.x;
            const y = clientY - gardenCanvasPosition.y;
            const element = createCanvasElement(x, y, x, y, elementType);
            setGardenCanvasRoughElements((prevState) => [...prevState, element]);
        }
    }
    const handleMouseMove = (e) => {
        if (!drawing) return;

        const { clientX, clientY } = e; //  Get mouse position
        // Factor in canvas position into mouse position
        const x2 = clientX - gardenCanvasPosition.x;
        const y2 = clientY - gardenCanvasPosition.y;
        const index = gardenCanvasRoughElements.length - 1;  // Get the index of the last element
        if (index < 0) return;  // If there are no elements, return (this should never happen)
        const { x1, y1 } = gardenCanvasRoughElements[index];  // Get the x and y coordinates of the last element
        const element = createCanvasElement(x1, y1, x2, y2, elementType);  // Create a new element with the last element's x and y coordinates and the current mouse position
        const elementsCopy = [...gardenCanvasRoughElements];  // Copy the elements array
        elementsCopy[index] = element;  // Replace the last element with the new element
        setGardenCanvasRoughElements(elementsCopy);  // Set the elements array to the new array
    }
    const handleMouseUp = (e) => {
        setDrawing(false);
    }

    const handleSaveCurrentGardenLayoutToFile = () => {
        gardenCanvasContext.save();
        var canvasSaveLink = document.getElementById('canvas-save-link') as HTMLAnchorElement;
        canvasSaveLink.setAttribute('download', 'MintyPaper.png'); // TODO: Get garden name and apply here
        canvasSaveLink.setAttribute('href', gardenCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        canvasSaveLink.click();
        // TODO: Review - https://stackoverflow.com/questions/40027763/reset-canvas-to-previous-picture-after-modifications
    }

    const handleSaveCurrentGardenLayoutToServer = (e) => {
        if (props.selectedGarden?.id === undefined) {
            setGardenLayoutError("Please select a garden to save the layout to.");
            return;
        } else {
            // Check to see if the user cancelled upload
            if (e.target.files.length > 0) {
                console.log("Saving garden image to server.");
                const reader = new FileReader();
                reader.onload = async () => {
                    const gardenImage = reader.result as string;  // Coverts image to base64 so we can stream the data over the internet
                    const imageName = e.target.files[0].name;
                    const saveResponse = await APIPostImageUserGarden(props.selectedGarden.id, props.selectedGarden.name, props.selectedGarden.description, imageName, gardenImage);
                    if (saveResponse?.status === 200) {
                        console.log("Successfully saved garden image to server.");
                    } else {
                        console.log("Error saving garden image to server. Save response code: " + saveResponse?.status + ".");
                    }
                }
                reader.readAsDataURL(e.target.files[0]);
            } else {
                console.log("User cancelled upload.");
            }
        }
    }

    const handleCloseLayoutBuilder = () => {
        props.setShowingMyGardenLayoutBuilder(false);
    }

    // const handleRestoreCurrentGardenLayout = () => {
    //     gardenCanvasContext.restore();
    //     // Restore canvas from image
    //     // TODO: Review - https://stackoverflow.com/questions/40027763/reset-canvas-to-previous-picture-after-modifications
    // }

    return (
        <div className="my-garden-layout-wrapper">
            <div className='my-garden-layout'>
                <h3>Garden Layout Builder</h3>
                <ExitButton handleCallback={() => { handleCloseLayoutBuilder() }} callbackParam={""} />
                <div className="my-garden-layout-buttons">
                    <div className="secondary-buttons">
                        <Button text="Undo" classes={(elementType === "undo" ? ("selected") : (""))} onClick={() => {
                            // Save the last element to the redo array
                            if (gardenCanvasRoughElements.length === 0) return;
                            const lastElement = gardenCanvasRoughElements[gardenCanvasRoughElements.length - 1];
                            // @ts-ignore
                            setGardenCanvasRoughElementsRedo((prevState) => [...prevState, lastElement]);
                            // Remove the last element of the rough elements array
                            // @ts-ignore
                            setGardenCanvasRoughElements((prevState) => prevState.slice(0, -1));
                        }} />
                        <Button text="Redo" classes={(elementType === "redo" ? ("selected") : (""))} onClick={() => {
                            if (gardenCanvasRoughElementsRedo.length === 0) return;
                            // Save the last element to the undo array
                            const lastElement = gardenCanvasRoughElementsRedo[gardenCanvasRoughElementsRedo.length - 1];
                            // @ts-ignore
                            setGardenCanvasRoughElements((prevState) => [...prevState, lastElement]);
                            // Remove the last element of the redo array
                            // @ts-ignore
                            setGardenCanvasRoughElementsRedo((prevState) => prevState.slice(0, -1));
                        }} />
                        <Button text="Clear" classes={(elementType === "clear" ? ("selected") : (""))} onClick={() => {
                            setElementType(""); 
                            setGardenCanvasRoughElements([] as any[]);
                        }} />
                        <Button text="Save To File" onClick={() => {
                            handleSaveCurrentGardenLayoutToFile();
                        }} />
                    </div>
                    {/* <Button text="Restore" onClick={() => {
                        handleRestoreCurrentGardenLayout();
                    }} /> */}
                    <label htmlFor="garden-canvas-image-upload" className="btn-main" style={{flexBasis: "max-content"}}>Save to HomeLife Cloud</label>
                    <input id="garden-canvas-image-upload" type="file" name="garden-image" style={{display: "none"}} onChange={(e) => {
                        handleSaveCurrentGardenLayoutToServer(e);
                    }} />
                </div>
                <div className="garden-canvas-wrapper">
                <div className="main-buttons">
                        <Button text="Line" classes={(elementType === "line" ? ("selected") : (""))} onClick={() => {
                            if (elementType !== "line") {
                                setElementType("line");
                            } else {
                                setElementType("");
                            }
                        }} />
                        <Button text="Rect" classes={(elementType === "rect" ? ("selected") : (""))} onClick={() => {
                            if (elementType !== "rect") {
                                setElementType("rect");
                            } else {
                                setElementType("");
                            }
                        }} />
                        <Button text="Text" classes={(elementType === "text" ? ("selected") : (""))} onClick={() => {
                            if (elementType !== "text") {
                                setElementType("text");
                            } else {
                                setElementType("");
                            }
                        }} />
                        {/* Text input that's only enabled when text button is selected */}
                        <input type="text" className="garden-canvas-text-input" disabled={elementType !== "text"} onChange={(e) => {setGardenCanvasTextInput(e.target.value)}} />
                    </div>
                    {/* eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */}
                    <a id="canvas-save-link"></a>
                    <canvas 
                        id='garden-canvas' 
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        height={gardenLayoutSize.height}
                        width={gardenLayoutSize.width}
                    >
                        Garden Canvas
                    </canvas>
                </div>
            </div>
        </div>
    );
}

export default GardenLayoutBuilder;