import { writable } from 'svelte/store';

export const toast = writable<{ message: string; show: boolean }>({ message: '', show: false });

export function showPopup(message: string, duration = 2500) {
  toast.set({ message, show: true });
  setTimeout(() => {
    toast.set({ message: '', show: false });
  }, duration);
}