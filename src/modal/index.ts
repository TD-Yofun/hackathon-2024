import { Conversation } from '@/pages/hackathon/hooks/constant';

export enum EventName {
  HACKATHON_INPUT = 'hackathon_input',
}

export type EventAction = { action: EventName.HACKATHON_INPUT; payload: Conversation };
