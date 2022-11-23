import {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Form, Row} from "react-bootstrap";
import "../styles/weatherStyle.css";
import {supportFunctions} from "../functions/supportFunctions";
import Rain from "../images/rain.jpg";
import Sun from "../images/sun.png";


const API_KEY = "7c9f352eccfb82cd64b0481db1d4f68d";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

export default function Weather() {
    const [city, setCity] = useState();
    const [sunRain, setSunRain] = useState(); // For photo changing
    const [temperature, setTemperature] = useState(); // Celsius Scale
    const [wind, setWind] = useState(); // Wind speed
    const [windDirection, setWindDirection] = useState(); // North North-east North-west ...
    const [country, setCountry] = useState();
    const [visibility, setVisibility] = useState();
    const [search, setSearch] = useState("");

    const setAllData = (data) => {
        setCity(data.name);
        setSunRain(data.weather[0].main);
        setTemperature(data.main.temp);
        setWind(data.wind.speed);
        setWindDirection(data.wind.deg);
        setVisibility(data.visibility);
        setCountry(data.sys.country);
    }

    const defaultWeather = async () => {
        // First time we will see weather info about City: Tbilisi...
        await axios.get(`${API_URL}tbilisi&units=metric&appid=${API_KEY}`)
            .then(response => {
                setAllData(response.data);
            })
            .catch(error => console.log(error + "Default City Error "));
    }

    const getWeather = async (event, search) => {
        event.preventDefault();
        await axios.get(`${API_URL}${search}&appid=${API_KEY}&units=metric`)
            .then((response) => {
                setAllData(response.data);
            })
            .catch(error => console.log(error + "We catch error while getting data from API with city: "));
    }

    const saveTypedCity = (event) => {
        setSearch(event.target.value);
    }

    useEffect(() => {
        defaultWeather();
    }, []);

    return (
        <>
            <div>
                <Container>
                    <Row>
                        <Form
                            onSubmit={(event) => getWeather(event, search)}
                        >
                            <div className={'inputSpace my-3'}>
                                <input
                                    className={'mb-3 inputLabel'}
                                    placeholder={' '}
                                    value={search}
                                    onChange={(event)=>{saveTypedCity(event)}}
                                />
                                <span className={'placeholderMessage'}>Enter name of the city</span>
                            </div>
                        </Form>
                        <Col className={'weatherFirstRowCol text-center p-2'} sm={12} md={6} lg={4}>
                            <img
                                style={{width: "100%", height: "100%"}}
                                className={'p-5'}
                                src={sunRain && (sunRain === "Clear" ? Sun : Rain)}
                                alt={'weather foto'}
                            />
                        </Col>
                        <Col className={'weatherFirstRowCol'} sm={12} md={6} lg={8}>
                            <h3>City: {city}</h3>
                            <div>Temperature: {temperature}°C</div>
                            <div>Country code: {country}</div>
                            <div>Wind speed: {wind} m/s</div>
                            <div>Direction: {windDirection}</div>
                            <div>{supportFunctions.getVisibility(visibility)}</div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}