import { useRef, useEffect, type ReactNode } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';

function useAutoScroll(dependencies: React.DependencyList) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [dependencies]);

  return containerRef;
}

       type ChatMessagesProps = {
        chatMessages:   {
          id: string;
          message: ReactNode;
          sender: string;
          time: string | number;
        }[];
       }
 
       function ChatMessages({ chatMessages }: ChatMessagesProps) {
         const chatMessagesRef = useAutoScroll([chatMessages]);

         return (
          <div className="chat-messages-container"
           ref={chatMessagesRef} >
            {chatMessages.map((chatMessage) => {
              return (
                <ChatMessage 
                  message={chatMessage.message} 
                  sender={chatMessage.sender} 
                  time={chatMessage.time}
                  key = {chatMessage.id}
                />
             )
          })}
          </div>
         );
       }

       export default ChatMessages;