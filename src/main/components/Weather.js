import {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Form, Row, Spinner} from "react-bootstrap";
import "../styles/weatherStyle.css";
import {supportFunctions} from "../functions/supportFunctions";
import Rain from "../images/rain.png";
import Sun from "../images/sun.png";
import Cold from "../images/cold-weather.gif";
import askMe from "../images/askMe.png";
import Cloudy from "../images/cloudy.png";
import Thunderstorm from "../images/thunderStorm.png";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const API_KEY = "7c9f352eccfb82cd64b0481db1d4f68d";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

const countryAPI = "https://restcountries.com/v3.1/alpha/";

let firstImage = askMe;

export default function Weather() {
    const [city, setCity] = useState("N/A");
    const [sunRain, setSunRain] = useState(); // For photo changing
    const [temperature, setTemperature] = useState("N/A"); // Celsius Scale
    const [wind, setWind] = useState("N/A"); // Wind speed
    const [windDirection, setWindDirection] = useState("N/A"); // North North-east North-west ...
    const [country, setCountry] = useState("N/A");
    const [visibility, setVisibility] = useState("N/A");
    const [search, setSearch] = useState("");
    const [image, setImage] = useState(firstImage);
    const [description, setDescription] = useState("N/A");
    const [countryFlag, setCountryFlag] = useState("N/A");
    const [countryName, setCountryName] = useState("N/A");
    const [loading, setLoading] = useState(false);

    const setAllData = (data) => {
        setSunRain(data.weather[0].main);
        setCity(data.name);
        setTemperature(data.main.temp);
        setWind(data.wind.speed);
        setWindDirection(data.wind.deg);
        setVisibility(data.visibility);
        setCountry(data.sys.country);
        setDescription(data.weather[0].description);
    }

    const setCountryInfo = (data) => {
        setCountryName(data.name.official);
        setCountryFlag(data.flag);
    }

    const getWeather = async (event, search) => {
        setLoading(true);
        event.preventDefault();
        await axios.get(`${API_URL}${search}&appid=${API_KEY}&units=metric`)
            .then((response) => {
                setAllData(response.data);
            })
            .catch(error => console.log(error + "We catch error while getting data from API with city: "));
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }

    const saveTypedCity = (event) => {
        setSearch(event.target.value);
    }

    const onGetData = (event, search) => {
        getWeather(event, search);
        setSearch("");
    }

    useEffect(() => {
        if (sunRain === "Clear") setImage(Sun);
        else if (sunRain === "Rain" || sunRain === "Drizzle") setImage(Rain);
        else if (sunRain === "Snow") setImage(Cold);
        else if (sunRain === "Clouds") setImage(Cloudy);
        else if (sunRain === "Thunderstorm") setImage(Thunderstorm);

        if (temperature < 0) setImage(Cold);

        axios.get(`${countryAPI}${country}`)
            .then(response => setCountryInfo(response.data[0]))
            .catch(error => console.log(error + "We catch error while getting Country Flag"));
    }, [city, countryFlag]);

    return (
        <>
            {
                loading ?
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :
                    <div className={'weather w-75'}>
                        <Container>
                            <Row>
                                <Form
                                    onSubmit={(event) => onGetData(event, search)}
                                >
                                    <div className={'inputSpace my-3'}>
                                        <input
                                            className={'mb-3 inputLabel'}
                                            placeholder={' '}
                                            value={search}
                                            onChange={(event) => {
                                                saveTypedCity(event)
                                            }}
                                        />
                                        <span className={'placeholderMessage'}>Enter name of the city</span>
                                    </div>
                                </Form>
                                <Col className={'weatherFirstRowCol d-flex justify-content-center align-items-center text-center p-2'} sm={12} md={6} lg={4}>
                                    <div>
                                        <picture>
                                            <LazyLoadImage
                                                className={'weatherImage'}
                                                src={image}
                                                effect={"opacity"}
                                                width={image.width}
                                                alt={'weather foto'}
                                            />
                                        </picture>
                                    </div>
                                </Col>
                                <Col className={'weatherFirstRowCol'} sm={12} md={6} lg={8}>
                                    <h3>City: {city}</h3>
                                    <h2>{`${countryName}: ${countryFlag}`}</h2>
                                    <div>Weather: {description}</div>
                                    <div>Temperature: {Math.floor(temperature)}°C</div>
                                    <div>Country code: {country}</div>
                                    <div>Wind speed: {wind} m/s</div>
                                    <div>Wind
                                        Direction: {windDirection}°, {supportFunctions.getDirectionInString(windDirection)}</div>
                                    <div>{supportFunctions.getVisibility(visibility)}</div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
            }
        </>
    );
}