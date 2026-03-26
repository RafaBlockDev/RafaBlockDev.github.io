import { atom } from 'nanostores';

type Lang = 'en' | 'es';

const getInitialLang = (): Lang => {
  if (typeof window === 'undefined') return 'en';
  return (localStorage.getItem('lang') as Lang) || 'en';
};

export const $lang = atom<Lang>(getInitialLang());

export function toggleLang(): void {
  const next: Lang = $lang.get() === 'en' ? 'es' : 'en';
  $lang.set(next);
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', next);
  }
}
