import { create } from "zustand";
import { IPassword } from "../models/password";

interface PasswordsState {
  passwords: IPassword[];
  addPassword: (password: IPassword) => void;
  addMultiplePasswords: (passwords: IPassword[]) => void;
  removePassword: (passwordId: string) => void;
  updatePassword: (password: IPassword) => void;
}

const usePasswordsStore = create<PasswordsState>((set) => ({
  passwords: [],

  addPassword: (password) =>
    set((state) => ({ passwords: [...state.passwords, password] })),

  addMultiplePasswords: (passwords) =>
    set((state) => ({ passwords: [...state.passwords, ...passwords] })),

  // removePassword: (passwordId) =>
  //   set((state) => ({
  //     passwords: state.passwords.filter(
  //       (password) => password._id !== passwordId
  //     ),
  //   })),

  removePassword: (passwordId) =>
    set((state) => {
      const passwords = state.passwords.filter(
        (password) => password._id !== passwordId
      );

      console.log("passwordId: ", passwordId);
      console.log("passwords: ", passwords);

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
