import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import AxiosApi from "../api/AxiosApi";

const Container = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .RankingContainer {
        @media (max-width: 768px) {
         gap: 20px;
        }
        display: flex;
        width: 95%;

        gap: 10px 1%;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .RankingItem {
        @media (max-width: 768px) {
         width: 40%;
        }
      
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
height: 100%;
overflow: hidden;
&:hover .innerContent {
    opacity: 1;
    top: 50%;
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

         .cafeTitle {
            font-size: 1.2rem;
            font-weight: 700;
        }

         .overview {
            font-size: 0.9rem;
            font-weight: 300;
        }
    }
`;

const Image = styled.div`
    background-image: url(${props => props.image});
    object-fit: fit;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    transform: scale(1.1);
    transition: all 0.25s linear;

    &:hover {
        opacity: 0.2;
        transform: scale(1.25);
    }
`;

const Ranking = () => {
    const [cafeRankingInfo, setCafeRankingInfo] = useState([]);


    useEffect(() => {
        const cafeInfo = async () => {
          try {
            const rsp = await AxiosApi.MainInfoGet();
            if (rsp.status) {
              setCafeRankingInfo(rsp.data.slice(0, 6));
              console.log("카페 정보 가져오기 성공: ", rsp.data)
            }
          } catch (error) {
            console.log("카페 정보 가져오기 실패: ", error);
          }
        };
    
        cafeInfo();
        console.log(cafeRankingInfo);
      }, []);
      
    return(
        <>
        <Container >
        <div className="title">
            <h2 >실시간 인기 카페 확인하기</h2>
            </div>
            <div className="RankingContainer">
            {cafeRankingInfo.map(ranking => (
                <div className="RankingItem" key={ranking.id}>
            
            <ImgContainer >
                    <Image image={ranking.thumbnail} alt="카페임시" className="cafe"/>
                <div className="innerContent">
                    <span className="cafeTitle" onClick={()=> console.log(ranking)}>{ranking.cafeName}</span>
                    <span className="overview">{ranking.intro}</span>
                </div>
            </ImgContainer>
                </div>
                ))}
            </div>
        </Container>
        </>
    );
};

export default Ranking;
