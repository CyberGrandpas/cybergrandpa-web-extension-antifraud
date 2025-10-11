import type { SendMessageParams } from './types';

export const sendMessage = async ({ tabId, type, command }: SendMessageParams) => {
  return await browser.runtime.sendMessage<SendMessageParams>({ tabId, type, command });
};
