import { useCallback } from 'react';

import { delayPromise } from '@/config/HttpClient';

import { CONVERSATIONS } from './constant';
import { MessageType } from '../type';

interface ReturnValue {
  messageType: MessageType;
  message: string;
  data?: any;
  analysis?: string;
}

export function useHackathonRequest() {
  const request = useCallback(async (question: string): Promise<ReturnValue> => {
    let response: ReturnValue;
    const conversation = CONVERSATIONS.find((c) => c.question === question);
    if (conversation) {
      response = {
        messageType: conversation.messageType,
        message: conversation.answer,
        data: conversation.data,
        analysis: conversation.analysis,
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
