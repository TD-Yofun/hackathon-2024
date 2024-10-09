import { useMemo } from 'react';

import Flex from '@cobalt/react-flex';
import { Text } from '@cobalt/react-typography';

import Table, { Column } from '@industries-packages/react-table';

import Pagination from '@/components/Pagination/Pagination';
import { useHooks } from '@/hooks/useHooks';

import { HackathonMessage } from '../../type';

interface Props {
  message: HackathonMessage;
}

const TableContent = ({ message }: Props) => {
  const { theme } = useHooks();

  const columns: Column<any>[] = useMemo(() => {
    try {
      return message.data.columns.map((column: any) => {
        const newColumn: Column<any> = {
          title: column.title,
          key: column.key,
          render: (value: any) => <Text>{value}</Text>,
          style: {
            // padding: '8px 16px',
          },
        };
        return newColumn;
      });
    } catch (error) {
      return [];
    }
  }, [message.data?.columns]);

  const data = useMemo(() => {
    return message.data?.data || [];
  }, [message.data?.data]);

  return (
    <Flex width="100%" height="100%" direction="column">
      <Table columns={columns} data={data} headStyle={{ backgroundColor: '#fff' }} />
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageClick={() => {}}
        style={{ flexShrink: 0, backgroundColor: theme.gray100 }}
      />
    </Flex>
  );
};

export default TableContent;
