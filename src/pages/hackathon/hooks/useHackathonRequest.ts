import { useCallback } from 'react';

import { delayPromise } from '@/config/HttpClient';

import { Conversation, CONVERSATIONS } from './constant';
import { MessageType } from '../type';

type ReturnValue = Pick<Conversation, 'messageType' | 'component'> & {
  message: string;
};

export function useHackathonRequest() {
  const request = useCallback(async (question: string): Promise<ReturnValue> => {
    let response: ReturnValue;
    const conversation = CONVERSATIONS.find((c) => c.question === question);
    if (conversation) {
      response = {
        messageType: conversation.messageType,
        message: conversation.answer,
        component: conversation.component,
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
