import barChart from '../components/ChartContent/chart-bar.json';
import lineChart from '../components/ChartContent/chart-line.json';
import pieChart from '../components/ChartContent/chart-pie.json';
import tableJson1 from '../components/TableContent/table.json';
import tableJson3 from '../components/TableContent/table3.json';
import { MessageType } from '../type';

export interface Conversation {
  question: string;
  answer: string;
  messageType: MessageType;
  component?: {
    name: string;
    data: any;
    analysis?: string;
  };
}

export const CONVERSATIONS: Conversation[] = [
  {
    question: 'Hello',
    answer: `Hello Sara, how can I assist you today?`,
    messageType: MessageType.TEXT,
  },
  {
    question:
      'I need to check if there’s a report that shows all digital and voice interactions from a specific member. Does such a report already exist?',
    answer: `Certainly! To find the interactions by member ID, I recommend using the <b>Banking Omnichannel Interactions Report</b>. 
This report includes each member's unique ID, interaction times, types, also the interaction channel used, among other fields. Could you please provide the member ID you’re looking to analyze?`,
    messageType: MessageType.TABLE,
    component: {
      name: 'Banking Omnichannel Interactions',
      data: tableJson1,
    },
  },
  {
    question: `Great, please use Member ID 0001328560`,
    answer: `I’ve filtered the data to show all interactions for Member ID 0001328560 in the past month`,
    messageType: MessageType.TABLE,
    component: {
      name: 'Banking Interactions from 0001328560',
      data: {
        ...tableJson1,
        data: tableJson1.data.filter((row) => row.external_entity_id === '0001328560'),
      },
    },
  },
  {
    question: `Is it possible to understand if some errors occurred? We have automated notifications in place but we are affraid this member frustration started because he might have not received our first message`,
    answer: `I understand. To determine the failed interactions, I’ll combine data from the Banking Omnichannel Interactions Report and the Studio Flow Execution Report. By cross-referencing the two, I can identify where interactions may not have completed successfully`,
    messageType: MessageType.TABLE,
    component: {
      name: 'SMS Error Interactions',
      data: {
        ...tableJson3,
        data: tableJson1.data.filter((row: any) => row.external_entity_id === '0001328560' && !!row['error_code']),
      },
      analysis: `Based on the combined data, there were 2 SMS errors in the past month. Here are the interaction ids associated: <b>60b346bc68394de38f4594eff106b7c3</b> and <b>f9cdbf715d2f4f518dfd71ff37dd96a7</b>.`,
    },
  },
  {
    question: `That is a great help, and explains a lot. Since we are here, our CMO asked to see which channels our members prefer. Could you use one of the reports for that?`,
    answer: `Here is a summary of their interaction types and channels over the past year.`,
    messageType: MessageType.CHART,
    component: {
      name: 'Interactions Channel Usage Proportion',
      data: [...barChart, ...pieChart],
      analysis: `From the data, it seems that digital channels are the most frequently used, comprising 65% of total interactions, while voice interactions make up 35%. This suggests a preference toward digital channels, though voice interactions remain significant.`,
    },
  },
  {
    question: `Thank you for the detailed insights. Oh one more thing, maybe our CMO is still interested in the overview of interaction channel usage trends over the past few months.`,
    answer: `Of course, here is a summary of interaction channel usage trends across digital and voice channels between April and October.`,
    messageType: MessageType.LINE_CHART,
    component: {
      name: 'Interactions Channel Usage Trends',
      data: lineChart,
      analysis: `From the data, digital channels showed a relatively steady interaction rate, starting with 120 interactions in April and peaking at 230 in August, ending with 210 in October. Voice interactions, on the other hand, experienced more variation, beginning with 220 in April, reaching a high of 330 in September, and concluding at 310 in October. The overall interaction volume saw consistent growth, indicating increasing engagement across both channels.`,
    },
  },
  {
    question: `That is very helpful.`,
    answer: `I’m glad I could help. Is there anything else you’d like to know?`,
    messageType: MessageType.TEXT,
  },
];
