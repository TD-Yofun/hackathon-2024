import { useCallback, useMemo } from 'react';

import { eventBus } from '@/constant';
import { EventName } from '@/modal';
import { useSelector } from '@/store';

import { CONVERSATIONS } from './constant';
import { HackathonMessage } from '../type';

export function useAutoInput() {
  const { messages } = useSelector((state) => state.hackathon);

  const loading = useMemo(() => {
    return messages.some((m) => m.loading);
  }, [messages]);

  const handleClick = useCallback(() => {
    if (loading) return;
    // find the last message
    const lastMessage: HackathonMessage | undefined = messages[messages.length - 1];
    if (!lastMessage) return;
    // find next message
    const currentConversationIndex = CONVERSATIONS.findIndex(
      (conversation) => conversation.answer === lastMessage.message,
    );
    if (currentConversationIndex === -1) return;
    const nextConversationIndex = currentConversationIndex + 1;
    const nextConversation = CONVERSATIONS[nextConversationIndex];
    if (!nextConversation) return;
    eventBus.emit(EventName.HACKATHON_INPUT, { action: EventName.HACKATHON_INPUT, payload: nextConversation });
  }, [loading, messages]);

  return {
    onClick: handleClick,
  };
}
