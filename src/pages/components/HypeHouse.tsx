import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { api } from "../../utils/api";
import TorbLoading from "./TorbLoading";
import AuthShowcase from "./AuthShowcase";

const HypeHouse: React.FC = () => {
  const mutation = api.example.writeText.useMutation();
  const {isLoading, refetch, isError, data: messageData } = api.example.getAllMessages.useQuery(undefined,  {
    refetchOnWindowFocus: true,
    
  });

  function runOnceAfterDelay() {
    setTimeout(() => {
      // This code will run after waiting for 1 second
      console.log("This code runs once after waiting for 1 second.");
      refetch();
  
      // You can put your own code here that you want to execute after the delay.
    }, 500); // 1000 milliseconds = 1 second
  }
  
  
  const { data: sessionData } = useSession();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "idle">("idle");

  const handleSubmitMessage = async () => {
    mutation.mutate({
      img: sessionData?.user.image,
      name: sessionData?.user.name,
      message: message,
      email: sessionData?.user.email,

    });
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
    runOnceAfterDelay();
  };

  const buttonStyle: React.CSSProperties = {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
    backgroundColor: "#ffdb4d",
    animation: "buttonAnimation .8s",
    transformOrigin: "center",
    cursor: "pointer",
    fontSize: "36px",
  };
  
      
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
  }, [messageData]);
      return (

        
       isLoading ? <TorbLoading/>: <> 
       <AuthShowcase/>
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
           {isLoading ? "loading" : <>{messageData.map((text, index) => (
             <div
               key={text.id}
               className="flex py-4 first:pt-0 last:pb-0"
               ref={index === messageData.length - 1 ? lastMessageRef : null} // Set ref to the last message
             >
               <img
                 className="h-10 w-10 rounded-full"
                 src={text.img}
                 alt="googleProfilePicture"
               />
               <div className="mt-1 ml-2">
                 <strong>{text.name}:</strong> {text.message}
               </div>
             </div>
           ))}</>}
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
             style={{resize: "none"}}
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
             onClick={handleSubmitMessage}
             style={buttonStyle}
           >
             &#8593;
           </button>
         ) : (
           <img
             className="h-10 w-10 rounded-full"
             style={{ height: "50%", width: "17%"}}
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
       
       <style>
         {`
           @keyframes buttonAnimation {
             0% {
               transform: scale(.1) rotate(180deg); /* Initial scale */
               background-color: none; /* Initial background color */
               font-size: 36px;
             }
             
             100% {
               transform: scale(1); /* Slightly larger scale at midpoint */
               background-color: #ffdb4d; /* Color change at midpoint */
               font-size: 36px;
               transform: scale(1) rotate(0deg);
             }
             
           }
         `}
       </style>
     </div>
     </>

      );
    };
    

export default HypeHouse;