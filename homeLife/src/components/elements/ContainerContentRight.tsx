import {Button} from "./Button";
import ContentTasks from "./ContentTasks";

function ContainerContentRight({clickFunc, isReload, setIsReload}) {
    const onClick = (e) => {
        clickFunc(true);
        e.preventDefault();
    };

    return (
        <>
            <div className="top-bar-main-dash">
                <h2>Tasks</h2>
                <Button text="Add" onClick={ onClick }/>
            </div>
            <div className="column-content">
                <ContentTasks isReload={isReload} setIsReload={setIsReload} />
            </div>
        </>
    );
}

export default ContainerContentRight;