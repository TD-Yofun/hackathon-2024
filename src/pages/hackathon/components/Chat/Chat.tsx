import React from 'react';

import CobaltAvatar from '@cobalt/react-avatar';
import Box from '@cobalt/react-box';
import Flex from '@cobalt/react-flex';
import { Name } from '@cobalt/react-icon';
import { Text, Heading } from '@cobalt/react-typography';
import { DefaultTranscriptionBubble } from '@cobalt-marketplace/react-transcription-bubble';

import Avatar from './Avatar';

type BubbleProps = React.ComponentProps<typeof DefaultTranscriptionBubble>;

interface Props {
  isConsecutive: boolean;
  time: string;
  name: string;
  children: JSX.Element;
  bot: boolean;
  self: boolean;
  loading: boolean;
  gap: React.ComponentProps<typeof Box>['paddingTop'];
}

const Chat = ({ isConsecutive, time, name, children, bot, self, loading, gap }: Props) => {
  const Loading = () => (
    <Flex width="100%" style={{ flexDirection: self ? 'row-reverse' : 'row' }}>
      <Box
        style={{
          marginRight: self ? 0 : '8px',
          marginLeft: self ? '8px' : 0,
          paddingTop: '26px',
          visibility: !isConsecutive ? 'visible' : 'hidden',
        }}
      >
        <CobaltAvatar size="tiny" skeleton="animated" />
      </Box>
      <Flex direction="column" alignX={self ? 'end' : 'start'}>
        {!isConsecutive ? <Text skeleton={{ type: 'animated', width: 100 }} style={{ marginBottom: '8px' }} /> : null}

        <div style={{ paddingTop: '8px' }}>
          <Heading level={2} skeleton={{ type: 'animated', width: 240 }} />
        </div>
      </Flex>
    </Flex>
  );

  const AvatarContent = () => {
    const icon: Name = !self ? 'robot' : 'headset_mic';
    return <Avatar size="tiny" name="" icon={icon} />;
  };

  const Content = () => {
    const alignment: BubbleProps['alignment'] = self ? 'sent' : 'received';
    let type: BubbleProps['type'] = 'received';
    if (bot) {
      type = 'bot';
    }
    if (self) {
      type = 'sent';
    }
    return (
      <DefaultTranscriptionBubble
        alignment={alignment}
        avatarContent={AvatarContent()}
        content={children}
        name={!isConsecutive ? name : ''}
        time={!isConsecutive ? time : ''}
        type={type}
      />
    );
  };

  return (
    <Box data-testid="chat-content-message-info" paddingTop={gap} width="100%" style={{ overflowWrap: 'anywhere' }}>
      {loading ? Loading() : Content()}
    </Box>
  );
};

export default Chat;
