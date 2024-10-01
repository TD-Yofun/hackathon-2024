import React from 'react';

import { Text } from '@cobalt/react-typography';

import Chat from './Chat';

type Props = Omit<React.ComponentProps<typeof Chat>, 'children'> & {
  messageBody: string;
};

const TextChat = (props: Props) => {
  return (
    <Chat {...props}>
      <Text>{props.messageBody}</Text>
    </Chat>
  );
};

export default TextChat;
