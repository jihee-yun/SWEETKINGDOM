import {useContext, useEffect} from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Map from "../component/Map";
import Weather from "../component/Weather";
import Ranking from "../component/Ranking";
import { styled } from "styled-components";
import Sidebar from "../component/Sidebar";
import { UserContext } from "../context/UserStore";
import PopUp from "../utils/PopUp";
import TestSwiper from "../component/TestSwiper";

const Container = styled.div`
max-width: 1440px;
margin: 0 auto;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;



const Main = () => {
    const { isSidebar, setIsSidebar } = useContext(UserContext);

    useEffect(() => {
        
        return (
            setIsSidebar("-300px")
        )
    }, []);
    return(
        <>
        <PopUp />
        <Container>
        <Header/>
        <Weather />
        <Map/>
        <Ranking/>
        <TestSwiper/>
        <Footer/>
        {isSidebar && <Sidebar/>}
        </Container>
        </>

    );
};

export default Main;