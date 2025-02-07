import { createStore } from '@/utils';

export const storeLatestUpdate = createStore<string>('13 January 2025', 'local:latestUpdate');

export const storeOnBoardingCompleted = createStore<boolean>(false, 'sync:onBoardingCompleted');

export const storeProtectionEnabled = createStore<boolean>(false, 'local:protectionEnabled');

export const storeRealtimeEnabled = createStore<boolean>(false, 'local:realtimeEnabled');

export const storeAlertsEnabled = createStore<boolean>(false, 'local:alertsEnabled');

export const storeNewsEnabled = createStore<boolean>(false, 'local:newsEnabled');
