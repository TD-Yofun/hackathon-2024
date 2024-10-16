import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import _deepClone from 'lodash/cloneDeep';

import Box from '@cobalt/react-box';
import Button from '@cobalt/react-button';
import Flex from '@cobalt/react-flex';

import { v4 } from 'uuid';

import Header from '@/components/Header/Header';
import { HACKATHON_NAME, HACKATHON_RECEIVED_NAME } from '@/constant';
import { useHooks } from '@/hooks/useHooks';
import { useSelector } from '@/store';
import { setExploreData } from '@/store/explore';
import { setActiveMessage, setHackathonLoading, setMessages, setUpdateMessage } from '@/store/hackathon';
import { addToast } from '@/store/toast';

import SaveModal from './components/Actions/SaveModal';
import ChartContent from './components/ChartContent/ChartContent';
import ChatContent from './components/Chat/ChatContent';
import History from './components/History/History';
import NoConversation from './components/State/NoConversation';
import TableContent, { TableContentRef } from './components/TableContent/TableContent';
import { useHackathonRequest } from './hooks/useHackathonRequest';
import { HackathonMessage, MessageType } from './type';
import { getHackathonMessages, saveHackathonMessages } from './utils/storage';

const HackathonPage = () => {
  const { dispatch } = useHooks();
  const navigate = useNavigate();
  const { activeMessage, messages } = useSelector((state) => state.hackathon);
  const { data } = useSelector((state) => state.explore);
  const { request } = useHackathonRequest();

  const tableRef = useRef<TableContentRef | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const renderActions = () => {
    if (activeMessage?.messageType === MessageType.TABLE) {
      return (
        <>
          <Button type="secondary" onClick={() => tableRef.current?.download()}>
            Download
          </Button>
        </>
      );
    }
  };

  const renderContent = () => {
    if (!activeMessage) {
      return <NoConversation />;
    }
    if (activeMessage.messageType === MessageType.TABLE) {
      return <TableContent forwardedRef={tableRef} message={activeMessage} />;
    }
    if (
      [MessageType.CHART, MessageType.BAR_CHART, MessageType.LINE_CHART, MessageType.PIE_CHART].includes(
        activeMessage.messageType,
      )
    ) {
      return <ChartContent key={activeMessage.id} message={activeMessage} />;
    }
  };

  // init conversation

  useEffect(() => {
    const initMessage = async () => {
      const loadingMessage: HackathonMessage = {
        id: v4(),
        type: 'received',
        message: 'loading...',
        timestamp: Date.now(),
        name: HACKATHON_RECEIVED_NAME,
        loading: true,
        messageType: MessageType.TEXT,
      };

      dispatch(setMessages([loadingMessage]));
      dispatch(setHackathonLoading(true));
      const response = await request('Hello');
      // update message
      dispatch(setUpdateMessage({ id: loadingMessage.id, loading: false, message: response.message }));
      dispatch(setHackathonLoading(false));
    };
    const messages = getHackathonMessages();
    if (messages.length > 0) {
      dispatch(setMessages(messages));
    } else {
      initMessage();
    }
  }, [dispatch, request]);

  // save messages to local storage
  useEffect(() => {
    saveHackathonMessages(messages);
  }, [messages]);

  // auto set active message
  useEffect(() => {
    const componentMessages = messages.filter((m) => m.messageType !== MessageType.TEXT);
    if (componentMessages.length > 0) {
      dispatch(setActiveMessage(componentMessages[componentMessages.length - 1]));
    }
  }, [dispatch, messages]);

  return (
    <Flex width="100%" height="100%" direction="column">
      <Header
        onBackClick={() => {
          navigate(-1);
        }}
        title={`Hello, ${HACKATHON_NAME}`}
        description="The Smart Reports is an intelligent data report generator that allows users to create desired reports and charts through natural language conversations with AI"
      >
        <Flex alignY="center" gap={2}>
          <Button
            type="secondary"
            onClick={() => {
              dispatch(setActiveMessage(null));
              dispatch(setMessages([]));
            }}
          >
            Clear
          </Button>

          {renderActions()}

          {!!activeMessage && <Button onClick={() => setShowSaveModal(true)}>Save</Button>}
        </Flex>
      </Header>
      <Flex grow height="0" width="100%">
        {/* history file */}
        <History />

        {/* content */}
        <Box grow width="0" height="100%">
          {renderContent()}
        </Box>

        {/* chat */}
        <ChatContent />
      </Flex>

      {!!showSaveModal && (
        <SaveModal
          onCancel={() => setShowSaveModal(false)}
          onConfirm={(value) => {
            // show success toast
            dispatch(
              addToast({
                type: 'success',
                id: v4(),
                title: "Save successfully! Let's check it out in the explore page.",
                autoClose: true,
              }),
            );
            // add to history
            const first = _deepClone(data[0]);
            dispatch(setExploreData([{ ...first, name: value }, ...data]));
            // dismiss modal
            setShowSaveModal(false);
          }}
        />
      )}
    </Flex>
  );
};

export default HackathonPage;
