import { IndexableType } from 'dexie';
import type { Component, ComponentProps, Snippet } from 'svelte';

export type SvelteApp = Component<object> & ComponentProps<Component>;

export type AppsType = {
  [key: string]: SvelteApp;
};

export interface ButtonProps {
  children: Snippet;
  url?: string;
  onClick?: () => void;
  size?: 'small' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

export interface HeaderProps {
  logoSize?: number;
  twoRows?: boolean;
}

export interface LogoProps {
  size?: number;
  alt?: string;
}

export interface ModalProps {
  children?: Snippet;
  show?: boolean;
  autoShow?: boolean;
  logo?: boolean;
  loader?: boolean;
  onClose?: () => void;
  text?: string;
  src?: string;
}

export interface RadioProps {
  label: string;
  group: string;
  value: string;
  checked?: boolean;
}

export interface ToggleProps {
  checked?: boolean;
  onClick?: () => void;
  color?: 'red' | 'green' | 'yellow';
}

export interface SendMessageParams {
  type: string;
  tabId?: number;
  command?: string;
}

export type UrlInfo = {
  id: string;
  url: string;
};

export interface UrlService {
  count(): Promise<number>;
  findAll(url: string): Promise<UrlInfo[]>;
  getAll(): Promise<UrlInfo[]>;
  getSome(limit: number): Promise<UrlInfo[]>;
  upsert(info: UrlInfo): Promise<IndexableType>;
  upsertBulk(info: string[]): Promise<IndexableType>;
}
