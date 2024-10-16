export enum MessageType {
  TEXT = 'text',
  TABLE = 'table',
  CHART = 'chart',
  LINE_CHART = 'line_chart',
  BAR_CHART = 'bar_chart',
  PIE_CHART = 'pie_chart',
}

export interface HackathonMessage {
  id: string;
  type: 'received' | 'sent';
  message: string;
  timestamp: number;
  name: string;
  messageType: MessageType;
  loading?: boolean;
  data?: any;
  analysis?: string;
}

/**
 * @deprecated
 */
export interface HackathonModal {
  id: string;
  messages: HackathonMessage[];
  startDate: number;
}
