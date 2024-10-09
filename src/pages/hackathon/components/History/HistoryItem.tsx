import { useMemo } from 'react';

import styled from 'styled-components';

import Box from '@cobalt/react-box';
import Flex from '@cobalt/react-flex';
import { Text } from '@cobalt/react-typography';

import { useHooks } from '@/hooks/useHooks';
import { setActiveMessage } from '@/store/hackathon';

import barChartRaw from '../../assets/bar-chart.svg?raw';
import chartRaw from '../../assets/chart.svg?raw';
import lineChartRaw from '../../assets/line-chart.svg?raw';
import pieChartRaw from '../../assets/pie-chart.svg?raw';
import tableRaw from '../../assets/table.svg?raw';
import { HackathonMessage, MessageType } from '../../type';
import { formatDateTime } from '../../utils/day';

const Icon = styled.span`
  width: 28px;
  height: 28px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

interface Props {
  index?: number;
  message: HackathonMessage;
  isChat?: boolean;
}

const ItemMapper: Record<
  MessageType,
  {
    text: string;
    icon: string;
  }
> = {
  [MessageType.TEXT]: {
    text: 'Text',
    icon: '',
  },
  [MessageType.TABLE]: {
    text: 'Table',
    icon: tableRaw,
  },
  [MessageType.CHART]: {
    text: 'Chart',
    icon: chartRaw,
  },
  [MessageType.LINE_CHART]: {
    text: 'Line Chart',
    icon: lineChartRaw,
  },
  [MessageType.BAR_CHART]: {
    text: 'Bar Chart',
    icon: barChartRaw,
  },
  [MessageType.PIE_CHART]: {
    text: 'Pie Chart',
    icon: pieChartRaw,
  },
};

const HistoryItem = ({ message, index, isChat }: Props) => {
  const { theme, dispatch } = useHooks();

  const iconRaw = useMemo(() => {
    // @ts-ignore
    return ItemMapper[message.messageType]?.icon;
  }, [message.messageType]);

  const text = useMemo(() => {
    // @ts-ignore
    return ItemMapper[message.messageType]?.text;
  }, [message.messageType]);

  const no = index !== undefined ? `#00${index + 1}` : 'component';

  const handleClick = () => {
    dispatch(setActiveMessage(message));
  };

  return (
    <Flex padding={2} alignY="center" gap={2} onClick={handleClick}>
      {!!iconRaw && <Icon dangerouslySetInnerHTML={{ __html: iconRaw }} />}
      <Box>
        <Text size={isChat ? 'small' : undefined}>
          {text} {no}
        </Text>
        <Text size="small" color={theme.gray700}>
          {formatDateTime(message.timestamp)}
        </Text>
      </Box>
    </Flex>
  );
};

export default HistoryItem;
