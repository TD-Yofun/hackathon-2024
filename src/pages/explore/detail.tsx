import { useNavigate, useParams } from 'react-router-dom';

import Box from '@cobalt/react-box';
import Flex from '@cobalt/react-flex';

import Header from '@/components/Header/Header';
import { useSelector } from '@/store';

import { renderComponent } from '../hackathon';

const ExploreDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.explore);
  const { messages } = useSelector((state) => state.hackathon);

  const item = data.find((item) => item.id === id);

  const activeMessage = messages.find((message) => message.id === id) || null;

  return (
    <Flex width="100%" height="100%" direction="column">
      <Header
        title={item?.name || ''}
        onBackClick={() => {
          navigate(-1);
        }}
      />
      <Box width="100%" grow height="0">
        {renderComponent(activeMessage)}
      </Box>
    </Flex>
  );
};

export default ExploreDetail;
