import {Button} from "./Button";
import ContentTasks from "./ContentTasks";

function ContainerContentRight({clickFunc}) {
    const onClick = (e) => {
        clickFunc(true);
        e.preventDefault();
    };

    return (
        <>
            <div className="top-bar">
                <h2>Tasks</h2>
                <Button text="Add" onClick={ onClick }/>
            </div>
            <div className="column-content">
                <ContentTasks />
            </div>
        </>
    );
}

export default ContainerContentRight;