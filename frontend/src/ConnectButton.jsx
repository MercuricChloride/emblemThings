import { useViewerConnection, useViewerRecord } from '@self.id/react';
import { EthereumAuthProvider } from '@self.id/web';
import { Button, Input } from 'antd';
import {useState} from 'react';


async function createAuthProvider() {
  const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' })
  return new EthereumAuthProvider(window.ethereum, addresses[0])
}

// A simple Button to initiate the connection flow. A Provider must be present at a higher level
// in the component tree for the `useViewerConnection()` hook to work.
function ConnectButton() {
  const [connection, connect, disconnect] = useViewerConnection()

  return connection.status === 'connected' ? (
    <Button type="primary"
      onClick={() => {
        disconnect()
      }}>
      Disconnect ({connection.selfID.id})
    </Button>
  ) : 'ethereum' in window ? (
    <Button type="primary"
      disabled={connection.status === 'connecting'}
      onClick={() => {
        createAuthProvider().then(connect)
      }}>
      Connect with ceramic
    </Button>
  ) : (
    <p>
      An injected Ethereum provider such as{' '}
      <a href="https://metamask.io/">MetaMask</a> is needed to authenticate.
    </p>
  )
}

function ShowProfileName() {
  const record = useViewerRecord('basicProfile');

  const text = record.isLoading
    ? 'Loading...'
    : record.content
    ? `Hello ${record.content.name || 'stranger'}, your discord handle is: ${record.content.discord}`
    : 'No profile to load'
  return <p>{text}</p>
}

function SetProfileName() {
    const [name, setName] = useState();
    const [handle, setHandle] = useState();
    const record = useViewerRecord('basicProfile');
    return(
        <div>
            <Input
            onChange={(e) =>{
                setName(e.target.value);
              }
            }
            placeholder="Input your name"
            >
            </Input>
            <Input
            onChange={(e) =>{
                setHandle(e.target.value);
              }
            }
            placeholder="Input your discord handle. IE: USERNAME#6969"
            >
            </Input>
            <Button
              type="primary"
              disabled={!record.isMutable || record.isMutating}
              onClick={async () => {
                await record.merge({
                    name: name,
                    discord: handle 
                })
              }}>
            Update Ceramic Values
            </Button>
        </div>
    );
}



export {ConnectButton, ShowProfileName, SetProfileName};
