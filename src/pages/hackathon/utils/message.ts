import { isEqual } from './day';
import { HackathonMessage } from '../type';

export const getIsFirstMessage = (currentMessage: HackathonMessage, previousMessage: HackathonMessage | undefined) => {
  if (!previousMessage) return true;

  return !isEqual(new Date(currentMessage.timestamp), new Date(previousMessage.timestamp), 'd');
};

export const getMessageIsConsecutive = (
  currentMessage: HackathonMessage,
  previousMessage: HackathonMessage | undefined,
) => {
  if (!previousMessage) return false;

  return currentMessage.name === previousMessage.name;
};

export const formatMessageTime = (timestamp: number) => {
  // give a timestamp and return as string time like 12:00 AM
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hour = hours % 12 || 12;
  const minute = minutes < 10 ? `0${minutes}` : minutes;
  return `${hour}:${minute} ${ampm}`;
};
