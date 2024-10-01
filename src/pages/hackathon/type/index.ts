export enum MessageType {
  TEXT = 'text',
  TABLE = 'table',
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
}

/**
 * @deprecated
 */
export interface HackathonModal {
  id: string;
  messages: HackathonMessage[];
  startDate: number;
}
