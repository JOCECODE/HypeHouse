import React, { useState } from 'react';
import AuthShowcase from './AuthShowcase';
import HypeHouse from './HypeHouse';
import { useSession } from 'next-auth/react';
import {api} from "../../utils/api";
import TorbLoading from './TorbLoading';

const ChatFrontPage: React.FC = () => {
  const { data: sessionData } = useSession();
  const userInformation = api.example.getUser.useQuery({email: `${sessionData?.user.email}`});
  const [userEntered, setUserEntered] = useState(false);
  const [startQuery, setStartQuery] = useState(false);
  // if sessionData.user === approved user display HypeHouse else show the chat room button. 
  // There should also be a log in log out button so that they can 
  // userInformation.isLoading display something else show the component
  // then the second check should be userInformation.data?.email === sessionData?.user.email

 console.log(userInformation.data?.email === sessionData?.user.email);
  const handleStartQuery = () => {
    setStartQuery(true);
  };

  const handleEnterChatRoom = () => {
    setUserEntered(true);
    handleStartQuery();  
  };


  return (
  <div className='min-h-screen flex flex-col items-center justify-center'>
  
      
    {userInformation.data?.email === sessionData?.user.email  ? <HypeHouse/> : <> {userInformation.isLoading ? <TorbLoading/> : <>{userInformation.isFetched ? <> <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
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
      <div className="mt-4"> 
        <AuthShowcase />
      </div></>
      : <></>}
      </>}
    </>}
     
   
  </div>
    
  
  );
};

export default ChatFrontPage;
