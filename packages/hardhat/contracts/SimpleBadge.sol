pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleBadge is ERC721, Ownable{

  // @dev init ERC721 name and symbol 
  constructor() ERC721("SimpleBadge", "BADGE") {
  }

  // @dev mapping from tokenId to a level
  mapping (uint => uint) public levels;

  // @dev overrides the transferFrom function to remove the ability to transfer this token
  // @param from, not used, and only to conform to the ERC721 standard
  // @param to, not used, and only to conform to the ERC721 standard
  // @param tokenId, not used, and only to conform to the ERC721 standard
  function transferFrom(address from, address to, uint tokenId) public override{}

  // @dev overrides the safeTransferFrom function to remove the ability to transfer this token
  // @param from, not used, and only to conform to the ERC721 standard
  // @param to, not used, and only to conform to the ERC721 standard
  // @param tokenId, not used, and only to conform to the ERC721 standard
  // @param _data, not used, and only to conform to the ERC721 standard
  function safeTransferFrom(address from, address to, uint tokenId, bytes memory _data) public override{}

  // @dev overrides the safeTransferFrom function to remove the ability to transfer this token
  // @param from, not used, and only to conform to the ERC721 standard
  // @param to, not used, and only to conform to the ERC721 standard
  // @param tokenId, not used, and only to conform to the ERC721 standard
  function safeTransferFrom(address from, address to, uint tokenId) public override{}

  function approve(address to, uint tokenId) public override {
    _approve(to, tokenId);
  }

  function getLevel(uint tokenId) public view returns(uint){
    return levels[tokenId];
  }

  // @dev checks levels mapping at tokenId to get the token level and returns different metadata depending on level
  // @param tokenId, tokenId to return metadata for
  function tokenURI(uint tokenId) public view override returns(string memory) {
    string memory baseURI = "https://bonez.mypinata.cloud/ipfs/Qmc6urNzFH1osFpXPh2Gv4oMNCDHAb3gS6dL6xhZyoZ9vd/";
    string memory _tokenURI;
    if(levels[tokenId] == 0){
      _tokenURI = "Level1.json";
    } else if(levels[tokenId] == 1){
      _tokenURI = "Level2.json";
    } else if(levels[tokenId] == 2){
      _tokenURI = "Level3.json";
    } else {
      _tokenURI = "Level4.json";
    }
    return string(abi.encodePacked(baseURI,_tokenURI));
  }

  function mintBadge(address to, uint tokenId) public onlyOwner {
    require(balanceOf(to) == 0, "badge already minted for this user");
    _safeMint(to, tokenId);
  }

  function levelBadge(uint tokenId, uint level) public onlyOwner {
    levels[tokenId] = level;
  }
}
