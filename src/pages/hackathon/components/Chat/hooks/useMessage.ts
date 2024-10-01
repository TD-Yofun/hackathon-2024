import React, { useMemo } from 'react';

import Box from '@cobalt/react-box';

import { HackathonMessage } from '@/pages/hackathon/type';

import { formatMessageTime, getIsFirstMessage, getMessageIsConsecutive } from '../../../utils/message';

type Gap = React.ComponentProps<typeof Box>['padding'];

export function useMessage(message: HackathonMessage, previousMessage?: HackathonMessage) {
  // const search = useAppSelector((state) => state.search);
  // const { getMessageName, getAuthorType } = useAuthorName(message);

  // const preMessageType = previousMessage
  //   ? getMessageType(previousMessage)
  //   : undefined;
  // const messageType = getMessageType(message);

  const isConsecutive = getMessageIsConsecutive(message, previousMessage);
  const time = formatMessageTime(message.timestamp);

  const bot = message.type === 'received';
  const self = message.type === 'sent';
  const name = message.name;
  // const messageBody = getMessageBody(message);
  const messageBody = message.message;
  // const isEmpty = getIsEmptyMessage(message);
  const isFirst = getIsFirstMessage(message, previousMessage);
  const loading = !!message.loading;

  const gap: Gap = useMemo(() => {
    if (isConsecutive || isFirst) return '1';
    return ['3', '4', '6'];
  }, [isConsecutive, isFirst]);

  return {
    time,
    name,
    isConsecutive,
    self,
    bot,
    // messageType,
    messageBody,
    isFirst,
    // isEmpty,
    // search,
    gap,
    loading,
  };
}
