import { useEffect, useState } from 'react';

import Box from '@cobalt/react-box';
import Flex from '@cobalt/react-flex';

import Loading from '@/components/Loading';
import { delayPromise } from '@/config/HttpClient';
import { useHooks } from '@/hooks/useHooks';

import ChartItem from './ChartItem';
import { HackathonMessage } from '../../type';
import Analyze from '../Analyze/Analyze';

interface Props {
  message: HackathonMessage;
}

const ChartContent = ({ message }: Props) => {
  const { theme } = useHooks();
  const [loading, setLoading] = useState(false);

  const chartJson = message.data;

  useEffect(() => {
    const mockFetch = async () => {
      setLoading(true);
      await delayPromise('data');
      setLoading(false);
    };
    mockFetch();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box width="100%" height="100%" style={{ position: 'relative' }}>
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
      {message.analysis && <Analyze message={message.analysis} />}
    </Box>
  );
};

export default ChartContent;
