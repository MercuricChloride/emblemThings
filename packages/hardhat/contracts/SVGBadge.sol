pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "base64-sol/base64.sol";
import "./HexStrings.sol";
import "hardhat/console.sol";

contract SVGBadge is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using Strings for uint8;
    using HexStrings for uint160;
    using Counters for Counters.Counter;
    uint256 whatever;

    Counters.Counter private _tokenIds;

    constructor(uint256 _whatever) ERC721("SVG_Badge", "SBadge") {
        whatever = _whatever;
    }

    function mintItem() public returns (uint256) {
        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        _mint(msg.sender, id);

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
                                '", "external_url":"https://burnyboys.com/token/',
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
                '<style type="text/css">',
                "<![CDATA[",
                ".con {",
                "stroke-width: 3;",
                "stroke: #BFBFBF;",
                "}",
                ".node {",
                "stroke-width: 4;",
                "stroke: #BFBFBF;",
                "fill: black !important;",
                "}",
                ".inner {",
                "stroke-width: 6;",
                "stroke: #808080;",
                "}",
                '${classes.join("\n")}',
                "]]>",
                "</style>",
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
}
