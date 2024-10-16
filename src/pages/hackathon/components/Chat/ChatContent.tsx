import React, { useEffect, useMemo, useRef, useState } from 'react';

import Box from '@cobalt/react-box';
import Button from '@cobalt/react-button';
import Divider from '@cobalt/react-divider';
import Flex from '@cobalt/react-flex';
import Icon from '@cobalt/react-icon';
import Textarea from '@cobalt/react-textarea';

import { v4 } from 'uuid';

import { eventBus, HACKATHON_RECEIVED_NAME, HACKATHON_SENT_NAME, PADDING_SPACING } from '@/constant';
import { useHooks } from '@/hooks/useHooks';
import { EventName } from '@/modal';
import { useSelector } from '@/store';
import { setMessages, setUpdateMessage } from '@/store/hackathon';

import MessageList from './MessageList';
import { useAutoInput } from '../../hooks/useAutoInput';
import { useHackathonRequest } from '../../hooks/useHackathonRequest';
import { HackathonMessage, MessageType } from '../../type';

const ChatContent = () => {
  const { messages } = useSelector((state) => state.hackathon);
  const { dispatch } = useHooks();
  const { request } = useHackathonRequest();
  const { onClick: onInputClick } = useAutoInput();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
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
    const { messageType, message, component } = await request(v);
    const newReplyMessage: HackathonMessage = {
      ...replyMessage,
      loading: false,
      message,
      messageType,
      component,
    };
    dispatch(setUpdateMessage(newReplyMessage));
    inputRef.current?.focus();
  };

  // simulate type message
  const simulateTypeMessage = async (content: string) => {
    setValue('');
    clearInterval(timerRef.current!);
    timerRef.current = setInterval(() => {
      setValue((prev) => {
        if (prev.length === content.length) {
          clearInterval(timerRef.current!);
          return prev;
        }
        return content.slice(0, prev.length + 1);
      });
    }, 50);
  };

  useEffect(() => {
    const unbind = eventBus.subscribe(EventName.HACKATHON_INPUT, ({ action, payload }) => {
      simulateTypeMessage(payload.question);
    });

    return () => {
      unbind();
      clearInterval(timerRef.current!);
    };
  }, []);

  useEffect(() => {
    // scroll to bottom
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages]);

  // let input scroll to end
  useEffect(() => {
    const inputElement = inputRef.current;
    if (!inputElement) return;
    // Scroll the input field to the end
    // inputElement.scrollLeft = inputElement.scrollWidth;
    inputElement.scrollTop = inputElement.scrollHeight;
  }, [value]);

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
              <Textarea
                forwardedRef={inputRef}
                disabled={loading}
                value={value}
                resizable={false}
                onChange={(e: any) => setValue(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter') {
                    handleSend(value);
                  }
                }}
                onClick={onInputClick}
                style={{ height: '80px' }}
              />
              <Button
                type="primary"
                disabled={loading || value.trim() === ''}
                style={{ height: '80px' }}
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
            top: '24px',
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
