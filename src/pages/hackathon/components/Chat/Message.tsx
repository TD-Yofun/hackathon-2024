import React, { Fragment, useMemo } from 'react';

import Box from '@cobalt/react-box';
import Divider from '@cobalt/react-divider';
import { useTheme } from '@cobalt/react-theme-provider';
import { Text } from '@cobalt/react-typography';

import { PADDING_SPACING } from '@/constant';

import { useMessage } from './hooks/useMessage';
import TextChat from './TextChat';
import { HackathonMessage, MessageType } from '../../type';
import { formatDateTime } from '../../utils/day';
import TableChat from '../TableContent/TableChat';

interface Props {
  message: HackathonMessage;
  previousMessage?: HackathonMessage;
  onMessageClick: (message: HackathonMessage) => void;
}

const Message = ({ message, previousMessage, onMessageClick }: Props) => {
  const theme = useTheme();
  const chat = useMessage(message, previousMessage);
  const { isFirst } = chat;

  const header = useMemo(() => {
    if (isFirst) {
      return (
        <Box paddingTop={PADDING_SPACING}>
          <Divider>
            <Text size="small" color={theme.gray600}>
              {formatDateTime(message.timestamp)}
            </Text>
          </Divider>
        </Box>
      );
    }
    return <></>;
  }, [isFirst, message.timestamp, theme.gray600]);

  const content = useMemo(() => {
    switch (message.messageType) {
      case MessageType.TEXT:
        return <TextChat {...chat} messageBody={chat.messageBody} />;
      default: {
        return <TableChat {...chat} message={message} />;
      }
    }
  }, [chat, message]);

  return (
    <Fragment key={message.id}>
      {header}
      {content}
    </Fragment>
  );
};

export default Message;
