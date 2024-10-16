import { useNavigate } from 'react-router-dom';

import Box from '@cobalt/react-box';
import Flex from '@cobalt/react-flex';

import Header from '@/components/Header/Header';

import tableJson from '../hackathon/components/TableContent/table.json';
import TableContent from '../hackathon/components/TableContent/TableContent';
import { MessageType } from '../hackathon/type';

const ExploreDetail = () => {
  const navigate = useNavigate();

  return (
    <Flex width="100%" height="100%" direction="column">
      <Header
        title="Custom Table"
        onBackClick={() => {
          navigate(-1);
        }}
      />
      <Box width="100%" grow height="0">
        <TableContent
          message={{
            id: '1',
            type: 'received',
            message: 'table',
            timestamp: 0,
            name: 'test',
            messageType: MessageType.TABLE,
            data: tableJson,
          }}
        />
      </Box>
    </Flex>
  );
};

export default ExploreDetail;
