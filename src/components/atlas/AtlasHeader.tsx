import { useCallback, useEffect, useRef, useState } from 'react';

import Box from '@cobalt/react-box';
import Flex from '@cobalt/react-flex';
import Icon from '@cobalt/react-icon';
import { useTheme } from '@cobalt/react-theme-provider';
import { Text } from '@cobalt/react-typography';

const AtlasHeader = () => {
  const theme = useTheme();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [timer, setTimer] = useState(300);

  const addZero = useCallback((num: number) => {
    return num < 10 ? `0${num}` : num;
  }, []);

  const formatTime = useCallback(
    (time: number) => {
      // give number, return string like '00:00:00'
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;

      return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
    },
    [addZero],
  );

  const runTimer = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setTimer((prev) => prev + 1);
      runTimer();
    }, 1000);
  }, []);

  useEffect(() => {
    runTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [runTimer]);

  return (
    <Flex
      width="100%"
      height="40px"
      paddingLeft={3}
      backgroundColor={theme.primary700}
      alignY="center"
      alignX="space-between"
    >
      <Flex gap={4}>
        <Flex width="28px" height="28px">
          <img
            style={{ width: '100%', height: '100%' }}
            src="https://qa-cdn-talkdesk.talkdeskdev.com/cdn-assets/latest/talkdesk/brand/main_brand/icon/talkdesk_icon_white.svg"
            alt=""
          />
        </Flex>

        <Flex width="28px" height="28px" alignX="center" alignY="center">
          <Icon name="notifications" size="tiny" color={theme.primary400} />
        </Flex>
      </Flex>

      <Flex alignY="center" gap={4}>
        <Flex
          width="103px"
          height="28px"
          style={{
            borderRadius: '16px',
            backgroundColor: 'rgba(250, 250, 250, 0.2)',
          }}
          alignY="center"
          gap={1}
        >
          <Flex
            width="24px"
            height="24px"
            backgroundColor="rgb(0, 168, 112)"
            style={{
              borderRadius: '50%',
            }}
            alignX="center"
            alignY="center"
          >
            <Icon name="available" size="micro" color={theme.white} />
          </Flex>
          <Box>
            <Text style={{ fontSize: '10px', lineHeight: 'normal' }} color={theme.white}>
              Available
            </Text>
            <Text size="small" color={theme.white}>
              {formatTime(timer)}
            </Text>
          </Box>

          <Icon name="expand_more" size="tiny" color={theme.white} />
        </Flex>
        <Flex
          width="24px"
          height="24px"
          backgroundColor={theme.secondary200}
          style={{ borderRadius: '50%' }}
          alignX="center"
          alignY="center"
        >
          <Text size="small" weight="medium">
            YH
          </Text>
        </Flex>

        <Flex width="40px" height="40px" alignX="center" alignY="center" style={{ position: 'relative' }}>
          <Box
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '1px',
              height: '100%',
              backgroundColor: theme.primary400,
              opacity: 0.5,
            }}
          />
          <Icon name="vertical_split" color={theme.primary400} size="small" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AtlasHeader;
