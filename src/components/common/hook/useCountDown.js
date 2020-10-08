/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

const useCountDown = () => {
  const [countDown, setCountDown] = useState(null);

  useEffect(() => {
    let myTimeout;
    if (countDown > 0) {
      myTimeout = setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }
    if (countDown === 0) setCountDown(null);
    return () => {
      clearTimeout(myTimeout);
    };
  }, [countDown]);

  return { countDown, setCountDown };
};
export default useCountDown;
