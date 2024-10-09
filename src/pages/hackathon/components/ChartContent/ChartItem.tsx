import cc from 'classcat';

import Box from '@cobalt/react-box';

import EChart from '@/components/EChart/EChart';

import styles from './styles.module.scss';

interface Props {
  option: any;
  isCard?: boolean;
}

const ChartItem = ({ option, isCard }: Props) => {
  return (
    <Box
      padding={2}
      width="100%"
      className={cc({
        [styles['card']]: isCard,
      })}
    >
      <EChart option={option} />
    </Box>
  );
};

export default ChartItem;
