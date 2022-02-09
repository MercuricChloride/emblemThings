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
  const [mappedData, setMappedData] = useState();
  const [root, setRoot] = useState();
  const [proof, setProof] = useState([]);
  //Updates the list to display addresses to provide visual aid
  //Also uses fetched data to generate a merkle proof
  useEffect(async () => {
    const data = await client.query(query).toPromise();
    const results = await data.data.participants.map(item => item.wallet);
    setMappedData(results);
    await results.push('0x807a1752402D21400D555e1CD7f175566088b955');
    const leaves = results.map(x => keccak256(x));
    console.log(await leaves);
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    setRoot(tree.getHexRoot());
    console.log('root: ', root);
    const leaf = keccak256(address);
    setProof(tree.getHexProof(leaf));
    console.log('proof: ', proof);
    console.log('What about this dude?', tree.verify(tree.getHexProof(keccak256('0x000f9987b3352802ad6934402da1a215b1ecef13')), keccak256('0x000f9987b3352802ad6934402da1a215b1ecef13'), root)) // true;
  }, []);

  return (
    <Row justify="center">
      <Form
        onFinish={async () => {
        }}
      >

      </Form>
      <List
        dataSource={mappedData}
        header={<h1>Current List of "Winners"</h1>}
        renderItem={item => {
          return (<List.Item>Wallet: {item}</List.Item>)
        }
        }
      />
      <Divider />
      <h1>Current Merkle root to submit: {root}</h1>
      <Button onClick={async () => {
        const data = await client.query(query).toPromise();
        const results = await data.data.participants.map(item => item.wallet);
        setMappedData(results);
        await results.push('0x807a1752402D21400D555e1CD7f175566088b955');
        console.log(results);
        const leaves = results.map(x => keccak256(x));
        console.log(await leaves);
        const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
        setRoot(tree.getHexRoot());
        console.log('root: ', root);
        const leaf = keccak256(address);
        setProof(tree.getHexProof(leaf));
        console.log('proof: ', proof);
        console.log('What about this dude?', tree.verify(tree.getHexProof(keccak256('0x000f9987b3352802ad6934402da1a215b1ecef13')), keccak256('0x000f9987b3352802ad6934402da1a215b1ecef13'), root)) // true;
        await tx(writeContracts.SimpleBadge.merkleMint(proof, address));
      }}>Click to merkle mint</Button>
    </Row>
  );
}


export default Merkler;