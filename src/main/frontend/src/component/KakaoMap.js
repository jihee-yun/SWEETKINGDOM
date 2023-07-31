import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import Maker from "../images/maker.png";
import { Map,  MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { styled } from "styled-components";
import Grid from "../utils/Grid";
import Text from "../utils/Text";
import Image from "../utils/Image";
import Locations from "./Locations";
import AxiosApi from "../api/AxiosApi";

const {kakao} = window;

const MarkerInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  border: none;
  outline: none;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
`;

const Footer = styled.div`

.item {
    color: tomato;
    font-size: 10px;
    font-weight: 500;
    text-decoration: none;
    border-bottom: 2px solid currentColor;
    padding-bottom: 3px;
  }
`;




const KakaoMap = (props) => {

  const [isOpenList, setIsOpenList] = useState(Locations.map(() => false));
  const [selectedMarker, setSeleteMarker] = useState();

  const [cafeRankingInfo, setCafeRankingInfo] = useState([]);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { setCafeNum } = context; 


  const isCafeOpen = (index) => {
    setSeleteMarker(index);
    const updatedIsOpenList = isOpenList.map((state, i) => i === index);
    setIsOpenList(updatedIsOpenList);
  }

  useEffect(() => {
    const cafeInfo = async () => {
      try {
        const rsp = await AxiosApi.MainInfoGet();
        if (rsp.status) {
          setCafeRankingInfo(rsp.data);
          console.log("카페 정보 가져오기 성공: ", rsp.data)
        }
      } catch (error) {
        console.log("카페 정보 가져오기 실패: ", error);
      }
    };

    cafeInfo();
    console.log(cafeRankingInfo);
  }, []);

  const cardClick = (cafeNum) => {
    setCafeNum(cafeNum);
  localStorage.setItem("cafeNum", cafeNum);
  navigate(`/cafe/detail/${cafeNum}`);
  };

  return(
    <>
     <Map  // 지도를 표시하는 Container
        center={{ lat: 37.49836350451894, lng: 127.0328292001705 }}   // 지도의 중심 좌표
        style={{ width: '100%', height: '500px' }} // 지도 크기
        level={4}                                   // 지도 확대 레벨
      >

        {Locations.map((loc, index) => ( // 여러개 마커 표시
        <MapMarker // 마커 생성하고 지도에 표시
        key={index}
        position={loc.latlng} // 마커를 표시할 위치
        image={{
          src: Maker,
          size: { width: 40, height: 40 },
        }}
        onClick={() => isCafeOpen(index)}
        >
        
        {isOpenList[index] &&  (
          <div>
          {cafeRankingInfo.map(ranking => (
            <CustomOverlayMap	// 커스텀 오버레이를 표시할 Container
                  position={loc.latlng}	// 커스텀 오버레이가 표시될 위치
                  yAnchor={1.2}
                  zIndex={1}
            >
             <MarkerInfo key={ranking.id}>
              <Image src={loc.ImgUrl} type="rectangle" />
              <Grid padding="5px 10px 10px">
                <Text margin="5px 0" bold="600" size="16px">
                 {loc.title}
                </Text>
                <Footer>
                <div className="item" onClick={() => cardClick(ranking.id)}>READ MORE</div>
                </Footer>
              </Grid>
            </MarkerInfo>
            
            </CustomOverlayMap>
    
        ))}
        </div>
        )}
        </MapMarker>
        ))}
      </Map>

    </>
  );
};

export default KakaoMap;
