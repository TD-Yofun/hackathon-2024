import cc from 'classcat';

import Box from '@cobalt/react-box';
import Divider from '@cobalt/react-divider';
import Flex from '@cobalt/react-flex';
import Icon from '@cobalt/react-icon';
import List, { ClickableItem } from '@cobalt/react-list';
import { Heading, Text } from '@cobalt/react-typography';

import { useHooks } from '@/hooks/useHooks';
import { useSelector } from '@/store';

import HistoryItem from './HistoryItem';
import styles from './styles.module.scss';
import { MessageType } from '../../type';

const History = () => {
  const { theme } = useHooks();
  const { messages, activeMessage } = useSelector((state) => state.hackathon);
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
    } else {
      return (
        <Box padding={2}>
          <List>
            {historyFiles.map((message, index) => {
              const isActive = message.id === activeMessage?.id;

              return (
                <ClickableItem
                  onClick={() => {}}
                  className={cc({
                    [styles['item']]: true,
                    [styles['active']]: isActive,
                  })}
                >
                  <HistoryItem message={message} key={message.id} index={index} />
                </ClickableItem>
              );
            })}
          </List>
        </Box>
      );
    }
  };

  if (historyFiles.length === 0) {
    return <></>;
  }

  return (
    <>
      <Box width="260px" height="100%" scrollable>
        {render()}
      </Box>
      <Divider vertical />
    </>
  );
};

export default History;
