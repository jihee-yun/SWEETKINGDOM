import { useState } from "react";
import Maker from "../images/maker.png";
import { Map,  MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { styled } from "styled-components";
import Grid from "../utils/Grid";
import Text from "../utils/Text";
import Image from "../utils/Image";
import Locations from "./Locations";

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

a {
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


  const isCafeOpen = (index) => {
    setSeleteMarker(index);
    const updatedIsOpenList = isOpenList.map((state, i) => i === index);
    setIsOpenList(updatedIsOpenList);
  }

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
            <CustomOverlayMap	// 커스텀 오버레이를 표시할 Container
                  position={loc.latlng}	// 커스텀 오버레이가 표시될 위치
                  yAnchor={1.2}
                  zIndex={1}
            >
             <MarkerInfo>
              <Image src={loc.ImgUrl} type="rectangle" />
              <Grid padding="5px 10px 10px">
                <Text margin="5px 0" bold="600" size="16px">
                 {loc.title}
                </Text>
                <Footer>
                <a href="#">READ MORE</a>
                </Footer>
              </Grid>
            </MarkerInfo>
            </CustomOverlayMap>
        )}
        </MapMarker>
        ))}
      </Map>

    </>
  );
};

export default KakaoMap;
