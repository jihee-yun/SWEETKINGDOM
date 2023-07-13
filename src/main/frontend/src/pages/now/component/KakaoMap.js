import React, { useEffect } from "react";
const {kakao} = window;

const KakaoMap = () => {

  useEffect(()=> {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.49836350451894, 127.0328292001705),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);

  });

  return(
    <>
    <div id="map" style={{ width: '100%', height: '500px', borderRadius: "10px" }}>
    </div>
    </>
  );
};

export default KakaoMap;
