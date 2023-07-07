import axios from "axios";
//const KH_DOMAIN = "http://localhost:8111";

const AxiosApi = {
  // 지역별 카페 정보 조회
  cafeInfoGet: async(region, sortingOption) => {
    let url = `/cafe/region?region=${region}`;
    if(sortingOption) {
      url += `&sortingOption=${sortingOption}`;
    }
    return axios.get(url);
  },
  // 카페 디테일 정보 조회
  detailInfoGet: async(cafeNum) => {
    return await axios.get(`/cafe/detail?cafeNum=${cafeNum}`);
  },
  // 카페 이미지 리스트 조회
  imgListGet: async(cafeNum) => {
    return await axios.get(`/cafe/img?cafeNum=${cafeNum}`);
  },
  // 길드 전체 리스트 조회
  guildInfoGet: async(guildList) => {
    return await axios.get(`/guild/all?guildList=${guildList}`)
  },
  // 특정 길드 디테일 정보 조회
  guildDeInfoGet: async(guildNum) => {
    return await axios.get(`/guild/detail?guildNum=${guildNum}`)
  },
  // 새로운 길드 생성
  createNewGuild: async(memNum, guildName, guildIntro, guildDetailIntro, meetDay, member, region, url) => {
    const guildData = {
      memNum : memNum,
      guildName : guildName,
      guildIntro : guildIntro,
      guildDetailIntro : guildDetailIntro,
      meetDay : meetDay,
      member : member,
      region : region,
      thumbnail : url
    };
    return await axios.post("/guild/newGuild", guildData);
  }
  // 새로운 리뷰 작성
  // 리뷰 조회
  // 카페 좋아요 누르기


};

export default AxiosApi;