import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ICurrency } from "../domain/Currency";

export interface ICurrencyState {
  currency: ICurrency;
  setCurrency: (currency: ICurrency) => void;
  resetCurrency: () => void;
}

const initCurrency: ICurrency = {
  name: "United States",
  coin: "USD $",
  sign: "$",
};

export const useCurrencyStore = create(persist<ICurrencyState>((set) => ({
  currency: initCurrency,
  setCurrency: (currency: ICurrency) => set(() => ({ currency })),
  resetCurrency: () => set((state) => ({
    ...state,
    currency: initCurrency
  })),
}), {
  name: 'currency',
}));
