import React from "react";
import { styled } from "styled-components";
import cafe from "../images/cafe.jpg";

const Container = styled.div`
width: 90%;
height: 500px;
margin-top: 20px;
display: flex;
align-items: center;
flex-direction: column;


.RankingContainer {
    display: flex;
    width: 95%;
    height: 400px;
    gap: 10px 1%;
    flex-wrap: wrap;
    justify-content: center;
}
.RankingItem {
    /* border: solid; */
    width: 30%;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 1px 3px black;
    }
`;

const ImgContainer = styled.div`
position: relative;
background: linear-gradient(to right, #000, #000);
width: 100%;
overflow: hidden;
&:hover .innerContent {
    opacity: 1;
    top: 50%;
}
.cafe {
    width: 100%;
    height: auto;
    object-fit: cover;
    transform: scale(1.1);
    transition: all 0.25s linear;

    &:hover {
        opacity: 0.2;
        transform: scale(1.25);
    }
}

.innerContent {
        width: 80%;
        opacity: 0;
        transform: translateX(-50%) translateY(-50%);
        position: absolute;
        top: 80%;
        left: 50%;
        transition: all 600ms ease;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;

         .cafeTitel {
            font-size: 1.2rem;
            font-weight: 700;
        }

         .overview {
            font-size: 0.9rem;
            font-weight: 300;
        }
    }

`;

const Ranking = () => {
    // const onClickTMP = () => {
    //     const response = MainAxiosApi.Tmp(1);
    //     console.log(response.then((result) => result.data));
    // }
    
    return(
        <>
        <Container>
        <div className="title">
            <h2 >실시간 인기 카페 확인하기</h2>
            </div>
            <div className="RankingContainer">
                <div className="RankingItem">
            <ImgContainer>
                {/* <button onClick={onClickTMP}>a</button> */}
                    <img src={cafe} alt="카페임시" className="cafe"/>
                <div className="innerContent">
                    <span className="cafeTitel">부빙</span>
                    <span className="overview">부암동 빙수 먹고싶다</span>
                </div>
            </ImgContainer>
                </div>
                <div className="RankingItem"></div>
                <div className="RankingItem"></div>
                <div className="RankingItem"></div>
                <div className="RankingItem"></div>
                <div className="RankingItem"></div>
            </div>
        </Container>
        </>

    );
}

export default Ranking;