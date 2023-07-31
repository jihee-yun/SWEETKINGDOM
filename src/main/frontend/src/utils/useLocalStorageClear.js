import { useEffect } from "react";

const useLocalStorageClear = () => {
   // useEffect를 사용하여 컴포넌트가 마운트될 때 이벤트 리스너를 등록합니다.
   useEffect(() => {
    window.addEventListener('unload', handleBeforeUnload);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
    window.removeEventListener('unload', handleBeforeUnload);
    };
}, []);

// unload 이벤트 핸들러를 정의합니다.
const handleBeforeUnload = (event) => {
    // 사용자가 브라우저를 닫는 경우에만 로컬 스토리지를 비웁니다.
    if (event.isTrusted &&!event.defaultPrevented) {
    localStorage.clear();
    }
  };
};

export default useLocalStorageClear;

