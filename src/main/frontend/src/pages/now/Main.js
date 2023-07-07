import {useRef, useEffect, useState} from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Map from "./component/Map";
import Ranking from "./component/Ranking";
import Recommend from "./component/Recommend"
import { styled } from "styled-components";

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;



const Main = () => {

    return(
        <>
        <Container>
        <Header/>
        <Map/>
        <Ranking/>
        <Recommend/>
        <Footer/>
        </Container>
        </>

    );
};

export default Main;