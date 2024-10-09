import Flex from '@cobalt/react-flex';

import { useHooks } from '@/hooks/useHooks';

import ChartItem from './ChartItem';
import { HackathonMessage } from '../../type';

interface Props {
  message: HackathonMessage;
}

const ChartContent = ({ message }: Props) => {
  const { theme } = useHooks();

  const chartJson = message.data;

  return (
    <Flex
      key={message.messageType}
      padding={3}
      scrollable
      width="100%"
      height="100%"
      direction="column"
      gap={3}
      backgroundColor={theme.gray100}
    >
      {chartJson.map((option: any, index: number) => {
        return <ChartItem key={index} option={option} isCard />;
      })}
    </Flex>
  );
};

export default ChartContent;
