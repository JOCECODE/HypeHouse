import React, { useState } from 'react';
import AuthShowcase from './AuthShowcase';
import HypeHouse from './HypeHouse';
import { useSession } from 'next-auth/react';

const ChatFrontPage: React.FC = () => {
  const { data: sessionData } = useSession();
  const [userEntered, setUserEntered] = useState(false);
  const [startQuery, setStartQuery] = useState(false);
  
 
  


  const handleStartQuery = () => {
    setStartQuery(true);
  };

  const handleEnterChatRoom = () => {
    setUserEntered(true);
    handleStartQuery();  
  };


  return (
  <div className='min-h-screen flex flex-col items-center justify-center'>
    {!sessionData?.user ? <HypeHouse/> : <> {startQuery ? <><HypeHouse/></> : <>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-4">HypeHouse Chat Room</h1>
        <p className="text-gray-600 mb-6">Hail Satan</p>
        {!userEntered ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
            onClick={handleEnterChatRoom}
          >
            Enter Chat Room
          </button>
        ) : (
          <p className="text-green-500 font-semibold">HypeHouse Chat Room</p>
        )}
      </div>
      <div className="mt-4"> {/* Add margin top to create space */}
        <AuthShowcase />
      </div></>}</>}
   
  </div>
    
  
  );
};

export default ChatFrontPage;
