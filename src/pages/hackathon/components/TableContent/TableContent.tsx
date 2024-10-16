import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Box from '@cobalt/react-box';
import Flex from '@cobalt/react-flex';
import { Text } from '@cobalt/react-typography';

import { Column } from '@industries-packages/react-table';

import Loading from '@/components/Loading';
import { delayPromise } from '@/config/HttpClient';
import { useHooks } from '@/hooks/useHooks';

import styles from './styles.module.scss';
import { HackathonMessage } from '../../type';
import Analyze from '../Analyze/Analyze';

type BoxProps = React.ComponentProps<typeof Box>;

export interface TableContentRef {
  download: () => void;
}

interface Props {
  forwardedRef?: ReturnType<typeof useRef<TableContentRef | null>>;
  message: HackathonMessage;
}

const TableContent = ({ forwardedRef, message }: Props) => {
  const { theme } = useHooks();
  const [loading, setLoading] = useState(false);

  const paddingX: BoxProps['paddingX'] = '2';

  const data = useMemo(() => message.component?.data!, [message.component?.data]);

  const columns: Column<any>[] = useMemo(() => {
    try {
      return data.columns.map((column: any) => {
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
  }, [data.columns]);

  const tableData = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  const generateCSVContent = useCallback(() => {
    // headers
    const headers = columns.map((column) => column.title);
    // rows
    const rows = data.map((row: any) =>
      columns
        .map((column) => {
          const value = row[column.key].toString();
          // if value include ",", replace with "/"
          if (typeof value === 'string' && value.includes(',')) {
            return value.replace(/,/g, '/');
          }
          return value;
        })
        .join(','),
    );

    return [headers.join(','), ...rows].join('\n');
  }, [columns, data]);

  useEffect(() => {
    if (!forwardedRef) return;
    forwardedRef.current = {
      download: () => {
        const csvContent = generateCSVContent();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', 'table.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
    };
  }, [forwardedRef, generateCSVContent]);

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
    <Flex width="100%" height="100%" direction="column" style={{ position: 'relative' }}>
      <Box width="100%" grow scrollable>
        <table className={styles['table']}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key as string}>
                  <Flex width="100%" alignY="center" paddingX={paddingX}>
                    <Text color={theme.gray800} weight="medium">
                      {column.title}
                    </Text>
                  </Flex>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row: any, index: number) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key as string}>
                    <Flex width="100%" alignY="center" paddingX={paddingX}>
                      <Text>{row[column.key]}</Text>
                    </Flex>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      {!!message.component?.analysis && <Analyze message={message.component.analysis} />}
    </Flex>
  );
};

export default TableContent;
