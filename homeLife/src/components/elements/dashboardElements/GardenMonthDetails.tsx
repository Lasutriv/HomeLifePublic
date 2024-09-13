
interface IGardeningMonthDetailsProps {
    month: string
}

function GardenMonthDetails(props: IGardeningMonthDetailsProps) {

    return (
        <>
            <div className="gardening-month-details">
                <h3>Planting</h3>
                <p>Planting in { props.month } is a great idea because of the weather.</p>
            </div>
        </>
    );
}

export default GardenMonthDetails;