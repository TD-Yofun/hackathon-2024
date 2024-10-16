import { HackathonMessage } from '../type';

const KEY = '__hackathon__2024__';

export const getHackathonMessages = (): HackathonMessage[] => {
  const messages = localStorage.getItem(KEY);
  try {
    if (messages) {
      return JSON.parse(messages);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const saveHackathonMessages = (messages: HackathonMessage[]) => {
  localStorage.setItem(KEY, JSON.stringify(messages));
};
