import { ComponentProps } from 'react';

import Flex from '@cobalt/react-flex';
import Spinner from '@cobalt/react-spinner';
import { Text } from '@cobalt/react-typography';

import { useResponsive } from '@industries-packages/react-hooks';

type SpinnerProps = ComponentProps<typeof Spinner>;

interface Props {
  size?: SpinnerProps['size'];
  title?: string;
}

const Loading = ({ size, title }: Props) => {
  const responsive = useResponsive();

  const spinnerSize = size || responsive(['large', 'large', 'xlarge']);

  return (
    <Flex
      data-testid="loading-layout-spinner"
      direction="column"
      width="100%"
      height="100%"
      alignX="center"
      alignY="center"
      padding="6"
    >
      <Spinner size={spinnerSize} />
      {Boolean(title) && (
        <Flex paddingTop={responsive(['4', '4', '6'])} width="100">
          <Text truncated textAlign="center">
            {title}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Loading;
