import React from "react";
import { styled } from "styled-components";
import PlaceIcon from '@mui/icons-material/Place';
import KakaoMap from "./KakaoMap";


const Container = styled.div`
width: 90%;
height: 500px;
margin-top: 20px;
border-radius: 10px;
box-sizing: border-box;
display: flex;
flex-direction: column;
overflow: hidden;

.MapContainer {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px 1%;
    border: 10px;
    

.detail {
    width: 300px;
    height: 500px;
    background-color: #FFD0E4;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .topimg{
        width: 90%;
        height: 200px;
        background-color: white;
        margin-top: 20px;
        border-radius: 5px;
    }
    h3 {
        border-bottom: solid;
    }
    .sub {
        width: 90%;
        list-style: none;
        line-height: 1.6em;
        
        li {
            color: #848484;
        }
    }
}
}
`;




const Map = () => {


    return(
        <>
        <Container>
        <div className="title">
            <h2> <PlaceIcon/> 지도로 한눈에 살펴보기</h2>
        </div>

        <div className="MapContainer">
        <KakaoMap/>
        <div className="detail">
            <div className="topimg"></div>
            <h3 style={{color:"white"}}>카페이름</h3>
            <ul className="sub">
                <li>경기 김포시 양촌읍 삼도로 196-30</li>
                <li>031-988-6363</li>
                <li>10:30-17:30(월,화 휴무)</li>
                <li>https://cicamuseum.com</li>
            </ul>
        </div>
        </div>
        </Container>
        </>

    );
}

export default Map;