import Weather from "./main/components/Weather";
import "./App.css";
import weather from "./main/images/weather.jpg";
import {useEffect, useState} from "react";

const getWindowSize = () => {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

export default function App() {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        const handleWindowResize = () => setWindowSize(getWindowSize());
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return (
        <div>
            <div>
                {
                    windowSize.innerWidth >= 600
                    &&
                    <img className={'backgroundImage'} src={weather} alt={'background foto'}/>
                }
            </div>
            <div className={'App '}>
                <div className={'main'}>
                    <Weather/>
                </div>
            </div>
        </div>

    );
}