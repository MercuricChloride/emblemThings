import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Col, Input, List, Menu, Row, Tabs, Dropdown, Badge } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Address, AddressInput } from "../components";
import { ethers } from "ethers";

function SVGView({
  /*
  DEBUG,
  readContracts,
  writeContracts,
  tx,
  address,
  updateBalances,
  setUpdateBalances,
  nfts,
  nftsSvg,
  fancyLoogiesNfts,
  selectedFancyLoogie,
  selectedFancyLoogiePreview,
  setSelectedFancyLoogiePreview,
  selectedNfts,
  setSelectedNfts,
  setFancyLoogiesNfts,
  */
}) {
  /*
  useEffect(() => {
    const updatePreview = async () => {
      if (DEBUG) console.log("Updating preview...");
      if (selectedFancyLoogie) {
        let nftUpdate = {};
        const loogieSvg = await readContracts.FancyLoogie.renderTokenById(selectedFancyLoogie);
        let nftsSvg = "";
        for (const nft of nfts) {
          if (selectedNfts[nft]) {
            nftsSvg += await readContracts[nft].renderTokenById(selectedNfts[nft]);
          }
          const svg =
            '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">' + loogieSvg + nftsSvg + "</svg>";
          setSelectedFancyLoogiePreview(svg);
        }
      } else {
        setSelectedFancyLoogiePreview("");
      }
    };
    updatePreview();
  }, [address, selectedFancyLoogie, selectedNfts, updateBalances]);
  */

  const sampleSVG = <g id="inner"><circle class="inner" cx="200" cy="200" r="34" /><circle class="inner" cx="250" cy="250" r="26" /></g>;

  return (
        <div>
          <svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
          {sampleSVG}
          </svg>
        </div>
  );
}

export default SVGView;
