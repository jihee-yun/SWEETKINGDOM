import axios from "axios";

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
  createNewGuild: async(grantType, accessToken, memNum, guildName, guildIntro, guildDetailIntro, meetDay, category, member, region, url) => {
    const guildData = {
      memNum : memNum,
      guildName : guildName,
      guildIntro : guildIntro,
      guildDetailIntro : guildDetailIntro,
      meetDay : meetDay,
      category: category,
      member : member,
      region : region,
      thumbnail : url
    };
    return await axios.post("/guild/newGuild", guildData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
  // 길드 가입 회원 확인하기
  isMemberGet: async(guildNum, userNum) => {
    return await axios.get(`/guild/isMember?guildNum=${guildNum}&userNum=${userNum}`)
  },
  //길드 가입하기
  joinGuild: async(guildNum, userNum, grantType, accessToken) => {
    const data = {
      guildNum: guildNum,
      userNum: userNum
    }
    return await axios.post(`/guild/join`, data, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
  // 새로운 리뷰 작성
  createNewReview: async(memNum, cafeNum, content, score, url1, url2, grantType, accessToken) => {
    const reviewData = {
      memNum: memNum,
      cafeNum: cafeNum,
      content: content,
      score: score,
      url1: url1,
      url2: url2
    }
    return await axios.post(`/review/newReview`, reviewData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
  // 특정 카페 리뷰 조회
  cafeReviewGet: async(cafeNum, category) => {
    return await axios.get(`/review/cafeReview?cafeNum=${cafeNum}&category=${category}`);
  },
  // 리뷰 수정
  editReview: async(cafeNum, reviewNum, content, editScore, url1, url2, grantType, accessToken) => {
    const data = {
      cafeNum: cafeNum,
      reviewNum: reviewNum,
      content: content,
      editScore: editScore,
      url1: url1,
      url2: url2 
    }
    return await axios.post(`/review/edit`, data, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
  // 리뷰 삭제
  deleteReview: async(id, cafeNum, grantType, accessToken) => {
    const data = {
      reviewId: id,
      cafeNum: cafeNum
    }
    return await axios.post(`/review/delete`, data, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
  // 리뷰 좋아요
  reviewLike: async(memNum, id, grantType, accessToken) => {
    const data = {
      memNum: memNum,
      reviewId: id
    }
    return await axios.post(`/review/like`, data, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
  // 카페 좋아요 
  cafeLike: async(cafeNum, memNum, grantType, accessToken) => {
    const data = {
      cafeNum: cafeNum,
      memNum: memNum
    }
    return await axios.post(`/cafe/like`, data, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
  // 카페 좋아요 상태값 관리
  getLikeState: async(cafeNum, memNum, grantType, accessToken) => {
    return await axios.get(`/cafe/getLike?cafeNum=${cafeNum}&memNum=${memNum}`, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },

  // 회원가입 여부 
  checkId : async(userId) => {
    return await axios.get(`/user/check?userId=${userId}`);
  },
  
    // 회원가입
    userReg : async(userId, password, name, phone, email, birthday, signUpTime, gender, authority) => {
        const member ={
            userId : userId,
            password: password,
            name : name,
            phone : phone,
            email : email,
            birthday : birthday,
            signUpTime : signUpTime,
            gender : gender,
            authority : authority
    };
        return await axios.post("/user/new", member);
    },

    // 로그인
    userLogin: async (userId, password, grantType, accessToken) => {
      const loginData = {
        userId: userId,
        password: password
      };

    return await axios.post("/user/login", loginData)
  },


  // 새 비밀번호
  changePassword : async(email, newPassword) => {
    const data = {
      email : email,
      newPassword : newPassword
    }
    return await axios.post("/member/changePw", data);
  },



  // 비밀번호 찾기
  findPw: async(email, memberId, name) => {
    const data = { 
        email : email,
        memberId : memberId,
        name : name
    };
    return await axios.post("/member/findPw", data);
  },

    // 아이디 찾기
    findId : async(name, email) => {
      const data = {
        name : name,
        email : email
      };
      return await axios.post("/member/findId", data);
    },

    // 사용자 삭제
    deleteUsers : async(memberNum) => {
        return await axios.delete(`/admin/usermanage/delete/${memberNum}`);
    },

    // 리뷰 삭제
    deleteReviews : async(reviewNum) => {
        return await axios.delete(`/admin/review/delete/${reviewNum}`);
    },

    // 신고 삭제
    deleteReports : async(reportNum) => {
      return await axios.delete(`/admin/report/delete/${reportNum}`);
    },

    // 사용자 정보 수정
    saveUserInfo : async(userInfoToSave) => {
      const {memberNum} = userInfoToSave;
      try {
        return await axios.put(`/admin/usermanage/modify/${memberNum}`, userInfoToSave);
      } catch(error) {
        throw error;
      }
    },
    
    // 신고 전체 조회
    reportGetAll: async () => {
      return await axios.get('/admin/report/all');
    },

    // 신고 내용 조회
    reportGetContents : async(reportNum) => {
      return await axios.get(`/admin/report/getContents?reportNum=${reportNum}`)
    },

    // 리뷰 전체 조회
    reviewGetAll : async() => {
      return await axios.get(`/admin/review/all`);
    },

    // 사용자 조회
    userGetAll : async() => {
      return await axios.get(`/admin/usermanage`);
    },

    // 관리자 로그인
    adminLogin : async(adminId, password) => {
      const adminData = {
        adminId : adminId,
        password : password
      }
      return await axios.post(`/admin/login`, adminData);
    },

    // 관리자 등록
    adminReg : async(adminId, password, name, birthday, phone, gender) => {
      const admin = {
          adminId : adminId,
          password : password,
          name : name,
          birthday : birthday,
          phone : phone,
          gender : gender
      };

      return await axios.post(`/admin/register`, admin);
    },

  // 챌린지 조회
  challengeGet: async(chList) => {
    return await axios.get(`/challenge/chList?chList=${chList}`);
  },

  // 쿠폰 조회
  getCoupon: async(couponget) => {
    return await axios.get(`/couponstore/couponget?couponget=${couponget}`);
  },

  // 이벤트 포인트 적립
  pointGet: async(memberNum, winning, pointType, grantType, accessToken) => {
    const points = {
      memberNum: memberNum,
      point: winning,
      pointType: pointType
    };
    return await axios.post("/point/pointadd", points, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },

  // 내 정보 조회
  myInfoGet: async(memberNum, grantType, accessToken) => {
    return await axios.get(`/member/myinfo?memberNum=${memberNum}`, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },

  // 챌린지 신청
  challengeApply: async(challengeId, memberId, grantType, accessToken) => {
    const data = {
      challengeId: challengeId,
      memberId: memberId
    };
    return await axios.post("/mychallenge/apply", data, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },

  // 마이챌린지 조회
  mychallengeGet: async(userNum, challengeId, grantType, accessToken) => {
    return await axios.get(`/mychallenge/get?userNum=${userNum}&challengeId=${challengeId}`, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },

  // 쿠폰 결제
  couponPayment: async(memberNum, couponId, grantType, accessToken) => {
    const data = {
      memberNum: memberNum,
      couponId: couponId
    };
    return await axios.post("/couponstore/couponpay", data, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },

  // 인기 카페 4곳 조회
  fourCafeGet: async(fourCafes) => {
    return await axios.get(`/cafe/fourCafes?fourCafes=${fourCafes}`)
  },

  // 룰렛 하루에 한번
  rouletteSpin: async(memberNum, grantType, accessToken) => {
    const data = {
      memberNum: memberNum
    }
    return await axios.post("/roulette/spin", data, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },

  // 룰렛 기록 조회
  rouletteHistory: async(memberNum, grantType, accessToken) => {
    const data = {
      memberNum: memberNum
    } 
    return await axios.post(`/roulette/history`, data, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },


  // 랭킹정보 불러오기
    MainInfoGet: async(rankingcard) => {
        return await axios.get(`/main/rankingcard`)
    },

    // 자주묻는 질문 불러오기
    QnaGet: async(category) => {
      return await axios.get(`/auth/qnalist/get-qna?category=${category}`)
  },

  // 리뷰 전체 다 불러오기(테스트용)
  reviewGet: async (userNum, grantType, accessToken) => {
    return await axios.get(`/review/getbynum?usernum=${userNum}`, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },

  // 회원 번호로 날짜 내의 리뷰 조회
  reviewGetByDate : async (userNum, startDate, endDate, grantType, accessToken) => {
    const checkData = {
      userNum : userNum,
      startDate : startDate,
      endDate : endDate
    }
    return await axios.post(`/review/getbynumdate`, checkData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },

  // 유저 번호로 챌린지 관련 정보 전체 조회
  getMemberChallengeInfo: async (userNum, grantType, accessToken) => {
    return await axios.get(`/challenge/getbynum?usernum=${userNum}`, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },

  // 회원 번호로 날짜 내의 이벤트 내역 조회
  getEventByDate : async (userNum, startDate, endDate, grantType, accessToken) => {
    const checkData = {
      userNum : userNum,
      startDate : startDate,
      endDate : endDate
    }
    return await axios.post(`/event/getbynumdate`, checkData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
  // 회원 번호로 날짜 내의 포인트 충전, 사용 내역 조회
  getPointByDate : async (userNum, startDate, endDate, grantType, accessToken) => {
    const checkData = {
      userNum : userNum,
      startDate : startDate,
      endDate : endDate
    }
    return await axios.post(`/point/getbynumdate`, checkData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
  // 회원 번호로 날짜 내의 문의, 신고 내역 조회
  getReportByDate : async (userNum, startDate, endDate, grantType, accessToken) => {
    const checkData = {
      memberNum : userNum,
      startDate : startDate,
      endDate : endDate
    }
    return await axios.post(`/info/reportgetbynumdate`, checkData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
  // 포인트 충전
  chargePoint: async (userNum, point, grantType, accessToken) => {
    const pointData = {
      userNum : userNum,
      point : point
    }
    return await axios.post(`/point/chargepoint`, pointData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });

  },

  // 일반 회원 가입
  userSignup : async (userId, password, name, phone, email, birthday, gender, authority) => {
    const signupData = {
      userId : userId,
      password : password,
      name : name,
      phone : phone,
      email : email,
      birthday : birthday,
      gender : gender,
      authority : authority
    }
    return await axios.post(`/user/signup`, signupData);
  },

  // 사업자 회원 가입
  memberSignup : async (memberId, password, name, phone, email, birthday, gender, authority) => {
    const signupData = {
      memberId : memberId,
      password : password,
      name : name,
      phone : phone,
      email : email,
      birthday : birthday,
      gender : gender,
      authority : authority
    }
    return await axios.post(`/member/signup`, signupData);
  },

  // 일반 회원 로그인
  userLogin : async (userId, password) => {
    const loginData = {
      userId : userId,
      password : password
    }
    return await axios.post(`/user/login`, loginData);
  },
  // 사업자 회원 로그인
  memberLogin : async (memberId, password) => {
    const loginData = {
      memberId : memberId,
      password : password
    }
    return await axios.post(`/member/login`, loginData);
  },

  // 마이페이지 대시보드용 회원 정보 조회
  getMemberAllInfo : async (memberNum, grantType, accessToken) => {
    return await axios.get(`/info/allinfo?membernum=${memberNum}`, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
  // 마이페이지 회원 번호로 길드 정보 조회
  getMemberGuildInfo: async (memberNum, grantType, accessToken) => {
    return await axios.get(`/guild/guildinfo?membernum=${memberNum}`, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },

  // 마이페이지 정보수정을 위한 회원 정보 조회
  getMemberInfo: async (memberNum, grantType, accessToken) => {
    return await axios.get(`/info/memberinfo?membernum=${memberNum}`, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },

  // 비밀번호 업데이트
  passwordUpdate: async (memberNum, password, newPassword, grantType, accessToken) => {
    const passwordData = {
      memberNum : memberNum,
      password : password,
      newPassword : newPassword
    }
    return await axios.post(`/info/passwordchange`, passwordData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },

  // 한줄소개 업데이트
  introUpdate: async (memberNum, intro, grantType, accessToken) => {
    const introData = {
      memberNum : memberNum,
      intro : intro
    }
    return await axios.post(`/info/introchange`, introData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
  // 전화 번호 업데이트
  phoneUpdate: async(memberNum, phone, grantType, accessToken) => {
    const phoneData = {
      memberNum : memberNum,
      phone : phone
    }
    return await axios.post(`/info/phonechange`, phoneData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
  // 이메일 업데이트
  emailUpdate: async(memberNum, email, grantType, accessToken) => {
    const emailData = {
      memberNum : memberNum,
      email : email
    }
    return await axios.post(`/info/emailchange`, emailData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
    // 회원 탈퇴
  memberWithdraw : async(memberNum, grantType, accessToken) => {
    return await axios.get(`/info/memberwithdraw?membernum=${memberNum}`, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    })
  },

  weatherInfoGet: async(regionList) => {
    return await axios.get(`/weather/get?regionList=${regionList}`);
  },

  // 카페 등록
  cafeCreate: async(userNum, cafeName, selectedRegion, cafeAddress, cafeTime, cafePhone, cafeIntro, cafeDetail, url, grantType, accessToken) => {
    const cafeData = {
      memberNum : userNum,
      cafeName : cafeName,
      selectedRegion : selectedRegion,
      cafeAddress : cafeAddress,
      cafeTime : cafeTime,
      cafePhone : cafePhone,
      cafeIntro : cafeIntro,
      cafeDetail : cafeDetail,
      url : url
    }
    return await axios.post(`/cafe/cafecreate`, cafeData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
  // 이메일 인증
  emailCheck: async(email) => {
    const mailData = {
      mail: email
    }
    return await axios.post(`/mail/confirm`, mailData);
  },
  // 인증번호 확인
  codeCheck: async(email, code) => {
    const verifyData = {
      mail: email,
      code: code
    }
    return await axios.post(`/mail/verify`, verifyData);
  },

  // 카페 검색 기능
  searchListLoad: async (keyword) => {
    return await axios.get(`/cafe/searchList?keyword=${keyword}`)
  },
  // 문의사항 등록
  summitReport: async(userNum, grantType, accessToken, category, questionType, title, content) => {
    const requestData = {
      userNum: userNum,
      title: title,
      content: content,
      userType: category,
      category: questionType
    }
    return await axios.post(`/report/newQuestion`, requestData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  }
};

export default AxiosApi;