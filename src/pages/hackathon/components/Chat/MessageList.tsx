import React from 'react';

import Message from './Message';
import { HackathonMessage } from '../../type';

const MessageList = ({
  messages,
  onMessageClick,
}: {
  messages: HackathonMessage[];
  onMessageClick: (message: HackathonMessage) => void;
}) => {
  return (
    <>
      {messages.map((message, i) => {
        const previousMessage = messages[i - 1];

        return (
          <Message
            key={message.id}
            message={message}
            previousMessage={previousMessage}
            onMessageClick={onMessageClick}
          />
        );
      })}
    </>
  );
};

export default MessageList;
