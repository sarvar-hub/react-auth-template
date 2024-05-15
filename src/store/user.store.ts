import IUser from "@/interfaces/User";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const updateData = (oldData: IUser, updatedData: IUser): IUser => {
  return {
    ...oldData,
    ...updatedData
  };
};

export const initialUserState: IUser = {
  id: 0,
  username: "",
  email: "",
  token: ""
};

export const userAtom = atomWithStorage('user', initialUserState);

export const updateUserAtom = atom(
  null,
  (get, set, updatedData: IUser) => {
    const oldData = get(userAtom);
    const newData = updateData(oldData, updatedData);
    set(userAtom, newData);
  }
);
