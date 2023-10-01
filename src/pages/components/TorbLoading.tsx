import { useSpring, animated } from '@react-spring/web';
import React from "react";

const TorbLoading: React.FC = () => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 }, loop: true });

  return (
    
  <>
  <div className='container mx-auto flex mt-16 items-center justify-center' >
    <animated.div >
    <img src="/torbloading.gif" alt="loading animation" />
  </animated.div>
  </div>
  
  </>
    
  );
};

export default TorbLoading;