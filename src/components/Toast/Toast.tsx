import { useEffect, useRef } from 'react';

import { styled } from 'styled-components';

import Box from '@cobalt/react-box';
import Button from '@cobalt/react-button';
import Flex from '@cobalt/react-flex';
import Icon, { Name } from '@cobalt/react-icon';
import Message, { Timer } from '@cobalt/react-message';
import { Text } from '@cobalt/react-typography';

import { useHooks } from '@/hooks/useHooks';

type MessageProps = React.ComponentProps<typeof Message>;

const CloseButton = styled(Button)`
  width: 32px;
  height: 32px;
`;

const DURATION = 5000;

interface Props {
  variation: MessageProps['variation'];
  icon?: Name | JSX.Element;
  title?: string;
  message?: string;
  children?: React.ReactNode;
  onRetry?: () => void;
  onClose?: () => void;
  autoClose?: boolean;
  disabled?: boolean;
}

const Toast = ({ variation, icon, title, message, onClose, children, autoClose, disabled }: Props) => {
  const { responsiveValue } = useHooks();

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (autoClose) {
      timerRef.current = setTimeout(() => {
        onClose && onClose();
      }, DURATION);
    }
    return () => {
      const timer = timerRef.current;
      !!timer && clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Message variation={variation} type="floating" data-testid={`activation-toast-${variation}`}>
      <Flex paddingTop="2" paddingBottom="3" paddingX="3" gap={2}>
        {typeof icon === 'string' ? <Icon size={responsiveValue(['tiny', 'small', 'small'])} name={icon} /> : icon}

        <Box grow width="0" style={{ flexShrink: 0 }} paddingTop={1}>
          {children}
          {!children && (
            <Flex gap={1} direction="column">
              {title ? <Text data-testid="toaster-title">{title}</Text> : null}
              {message ? (
                <Text data-testid="toaster-message" size="small">
                  {message}
                </Text>
              ) : null}
            </Flex>
          )}
        </Box>

        <CloseButton
          name="close"
          variation="transparent"
          type="info"
          size="small"
          onClick={onClose}
          disabled={disabled}
        >
          <Icon data-testid="close" name="close" size={responsiveValue(['tiny', 'small', 'small'])} color="white" />
        </CloseButton>
      </Flex>
      {autoClose && <Timer active={true} duration={5} />}
    </Message>
  );
};

export default Toast;
