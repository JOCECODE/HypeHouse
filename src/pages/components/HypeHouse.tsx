import { useSession } from "next-auth/react";
import { useState } from "react";

const HypeHouse: React.FC = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);

    const chatMessages = [
        { id: 1, author: 'Uly', text: 'Hello, everyone!' },
        { id: 2, author: 'Alyssa', text: 'Hi Uly, how are you?' },
        { id: 3, author: 'Jose', text: "I'm good, thanks!" },
        { id: 4, author: 'Alfredo', text: 'I will do anything for you it is quite alright these dreams are the ones I close my eyes and look at you.' },
      ];
    
      
  const [inputFocused, setInputFocused] = useState(false); // State to track input focus

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };
      return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-semibold mb-2">HypeHouse Chat</h1>
          <h4 className="text-lg font-semibold mb-2">Members: Uly Alyssa Jose Alfredo</h4>
          <div className="bg-gray-100 p-4 rounded-md">
            {/* Render chat messages here */}
            {chatMessages.map((message) => (
              <li className="flex py-4 first:pt-0 last:pb-0">
              <img className="h-10 w-10 rounded-full" 
              src={sessionData ? sessionData?.user.image : 
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fthenounproject.com%2Fbrowse%2Ficons%2Fterm%2Fsmall-dog%2F&psig=AOvVaw04JNO4HB8XqOd-6D_OYKon&ust=1695201109934000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCID277aqtoEDFQAAAAAdAAAAABAE"} 
              alt="googleProfilePicture" />
              <div key={message.id} className="mt-1 ml-2">
                        <strong>{message.author}:</strong> {message.text}
                      </div>
            </li>
            ))}
               <li className={`flex py-4 first:pt-0 last:pb-0 `}>
          <input
            type="text"
            placeholder="new message"
            className={`w-200 mt-1 ml-2 mr-2 w-[80%] text-right pr-1 ${inputFocused ? 'bg-white' : 'bg-black/50'}`}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <img
            className="h-10 w-10 rounded-full"
            src={sessionData ? sessionData?.user.image : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fthenounproject.com%2Fbrowse%2Ficons%2Fterm%2Fsmall-dog%2F&psig=AOvVaw04JNO4HB8XqOd-6D_OYKon&ust=1695201109934000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCID277aqtoEDFQAAAAAdAAAAABAE'}
            alt="googleProfilePicture"
          />
        </li>
          </div>
        </div>
      );
    };
    

export default HypeHouse;