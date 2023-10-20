import { useQuery } from '@tanstack/react-query'

import useMyWallet from '@/src/hooks/useMyWallet'
import { NATIVE_DENOM, NATIVE_DENOM_DECIMALS } from '@/src/utils/constants'

const useBalance = () => {
  const { lcd, myAddress } = useMyWallet()

  return useQuery({
    queryKey: ['balance', myAddress, NATIVE_DENOM],
    queryFn: async () => {
      if (!lcd || !myAddress || !NATIVE_DENOM) {
        return 0
      }
      // console.log("coins", coins, pagination);
      const [coins, pagination] = await lcd.bank.balance(myAddress)
      // TODO: handle pagination
      const coin = coins.toData().filter((coin) => coin.denom === NATIVE_DENOM)
      if (coin.length !== 1) {
        return 0
      } else {
        return Number(coin[0].amount) / NATIVE_DENOM_DECIMALS
      }
    },
    enabled: !!myAddress && !!NATIVE_DENOM && !!lcd,
    initialData: 0,
    placeholderData: 0,
  })
}

export default useBalance
