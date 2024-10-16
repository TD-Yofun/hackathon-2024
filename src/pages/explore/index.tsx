import { useNavigate } from 'react-router-dom';

import Box from '@cobalt/react-box';
import Button from '@cobalt/react-button';
import Divider from '@cobalt/react-divider';
import Flex from '@cobalt/react-flex';
import Icon from '@cobalt/react-icon';
import Toggle from '@cobalt/react-toggle';
import { Text } from '@cobalt/react-typography';
import SearchInput from '@cobalt-marketplace/react-search-input';

import Table, { Column } from '@industries-packages/react-table';

import Header from '@/components/Header/Header';
import Pagination from '@/components/Pagination/Pagination';
import { HACKATHON_NAME, PADDING_SPACING } from '@/constant';
import { useHooks } from '@/hooks/useHooks';
import { useSelector } from '@/store';
import { ExploreItem } from '@/store/explore';

const Explore = () => {
  const navigate = useNavigate();
  const { data: tableData } = useSelector((state) => state.explore);
  const { theme, responsiveValue } = useHooks();

  const paddingValue = responsiveValue(['12px', '16px', '24px']);

  const columnStyle: Column['style'] = {
    padding: `12px ${paddingValue}`,
  };

  const columns: Column<ExploreItem>[] = [
    {
      title: 'Name',
      key: 'name',
      render: (value, record) => (
        <Text
          color={theme.primary600}
          weight="medium"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/explore/detail/${record.id}`)}
        >
          {record.name}
        </Text>
      ),
      style: columnStyle,
    },
    {
      title: 'Type',
      key: 'type',
      render: (value, record) => <Text>{record.type}</Text>,
      style: columnStyle,
    },
    {
      title: 'Creator',
      key: 'id',
      render: (value, record) => <Text>Default</Text>,
      style: columnStyle,
    },
    {
      title: 'Schedules',
      key: 'schedules',
      render: (value, record) => <Text>{record.schedules}</Text>,
      style: columnStyle,
    },
  ];

  return (
    <Flex width="100%" height="100%" direction="column">
      <Header title="Explore">
        <Flex gap={2}>
          <Button type="secondary" onClick={() => navigate('/explore/hackathon')}>
            <Flex gap={1} alignY="center">
              <Icon name="robot" size="tiny" style={{ marginTop: '-2px' }} />
              <span>{HACKATHON_NAME}</span>
            </Flex>
          </Button>
          <Button>
            <Flex paddingRight={1}>
              <Icon name="chevron_down" size="tiny" />
            </Flex>
            Create
          </Button>
        </Flex>
      </Header>
      <Flex width="100%" height="56px" alignY="center" backgroundColor={theme.gray100} paddingX={PADDING_SPACING}>
        <Flex grow width="0">
          <Text weight="medium">66 items</Text>
        </Flex>

        <Flex gap={2} alignY="center">
          <Flex alignY="center" gap={1}>
            <Icon name="filter_list" size="small" />
            <Text>All types</Text>
            <Icon name="chevron_down" size="small" />
          </Flex>

          <Flex>
            <SearchInput placeholder="Search by name or type..." />
          </Flex>

          <Flex alignY="center" gap={1}>
            <Toggle />
            <Text>Scheduled only</Text>
          </Flex>

          <Flex alignY="center" gap={1}>
            <Icon name="tune" size="small" />
            <Text>Table options</Text>
          </Flex>
        </Flex>
      </Flex>
      <Divider />

      <Box grow height="0" scrollable paddingTop={2}>
        <Table
          columns={columns}
          data={tableData}
          headStyle={{ backgroundColor: '#fff' }}
          rowKey={(record) => record.id}
        />
      </Box>

      <Pagination
        currentPage={1}
        totalPages={4}
        onPageClick={() => {}}
        style={{
          backgroundColor: theme.gray100,
        }}
      />
    </Flex>
  );
};

export default Explore;
