import { createStore } from '@/utils';

export const storeLatestUpdate = createStore<string>('13 Jan 2025 11:11:23am', 'local:latestUpdate');

export const storeOnBoardingCompleted = createStore<boolean>(false, 'local:onBoardingCompleted');

export const storeProtectionEnabled = createStore<boolean>(true, 'local:protectionEnabled');

export const storeRealtimeEnabled = createStore<boolean>(false, 'local:realtimeEnabled');

export const storeScanning = createStore<string>('0', 'local:scanning');

export const storeAlertsEnabled = createStore<boolean>(false, 'local:alertsEnabled');

export const storeNewsEnabled = createStore<boolean>(false, 'local:newsEnabled');

export const storePackageType = createStore<string>('0', 'sync:packageType');
