pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "base64-sol/base64.sol";
import "./HexStrings.sol";
import "./SimpleBadge.sol";

contract SVGBadge is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using HexStrings for uint160;
    using Counters for Counters.Counter;

    SimpleBadge badge1;
    SimpleBadge badge2;
    SimpleBadge badge3;
    SimpleBadge badge4;
    SimpleBadge badge5;

    Counters.Counter private _tokenIds;

    constructor(SimpleBadge _badge1, SimpleBadge _badge2, SimpleBadge _badge3, SimpleBadge _badge4, SimpleBadge _badge5) ERC721("SVG_Badge", "SBadge") { 
        badge1 = _badge1;
        badge2 = _badge2;
        badge3 = _badge3;
        badge4 = _badge4;
        badge5 = _badge5;
    }

    function mintItem(address to) public onlyOwner returns (uint256) {
        require(balanceOf(to) <1, 'Token already minted for this address');
        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        _mint(to, id);

        return id;
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        require(_exists(id), "not exist");
        string memory name = string(abi.encodePacked("Badge #", id.toString()));
        string memory description = string(
            abi.encodePacked("SVG Badge Skill Tree")
        );
        string memory image = Base64.encode(bytes(_generateSVGofTokenById(id)));

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                name,
                                '", "description":"',
                                description,
                                '", "external_url":"https://emblemdao.com',
                                id.toString(),
                                '", "owner":"',
                                (uint160(ownerOf(id))).toHexString(20),
                                '", "image": "',
                                "data:image/svg+xml;base64,",
                                image,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    function _generateSVGofTokenById(uint256 id)
        internal
        view
        returns (string memory)
    {
        string memory svg = string(
            abi.encodePacked(
                '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">',
                renderTokenById(id),
                "</svg>"
            )
        );

        return svg;
    }

    // Visibility is `public` to enable it being called by other contracts for composition.
    function renderTokenById(uint256 id) public view returns (string memory) {
        string memory render;
        render = string(
            abi.encodePacked(
                '<g id="inner"><circle class="inner" cx="0" cy="0" r="34" /><circle class="inner" cx="0" cy="0" r="26" /></g>`'
            )
        );
        return render;
    }

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
}
