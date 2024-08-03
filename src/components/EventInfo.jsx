import { useParams } from "react-router-dom";
import { useEffect } from "react";

const EventInfo = () => {
    const { id } = useParams();

    return(
        <>
        <p>Hello World { id }</p>
        </>
    );
};

export default EventInfo;