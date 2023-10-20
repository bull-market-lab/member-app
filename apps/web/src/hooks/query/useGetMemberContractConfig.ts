import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import {
  QueryConfigMsg,
  QueryMsg,
  ConfigResponse,
} from '@member-protocol/cosmwasm-contract-types/types/member/Member.types'

import useMyWallet from '@/src/hooks/useMyWallet'
import { queryWasmContractWithCatch } from '@/src/utils/lcdHelper'

const useGetMemberContractConfig = () => {
  const { lcd, memberContractAddress } = useMyWallet()

  const configResult = useQuery({
    queryKey: ['get_member_contract_config', memberContractAddress],
    queryFn: async () => {
      if (!lcd || !memberContractAddress) {
        return null
      }
      const payload: QueryConfigMsg = {}
      const queryConfigMsg: QueryMsg = {
        query_config: payload,
      }
      const response: ConfigResponse = await queryWasmContractWithCatch(
        lcd,
        memberContractAddress,
        queryConfigMsg,
      )
      return {
        config: response.config,
      }
    },
    enabled: !!memberContractAddress && !!lcd,
  })
  return useMemo(() => {
    return { configResult }
  }, [configResult])
}

export default useGetMemberContractConfig
