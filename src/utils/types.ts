import { type Snippet } from 'svelte';

export interface ButtonProps {
  children: Snippet;
  url?: string;
  onClick?: () => void;
  size?: 'small' | 'large';
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
  text: string;
  src?: string;
  show?: boolean;
  onClose?: () => void;
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
}
