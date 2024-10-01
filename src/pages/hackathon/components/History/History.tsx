import Box from '@cobalt/react-box';
import Divider from '@cobalt/react-divider';
import Flex from '@cobalt/react-flex';
import Icon from '@cobalt/react-icon';
import { Heading, Text } from '@cobalt/react-typography';

import { useHooks } from '@/hooks/useHooks';
import { useSelector } from '@/store';

import { MessageType } from '../../type';

const History = () => {
  const { theme } = useHooks();
  const { messages } = useSelector((state) => state.hackathon);
  const historyFiles = messages.filter((message) => message.messageType !== MessageType.TEXT);

  const render = () => {
    if (historyFiles.length === 0) {
      return (
        <Flex width="100%" height="100%" alignX="center" alignY="center" gap={3} direction="column" paddingX={3}>
          <Icon name="inbox" size="xlarge" color={theme.gray500} />

          <Heading level={2}>No conversation</Heading>

          <Text textAlign="center" color={theme.gray700}>
            You haven't generated any diagrams yet
          </Text>
        </Flex>
      );
    }
  };

  return (
    <>
      <Box width="260px" height="100%">
        {render()}
      </Box>
      <Divider vertical />
    </>
  );
};

export default History;
