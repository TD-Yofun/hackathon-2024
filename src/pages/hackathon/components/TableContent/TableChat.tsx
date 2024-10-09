import Box from '@cobalt/react-box';

import { useHooks } from '@/hooks/useHooks';

import { HackathonMessage } from '../../type';
import TextChat from '../Chat/TextChat';
import HistoryItem from '../History/HistoryItem';

type Props = React.ComponentProps<typeof TextChat> & {
  message: HackathonMessage;
};

const TableChat = (props: Props) => {
  const { theme } = useHooks();

  return (
    <>
      <TextChat {...props} />
      <Box paddingLeft={9} paddingTop={1} style={{ width: 'fit-content', cursor: 'pointer' }}>
        <Box backgroundColor={theme.gray200} style={{ borderRadius: '4px', overflow: 'hidden' }}>
          <HistoryItem message={props.message} isChat />
        </Box>
      </Box>
    </>
  );
};

export default TableChat;
