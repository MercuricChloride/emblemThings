import injectedModule from '@web3-onboard/injected-wallets'
import {
    init,
    useConnectWallet,
    useSetChain,
    useWallets
} from "@web3-onboard/react";
import { Button } from 'antd';

const INFURA_ID = "e100d19208f2496a90050eeaf0509240";
const injected = injectedModule();
init({
    wallets: [injected],
     chains: [{
        id: '0x1',
        token: 'ETH',
        label: 'Ethereum Mainnet',
        rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`
        }] 
});

export default function Login({}){
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
    const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
    const connectedWallets = useWallets()
    return(
    <div>
      <Button type="primary" onClick={() => connect()}>
        {connecting ? 'connecting' : 'Connect your wallet'}
      </Button>
      {wallet && (
        <div>
          <label>Switch Chain</label>
          {settingChain ? (
            <span>Switching chain...</span>
          ) : (
            <select
              onChange={({ target: { value } }) =>
                console.log('onChange called') || setChain({ chainId: value })
              }
              value={connectedChain.id}
            >
              {chains.map(({ id, label }) => {
                return <option value={id}>{label}</option>
              })}
            </select>
          )}
          <Button type="primary" onClick={() => disconnect(wallet)}>
            Disconnect Wallet
          </Button>
        </div>
      )}

      {connectedWallets.map(({ label, accounts }) => {
        return (
          <div>
            <div>{label}</div>
            <div>Accounts: {JSON.stringify(accounts, null, 2)}</div>
          </div>
        )
      })}
    </div>
    );
}
