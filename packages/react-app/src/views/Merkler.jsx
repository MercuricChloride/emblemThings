import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Col, Input, List, Menu, Row, Tabs, Dropdown, Badge, Divider } from "antd";
import { ConsoleSqlOutlined, DownOutlined, ReadOutlined } from "@ant-design/icons";
import { Address, AddressInput } from "../components";
import { ethers } from "ethers";
import { useContractReader } from "eth-hooks";
import { createClient } from 'urql'
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
import keccak256 from "keccak256";
import { useTokenList } from "eth-hooks/dapps/dex";
import { utils } from "ethers";
import Form from "antd/lib/form/Form";

function Merkler({
  readContracts,
  writeContracts,
  tx,
  address,
}) {
  //API URL TO QUERY
  const APIURL = 'https://gateway.thegraph.com/api/38c430110e3ddf172c4efa25959900a1/subgraphs/id/0x63a2368f4b509438ca90186cb1c15156713d5834-0'
  // Query for the subgraph
  const query = `
  {
    participants(first: 6) {
      wallet
    }
  }`
  const client = createClient({
    url: APIURL,
  })
  const [fetchedResults, setFetchedResults] = useState();

  useEffect(async () => {
    setFetchedResults(await fetchData());
  }, []);

  const fetchData = async () => {
    const data = await client.query(query).toPromise();
    const realWallets = await data.data.participants.map(item => item.wallet);
    const wallets = [...realWallets, '0x807a1752402D21400D555e1CD7f175566088b955'];
    const leaves = wallets.map(x => keccak256(x));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const root = tree.getHexRoot();
    const leaf = keccak256(address);
    const proof = tree.getHexProof(leaf);
    return [root, leaf, proof, wallets];
  }

  return (
    <Row justify="center">
      <Form
        onFinish={async () => {
        }}
      >
      </Form>
      <List
        dataSource={fetchedResults ? fetchedResults[3] : ["loading"]}
        header={<h1>Current List of "Winners"</h1>}
        renderItem={item => {
          return (<List.Item>Wallet: {item}</List.Item>)
        }
        }
      />
      <Divider />

      <Button onClick={async () => {
        await tx(writeContracts.SimpleBadge.updateMerkleRoot(fetchedResults[0]));
      }}>Update Merkle Root</Button>

      <Button onClick={async () => {
        await tx(writeContracts.SimpleBadge.merkleMint(fetchedResults[2], address));
      }}>Click to merkle mint</Button>
    </Row>
  );
}


export default Merkler;