import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import region from "../images/map.png";
import rainy from "../images/rainy.png";
import humid from "../images/humidity.png";
import temp from "../images/temperature.png";

import "swiper/css";
import "swiper/css/pagination";

const Container = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  height: 100px;
  padding-top: 30px;
`;

const Vertical = styled.div`
  @media (max-width: 768px) {
    font-size: .7rem;
  }
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  font-size: .9rem;
  font-weight: bold;
  color: #6E6E6E;

  .region, .temp, .rain, .humid {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const WeatherBox = styled.div`
  @media (max-width: 768px) {
    gap: 0;
  }
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
  img{
    width: 30px;
    height: 30px;
  }
`;

const CustomSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

const Weather = () => {

  const [weatherInfo, setWeatherInfo] = useState("");

  useEffect(() => {
    const weatherInfo = async() => {
      const response = await AxiosApi.weatherInfoGet("ALL");
      if(response.status === 200) setWeatherInfo(response.data);
    };
    weatherInfo();
  },[])

  console.log(weatherInfo);

  return(
    <>
    <Container>
    <CustomSwiper
      direction={'vertical'}
      // pagination={{clickable: true}}
      modules={[Autoplay]}
      autoplay={{
				delay: 3000,
			}}
      className="mySwiper">
        {weatherInfo && weatherInfo.map(weather => (
        <SwiperSlide key={weather.id}>
          <WeatherBox>
            <Vertical>
            <div className="region"><img src={region} alt="" /><p>{weather.region}</p></div>
            </Vertical>
            <Vertical>
            <div className="temp"><img src={temp} alt="" /><p>{weather.temp}℃</p></div>
            </Vertical>
            <Vertical>
            <div className="rain"><img src={rainy} alt="" /><p>{weather.rainAmount}mm</p></div>
            </Vertical>
            <Vertical>
            <div className="humid"><img src={humid} alt="" /><p>{weather.humid}%</p></div>
            </Vertical>
          </WeatherBox>
        </SwiperSlide>
        ))}
    </CustomSwiper>
    </Container>
    </>
  );
};

export default Weather;