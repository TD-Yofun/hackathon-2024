import { useCallback } from 'react';

import { delayPromise } from '@/config/HttpClient';
import { HACKATHON_RECEIVED_NAME } from '@/constant';

import chartJson from '../components/ChartContent/chart.json';
import tableJson from '../components/TableContent/table.json';
import { MessageType } from '../type';

interface ReturnValue {
  messageType: MessageType;
  message: string;
  data?: any;
}

const conversations: Array<{
  question: string;
  answer: string;
  messageType: MessageType;
  data?: any;
}> = [
  {
    question: 'Hello',
    answer: `Hello, I'm ${HACKATHON_RECEIVED_NAME}. How can I help you?`,
    messageType: MessageType.TEXT,
  },
  {
    question: 'table',
    answer: 'Ok, I have generated a table for you by your request',
    messageType: MessageType.TABLE,
    data: tableJson,
  },
  {
    question: 'chart',
    answer: 'Ok, I have generated a chart for you by your request',
    messageType: MessageType.CHART,
    data: chartJson,
  },
  {
    question: 'chart1',
    answer: 'Ok, I have generated a chart for you by your request',
    messageType: MessageType.LINE_CHART,
    data: [chartJson[0]],
  },
  {
    question: 'chart2',
    answer: 'Ok, I have generated a chart for you by your request',
    messageType: MessageType.BAR_CHART,
    data: [chartJson[1]],
  },
  {
    question: 'chart3',
    answer: 'Ok, I have generated a chart for you by your request',
    messageType: MessageType.PIE_CHART,
    data: [chartJson[2]],
  },
  {
    question: 'chart4',
    answer: 'Ok, I have generated a chart for you by your request',
    messageType: MessageType.LINE_CHART,
    data: [chartJson[3]],
  },
];

export function useHackathonRequest() {
  const request = useCallback(async (question: string): Promise<ReturnValue> => {
    let response: ReturnValue;
    const conversation = conversations.find((c) => c.question === question);
    if (conversation) {
      response = {
        messageType: conversation.messageType,
        message: conversation.answer,
        data: conversation.data,
      };
    } else {
      response = {
        messageType: MessageType.TEXT,
        message: 'Sorry, I cannot understand your question',
      };
    }
    return await delayPromise(response);
  }, []);

  return {
    request,
  };
}
