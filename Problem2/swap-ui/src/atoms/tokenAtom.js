import { atom } from "recoil";

export const selectedTokenFromAtom = atom({
  key: "selectedTokenFromAtom",
  default: {
    currency: "ETH",
    date: "2023-08-29T07:10:52.000Z",
    price: 1645.9337373737374,
  },
});

export const selectedTokenToAtom = atom({
  key: "selectedTokenToAtom",
  default: {},
});
