import { create } from "zustand";
import { PasswordType } from "../types/password";

interface PasswordsState {
  passwords: PasswordType[];
  addPassword: (password: PasswordType) => void;
  addMultiplePasswords: (passwords: PasswordType[]) => void;
  removePassword: (passwordId: string) => void;
  updatePassword: (password: PasswordType) => void;
}

const usePasswordsStore = create<PasswordsState>((set) => ({
  passwords: [],

  addPassword: (password) =>
    set((state) => ({ passwords: [...state.passwords, password] })),

  addMultiplePasswords: (passwords) =>
    set((state) => ({ passwords: [...state.passwords, ...passwords] })),

  removePassword: (passwordId) =>
    set((state) => {
      const passwords = state.passwords.filter(
        (password) => password._id !== passwordId
      );

      return { passwords };
    }),

  updatePassword: (password) =>
    set((state) => ({
      passwords: state.passwords.map((oldPassword) =>
        oldPassword._id === password._id ? password : oldPassword
      ),
    })),
}));

export default usePasswordsStore;
