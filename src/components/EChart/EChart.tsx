import React, { useEffect, useRef, useState } from 'react';

import Box from '@cobalt/react-box';

import * as echarts from 'echarts';

type Props = React.ComponentProps<typeof Box> & {
  option: any;
};

const EChart = ({ option, ...props }: Props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  const [chartHeight, setChartHeight] = useState(400);

  useEffect(() => {
    chartInstance.current = echarts.init(chartRef.current);
    chartInstance.current.setOption(option);

    // 动态设置高度
    const updateHeight = () => {
      const boundingRect = chartInstance.current?.getDom().getBoundingClientRect();
      setChartHeight(boundingRect?.height || 0);
    };

    updateHeight();

    const observer = new ResizeObserver(() => {
      chartInstance.current?.resize();
      updateHeight();
    });

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      observer.disconnect();
      chartInstance.current?.dispose();
    };
  }, [option]);

  return <Box forwardedRef={chartRef} width="100%" height={`${chartHeight}px`} {...props}></Box>;
};

export default EChart;
