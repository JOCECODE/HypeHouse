import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

const HypeHouse: React.FC = () => {
  const { data: sessionData } = useSession();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "idle">("idle");

  const handleSubmitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");
    console.log("handling submit");
    setMessage("");
    // try {
    //   await axios.post('/send-email', {
    //     name,
    //     email,
    //     message,
    //     to: email
    //   });
    //   setStatus('success');
    // } catch (err) {
    //   setStatus('error');
    // }
  };

    const chatMessages = [
        { id: 1, author: 'Uly', text: 'Hello, everyone!' },
        { id: 2, author: 'Alyssa', text: 'Hi Uly, how are you?' },
        { id: 3, author: 'Jose', text: "I'm good, thanks!" },
        { id: 4, author: 'Alfredo', text: 'I will do anything for you it is quite alright these dreams are the ones I close my eyes and look at you.' },
      ];
    
      
  const [inputFocused, setInputFocused] = useState(false); // State to track input focus
  const lastMessageRef = useRef<HTMLLIElement | null>(null); // Reference to the last message element


  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };
  

  useEffect(() => {
    // Scroll to the last message when the component mounts or when chatMessages change
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);
      return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-3xl font-semibold mb-2">HypeHouse Chat</h1>
      <h4 className="text-lg font-semibold mb-2">Members: Uly Alyssa Jose Alfredo</h4>
      <div className="bg-gray-100 p-4 rounded-md">
        {/* Scrollable messages */}
        <div
          className="max-h-60 overflow-y-auto"
          style={{ maxHeight: '450px' }} // Set a max height for the scrollable area
        >
          {/* Render chat messages here */}
          {chatMessages.map((message, index) => (
            <div
              key={message.id}
              className="flex py-4 first:pt-0 last:pb-0"
              ref={index === chatMessages.length - 1 ? lastMessageRef : null} // Set ref to the last message
            >
              <img
                className="h-10 w-10 rounded-full"
                src={
                  sessionData
                    ? sessionData?.user.image
                    : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fthenounproject.com%2Fbrowse%2Ficons%2Fterm%2Fsmall-dog%2F&psig=AOvVaw04JNO4HB8XqOd-6D_OYKon&ust=1695201109934000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCID277aqtoEDFQAAAAAdAAAAABAE'
                }
                alt="googleProfilePicture"
              />
              <div className="mt-1 ml-2">
                <strong>{message.author}:</strong> {message.text}
              </div>
            </div>
          ))}
        </div>
        {/* Input message */}
        <div className={`flex py-4 first:pt-0 last:pb-0 `}>
        {/* <textarea
              className="border border-gray-500 p-2 rounded-lg w-full h-32"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            /> */}
          <textarea
            placeholder={` Hello, ${sessionData?.user.name} text here`}
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-200 mt-1 ml-2 mr-2 w-[80%] text-right pr-1 ${
              inputFocused ? 'bg-white' : 'bg-black/50'
            }`}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {message ? (
          <button
            className="h-10 w-10 rounded-full bg-yellow-400"
            onClick={handleSubmitMessage}
          >
            ^
          </button>
        ) : (
          <img
            className="h-10 w-10 rounded-full"
            src={
              sessionData
                ? sessionData?.user.image
                : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fthenounproject.com%2Fbrowse%2Ficons%2Fterm%2Fsmall-dog%2F&psig=AOvVaw04JNO4HB8XqOd-6D_OYKon&ust=1695201109934000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCID277aqtoEDFQAAAAAdAAAAABAE'
            }
            alt="googleProfilePicture"
          />
        )}
       
        </div>
      </div>
    </div>

      );
    };
    

export default HypeHouse;