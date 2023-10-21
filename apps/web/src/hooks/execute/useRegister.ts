import { MsgExecuteContract } from "@terra-money/feather.js";
import { useMemo } from "react";

import {
  ExecuteMsg,
  RegisterMsg,
} from "@member-protocol/cosmwasm-contract-types/types/member/Member.types";

import useMyWallet from "@/src/hooks/useMyWallet";

const useRegister = () => {
  const { myAddress, memberContractAddress } = useMyWallet();

  const msgs = useMemo(() => {
    if (!memberContractAddress || !myAddress) {
      return [];
    }
    const payload: RegisterMsg = {};
    const registerUserMsg: ExecuteMsg = {
      register: payload,
    };
    return [
      new MsgExecuteContract(myAddress, memberContractAddress, registerUserMsg),
    ];
  }, [myAddress, memberContractAddress]);

  return useMemo(() => {
    return { msgs };
  }, [msgs]);
};

export default useRegister;
