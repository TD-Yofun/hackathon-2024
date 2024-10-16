import { useEffect, useRef, useState } from 'react';

import Flex from '@cobalt/react-flex';
import { Text } from '@cobalt/react-typography';

import imageSrc from './3.png';
import styles from './styles.module.scss';

const TextBubble = ({ message }: { message: string }) => {
  const messageRef = useRef(message);

  const [text, setText] = useState('');

  // simulate typing effect
  useEffect(() => {
    const message = messageRef.current;
    let i = 0;
    const interval = setInterval(() => {
      setText((prev) => prev + message[i]);
      i++;
      if (i === message.length) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return <Text>{text}</Text>;
};

const Analyze = ({ message }: { message: string }) => {
  const [visible, setVisible] = useState(true);

  return (
    <Flex direction="column" alignX="end" gap={2} className={styles['analyze']}>
      {visible && <TextBubble message={message} />}
      <img src={imageSrc} alt="" onClick={() => setVisible(!visible)} />
    </Flex>
  );
};

export default Analyze;
