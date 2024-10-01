import { useCallback } from 'react';

import { delayPromise } from '@/config/HttpClient';
import { HACKATHON_RECEIVED_NAME } from '@/constant';

import { MessageType } from '../type';

interface ReturnValue {
  messageType: MessageType;
  message: string;
  data?: any;
}

const conversations = [
  {
    question: 'Hello',
    answer: `Hello, I'm ${HACKATHON_RECEIVED_NAME}. How can I help you?`,
  },
];

export function useHackathonRequest() {
  const request = useCallback(async (question: string): Promise<ReturnValue> => {
    let response: ReturnValue;
    const conversation = conversations.find((c) => c.question === question);
    if (conversation) {
      response = {
        messageType: MessageType.TEXT,
        message: conversation.answer,
      };
    } else {
      response = {
        messageType: MessageType.TEXT,
        message: 'Sorry, I cannot understand your question',
      };
    }
    return await delayPromise(response);
  }, []);

  return {
    request,
  };
}
