import Weather from "./main/components/Weather";
import "./App.css";

export default function App() {
    return (
        <div>
            <div className={'backgroundImage'}>
                <div className={'main  '}>
                    <Weather/>
                </div>
            </div>
        </div>

    );
}