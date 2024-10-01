import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@cobalt/react-box';
import Flex from '@cobalt/react-flex';

import { v4 } from 'uuid';

import Header from '@/components/Header/Header';
import { HACKATHON_NAME, HACKATHON_RECEIVED_NAME } from '@/constant';
import { useHooks } from '@/hooks/useHooks';
import { setHackathonLoading, setMessages, setUpdateMessage } from '@/store/hackathon';

import ChatContent from './components/Chat/ChatContent';
import History from './components/History/History';
import NoConversation from './components/State/NoConversation';
import { useHackathonRequest } from './hooks/useHackathonRequest';
import { HackathonMessage, MessageType } from './type';

const HackathonPage = () => {
  const { dispatch } = useHooks();
  const navigate = useNavigate();
  // const { messages } = useSelector((state) => state.hackathon);
  const { request } = useHackathonRequest();

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
    initMessage();
  }, [dispatch, request]);

  return (
    <Flex width="100%" height="100%" direction="column">
      <Header
        onBackClick={() => navigate(-1)}
        title={`Hello, ${HACKATHON_NAME}`}
        description="Let’s get started with your hackathon!"
      />
      <Flex grow height="0" width="100%">
        {/* history file */}
        <History />

        {/* content */}
        <Box grow width="0" height="100%">
          <NoConversation />
        </Box>

        {/* chat */}
        <ChatContent />
      </Flex>
    </Flex>
  );
};

export default HackathonPage;
