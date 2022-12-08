import React, { useState, useEffect } from "react";

const App = () => {

    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Deoghar");

    const getDate = () => {
        let newDate = new Date();
        let date = newDate.getDate();
        const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let month = monthArr[newDate.getMonth()];
        let year = newDate.getFullYear();
        return `${date}/${month}/${year}`
    }

    const getDay = () => {
        let newDate = new Date();
        const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let day = weekday[newDate.getDay()];
        console.log(day);
        return `${day}`;
    }

    const getTime = () => {
        var now = new Date();
        let hrs = now.getHours();
        let min = now.getMinutes();
        let per = "AM";
        if (hrs > 11) {
            per = "PM";
            if (hrs > 12) hrs -= 12;
        }
        if (min < 10) min = "0" + min;
        return `${hrs}:${min} ${per}`
    }

    useEffect(() => {
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=4fa3d2d1184167f592ceee92ae5164f1`; // &units=metric daalne se celsius mai change ho gya
            const res = await fetch(url);
            const resjson = await res.json();
            setCity(resjson.main);
        };

        fetchApi();
    }, [search]) // search update hoga tbhi useEffect ko call krna hai

    return (
        <>
            <div className="box">
                <div className="inputData">
                    <input type="search" className="inputField" value={search} onChange={(e) => {
                        setSearch(e.target.value)
                    }} />
                </div>

                {!city ? (
                    <p className="errorMsg"> No Data Found</p>)
                    : (
                        <div>
                            <div className="weathercon">
                                <i className="fas fa-sun" style={{ color: "#eccc68" }}></i>
                            </div>
                            <div className="info">
                                <h2 className="location">
                                    <i className="fas fa-street-view"></i>{search}
                                </h2>
                                <p id="date">{getDate()} | {getDay()} | {getTime()}</p>
                                <h1 className="temp">
                                    {city.temp}°Cel
                                </h1>
                                <h3 className="tempmin_max">Min : {city.temp_min}°Cel | Max : {city.temp_max}Cel</h3>
                            </div>
                            <div className="wave -one"></div>
                            <div className="wave -two"></div>
                            <div className="wave -three"></div>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default App;