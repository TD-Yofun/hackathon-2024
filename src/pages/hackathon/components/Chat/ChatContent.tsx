import React, { useEffect, useMemo, useRef, useState } from 'react';

import Box from '@cobalt/react-box';
import Button from '@cobalt/react-button';
import Divider from '@cobalt/react-divider';
import Flex from '@cobalt/react-flex';
import Icon from '@cobalt/react-icon';
import Input from '@cobalt/react-input';

import { v4 } from 'uuid';

import { HACKATHON_RECEIVED_NAME, HACKATHON_SENT_NAME, PADDING_SPACING } from '@/constant';
import { useHooks } from '@/hooks/useHooks';
import { useSelector } from '@/store';
import { setMessages, setUpdateMessage } from '@/store/hackathon';

import MessageList from './MessageList';
import { useHackathonRequest } from '../../hooks/useHackathonRequest';
import { HackathonMessage, MessageType } from '../../type';

const ChatContent = () => {
  const { messages } = useSelector((state) => state.hackathon);
  const { dispatch } = useHooks();
  const { request } = useHackathonRequest();

  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(true);

  const [value, setValue] = useState('');

  const loading = useMemo(() => {
    return messages.some((m) => m.loading);
  }, [messages]);

  const handleSend = async (v: string) => {
    v = v.trim();
    if (!v) return;

    // send
    const sentMessage: HackathonMessage = {
      id: v4(),
      type: 'sent',
      message: v,
      timestamp: Date.now(),
      name: HACKATHON_SENT_NAME,
      loading: false,
      messageType: MessageType.TEXT,
    };
    setValue('');
    // replay
    const replyMessage: HackathonMessage = {
      id: v4(),
      type: 'received',
      message: 'loading...',
      timestamp: Date.now(),
      name: HACKATHON_RECEIVED_NAME,
      loading: true,
      messageType: MessageType.TEXT,
    };
    dispatch(setMessages([...messages, sentMessage, replyMessage]));
    const { messageType, message, data, analysis } = await request(v);
    const newReplyMessage: HackathonMessage = {
      ...replyMessage,
      loading: false,
      message,
      messageType,
      data,
      analysis,
    };
    dispatch(setUpdateMessage(newReplyMessage));
    inputRef.current?.focus();
  };

  useEffect(() => {
    // scroll to bottom
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Divider vertical />
      <Box style={{ position: 'relative' }} height="100%">
        <Box
          style={{
            width: expanded ? '400px' : 0,
            transition: 'width 0.3s',
            overflow: 'hidden',
          }}
          height="100%"
        >
          <Flex direction="column" width="400px" height="100%" paddingY={2}>
            <Box grow scrollable width="100%" height="0" forwardedRef={scrollerRef}>
              <Box paddingY={2} paddingX={PADDING_SPACING}>
                <MessageList
                  messages={messages}
                  onMessageClick={
                    (message) => {}
                    // dispatch({
                    //   type: HackathonAction.SET_ACTIVE_MESSAGE,
                    //   payload: message.id,
                    // })
                  }
                />
              </Box>
            </Box>
            <Divider />
            <Flex width="100%" gap={2} paddingY={2} paddingX={PADDING_SPACING}>
              <Input
                forwardedRef={inputRef}
                disabled={loading}
                value={value}
                onChange={(e: any) => setValue(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter') {
                    handleSend(value);
                  }
                }}
              />
              <Button
                type="primary"
                disabled={loading || value.trim() === ''}
                onClick={() => {
                  handleSend(value);
                }}
              >
                Send
              </Button>
            </Flex>
          </Flex>
        </Box>
        <Flex
          onClick={() => setExpanded(!expanded)}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            position: 'absolute',
            backgroundColor: 'var(--gray-200)',
            top: '14px',
            left: '-14px',
            cursor: 'pointer',
          }}
          alignX="center"
          alignY="center"
        >
          <Icon name={expanded ? 'chevron_right' : 'chevron_left'} size="small" color="var(--primary-600)" />
        </Flex>
      </Box>
    </>
  );
};

export default ChatContent;
