import { create } from "zustand";

interface GlobalState {
  laptopClicked: boolean;
  setLaptopClicked: (value: boolean) => void;
}

const useGlobal = create<GlobalState>()((set) => ({
  laptopClicked: false,
  setLaptopClicked: (value) => set({ laptopClicked: value }),
}));

export default useGlobal;
