import type { SendMessageParams } from './types';

export const getLog = (request: SendMessageParams) => {
  return `[${request.command}] of "${request.type}" executed`;
};
