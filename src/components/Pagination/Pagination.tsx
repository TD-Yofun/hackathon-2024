import { useEffect, useState } from 'react';

import Box from '@cobalt/react-box';
import Flex from '@cobalt/react-flex';
import Icon from '@cobalt/react-icon';
import List, { ClickableItem } from '@cobalt/react-list';
import { Portal } from '@cobalt/react-portal-provider';
import { Text } from '@cobalt/react-typography';
import CobaltPagination from '@cobalt-marketplace/react-pagination';

import { usePosition, getDirection, useOutsideClick } from '@industries-packages/react-hooks';
import Popup from '@industries-packages/react-popup';

import { useHooks } from '@/hooks/useHooks';

type CobaltPaginationProps = React.ComponentProps<typeof CobaltPagination>;
type FlexProps = React.ComponentProps<typeof Flex>;

type Props = Pick<CobaltPaginationProps, 'currentPage' | 'totalPages' | 'onPageClick' | 'variation'> &
  Pick<
    FlexProps,
    'padding' | 'paddingBottom' | 'paddingRight' | 'paddingLeft' | 'paddingTop' | 'paddingX' | 'paddingY'
  > & {
    className?: string;
    style?: React.CSSProperties;
  };

const Pagination = ({ currentPage, totalPages, onPageClick, variation, ...props }: Props) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const { responsiveValue, theme } = useHooks();

  const size: 'small' | 'medium' = responsiveValue(['small', 'medium', 'medium']);
  variation = variation || responsiveValue(['pages', undefined, undefined]);

  const [visible, setVisible] = useState(false);
  const [targetNode, setTargetNode] = useState<HTMLElement | null>(null);
  const [containerNode, setContainerNode] = useState<HTMLElement | null>(null);
  const [tempContainerNode, setTempContainerNode] = useState<HTMLElement | null>(null);

  const { position } = usePosition(targetNode, containerNode, getDirection(size), visible, {
    expectedDirection: 'y',
  });
  useOutsideClick({
    refs: [targetNode, containerNode],
    handler: () => setVisible(false),
  });

  useEffect(() => {
    if (!tempContainerNode) return;
    const observer = new ResizeObserver(() => {
      setContainerNode(tempContainerNode);
    });
    observer.observe(tempContainerNode);
    return () => observer.disconnect();
  }, [tempContainerNode]);

  return (
    <>
      <Flex width="100%" padding={2} alignX="space-between" alignY="center" data-testid="table-pagination" {...props}>
        <CobaltPagination
          currentPage={currentPage}
          totalPages={totalPages}
          maxPagesCount={5}
          previousLabel={'Previous'}
          nextLabel={'Next'}
          onPageClick={onPageClick}
          onNextClick={() => onPageClick(currentPage + 1)}
          onPreviousClick={() => onPageClick(currentPage - 1)}
          variation={variation}
        />

        <Flex alignY="center" gap={responsiveValue([1, 2, 2])}>
          <Text color={theme.gray600}>{'Jump to'}:</Text>
          <Flex
            style={{ cursor: 'pointer' }}
            alignY="center"
            forwardedRef={setTargetNode}
            onClick={() => setVisible(!visible)}
            data-testid="expand"
          >
            <Text>{currentPage}</Text>
            <Icon name={visible ? 'chevron_up' : 'chevron_down'} size="tiny" />
          </Flex>
        </Flex>
      </Flex>
      <Portal>
        <Popup
          data-testid="table-pagination-jump-to-popup"
          visible={visible && !!position}
          style={{ ...position }}
          forwardedRef={setTempContainerNode}
        >
          <Box padding={responsiveValue([1, 2, 2])}>
            <List>
              {pages.map((page) => (
                <ClickableItem
                  key={page}
                  onClick={() => {
                    onPageClick(page);
                    setVisible(false);
                  }}
                  data-testid={`table-pagination-jump-to-popup-item_${page}`}
                >
                  <Flex
                    padding={1}
                    alignY="center"
                    width={responsiveValue(['60px', '80px', '80px'])}
                    data-testid={`table-pagination-jump-to-popup-item-box_${page}`}
                  >
                    <Text size={size} style={{ flexGrow: 1, flexShrink: 0 }}>
                      {page}
                    </Text>

                    <Icon
                      style={{ opacity: page === currentPage ? 1 : 0 }}
                      name="check"
                      size={responsiveValue(['micro', 'tiny', 'tiny'])}
                      color={theme.green700}
                    />
                  </Flex>
                </ClickableItem>
              ))}
            </List>
          </Box>
        </Popup>
      </Portal>
    </>
  );
};

export default Pagination;
