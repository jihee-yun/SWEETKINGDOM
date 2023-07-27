// import React, { useEffect, useContext, useState } from 'react';
// import Stomp from '@stomp/stompjs';
// import { UserContext } from "../../context/UserStore";

// const WebSocket = () => {
//   const { isLogin, userNum } = useContext(UserContext); // 로그인 여부를 가져옵니다.
//   const [messageContent, setMessageContent] = useState('');

//   let stompClient;

//   useEffect(() => {
//     if (isLogin) { // 로그인이 되어 있을 때만 실행합니다.
//       // 새로운 웹소켓 연결 생성
//       const socket = new WebSocket('ws://localhost:8111'); // 서버 주소로 바꿔야 함

//       // stompClient 생성
//       stompClient = Stomp.over(socket);

//       // 연결 시도
//       stompClient.connect({}, () => {
//         // 로그인 시 자신의 고유번호를 기반으로 특정 토픽 구독
//         stompClient.subscribe(`/sub/${userNum}`, (message) => {
//           // 서버로부터 받은 알림 메시지 처리 (예시로 콘솔에 출력)
//           console.log(message.body);
//           setMessageContent(message.body);
//         });
//       });

//       // 컴포넌트가 언마운트되면 웹소켓 연결 해제
//       return () => {
//         stompClient.disconnect();
//       };
//     }
//   }, [isLogin, userNum]);

//   console.log(messageContent);

//   if (!isLogin) { // 로그인이 안 되어 있을 때, 혹은 로그인 상태를 확인하는 상태가 없을 때 컴포넌트 내용을 숨길 수 있습니다.
//     return null;
//   }

//   return (
//     <div>
//       {/* 컴포넌트 내용 */}
//     </div>
//   );
// };

// export default WebSocket;
