import React from "react";
import mapimg from "../images/mpaimg.jpg";
import mapimg2 from "../images/mapimg2.jpg";
import mapimg3 from "../images/mapimg3.jpg";
import mapimg4 from "../images/mapimg4.jpg";
import mapimg5 from "../images/mapimg5.jpg";

const Locations = [
    { 
      title: '로얄마카롱', 
      ImgUrl : mapimg, 
      latlng: {lat: 37.5022798575697, lng: 127.03549425626856 }
      
    },

    { 
      title: '크리에잇 쿠키', 
      ImgUrl : mapimg2,
      latlng: {lat: 37.50292419145257, lng: 127.03511004160167 }
    },
    { 
      title: '테이블스',  
      ImgUrl : mapimg3,
      latlng: {lat: 37.49811544220041, lng: 127.03384121820527 }
    },
    { 
      title: '로흐',  
      ImgUrl : mapimg4,
      latlng: {lat: 37.50085501505924, lng: 127.03199624553372 }
    },
    { 
      title: '트리오드',  
      ImgUrl : mapimg5,
      latlng:{lat: 37.49962351869158, lng: 127.02958126885545 }
    },
  ];

  export default Locations;