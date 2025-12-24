// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "hardhat/console.sol";

contract FortyTwoOnChainNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor()
        ERC721("FortyTwoOnChainNFT", "FTOC")
        Ownable(msg.sender)
    {}

    function _generateSVG() internal pure returns (string memory) {
        // A simple SVG with a dark background and the number 42
        string memory svg = string(abi.encodePacked(
            '<svg width="350" height="350" xmlns="http://www.w3.org/2000/svg">',
            '<rect width="100%" height="100%" rx="15" ry="15" fill="#1e1e1e"/>',
            '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="120" fill="#E94057">42</text>',
            '</svg>'
        ));
        return svg;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        ownerOf(tokenId);
        
        // 1. Get the SVG and Base64 encode it
        string memory svg = _generateSVG();
        string memory imageURI = string(abi.encodePacked("data:image/svg+xml;base64,", Base64.encode(bytes(svg))));

        // 2. Build the JSON metadata object
        string memory json = string(abi.encodePacked(
            '{"name": "On-Chain #42",',
            '"description": "A fully on-chain, self-contained NFT. The image and metadata are stored directly on the blockchain.",',
            '"image": "', imageURI, '"}'
        ));

        // 3. Base64 encode the JSON and return the final data URI
        return string(abi.encodePacked("data:application/json;base64,", Base64.encode(bytes(json))));
    }

    // Mint function no longer needs a URI
    function safeMint(address to)
        public
        onlyOwner
    {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}
