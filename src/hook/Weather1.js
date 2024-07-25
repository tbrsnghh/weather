import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Input, Row } from "reactstrap";
import "./weather.css";
export default function Weather1() {
  const [data, setData] = useState(null);
  const [text, setText] = useState("");
  const [city, setCity] = useState("Ha Noi");
  const [err, setErr] = useState(null);
  const api = "5847b7d6285de2fde8230e7f38862763";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`;
  const fetchData = () => {
    axios
      .get(url)
      .then(function (res) {
        console.log(res);
        setData(res.data);
        setErr("");
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status == "404") {
          setErr("invalid city name");
        }
      });
  };
  useEffect(() => {
    fetchData();
  }, [city]);
  const getTime = (value) => {
    let d = new Date(value * 1000);
    return d.toLocaleString();
  };
  return (
    <Container>
      <div className="cover d-flex justify-content-center align-items-end p-3 mt-5 mx-5">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setCity(text);
              setText("");
            }
          }}
          className="CityInput my-3"
          bsSize="sm"
          placeholder="Nhập thành phố"
        />
        <h1 className="text-center mx-5">WEATHER APP</h1>
      </div>
      {err && <h1>{err}</h1>}
      <div className="cover p-3 mt-2 mx-5" cover p-3>
        {data && (
          <>
            <h1 className="text-center">{data.main.temp} ℃</h1>
            <h5 className="text-center  mb-3">
              {data.name}
              <span>, {data.sys.country}</span>
            </h5>

            <Row xs="2">
              <Col md='7' >
                <h5>Sunrise: {getTime(data.sys.sunrise)}</h5>
                <h5>Sunset: {getTime(data.sys.sunset)}</h5>
              </Col>
              <Col md='5'className="text-center">
                <h5>{data.weather[0].description.toUpperCase()}</h5>
                <img className="image"
                  src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                ></img>
              </Col>
            </Row>
          </>
        )}
      </div>
    </Container>
  );
}
