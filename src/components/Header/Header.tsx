import React, { useState } from 'react';

import Box from '@cobalt/react-box';
import Divider from '@cobalt/react-divider';
import Flex from '@cobalt/react-flex';
import Icon from '@cobalt/react-icon';
import { Heading, Text } from '@cobalt/react-typography';

import { PADDING_SPACING } from '@/constant';

interface Props {
  title: string;
  description?: string;
  onBackClick?: () => void;
  children?: React.ReactNode;
}

const Header = ({ title, description, onBackClick, children }: Props) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <>
      <Flex padding={PADDING_SPACING} backgroundColor="#fff" width="100%" gap={1} alignY="center">
        <Flex width="0" grow gap={1}>
          {!!onBackClick && (
            <Flex
              height={headerHeight}
              onClick={() => {
                onBackClick();
              }}
              alignY="center"
              style={{ cursor: 'pointer' }}
            >
              <Icon name="arrow_back_ios" size="tiny" style={{ marginTop: '-2px' }} />
            </Flex>
          )}

          <Box grow>
            <Heading
              forwardedRef={(node) => {
                setHeaderHeight(node?.offsetHeight || 0);
              }}
              level={1}
            >
              {title}
            </Heading>
            {description && <Text color="var(--gray-700)">{description}</Text>}
          </Box>
        </Flex>
        {children}
      </Flex>
      <Divider />
    </>
  );
};

export default Header;
