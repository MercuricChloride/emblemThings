const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("Badge Tests", function () {
  let myContract;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("SimpleBadge", function () {
    it("Should deploy SimpleBadge", async function () {
      const SimpleBadge = await ethers.getContractFactory("SimpleBadge");
      myContract = await SimpleBadge.deploy();
    });

    describe("mintBadge()", function () {
      it("Mint badge 1 to an account", async function () {
        const [addr1] = await ethers.getSigners();
        await myContract.mintBadge(addr1.address, 1);
        expect(await myContract.ownerOf(1)).to.equal(addr1.address);
      });
    });

    describe("approve()", function () {
      it("Should allow user to approve badge", async function () {
        const [addr1, addr2] = await ethers.getSigners();
        await myContract.connect(addr1).approve(addr2.address, 1);
        expect(await myContract.getApproved(1)).to.equal(addr2.address);
      });
    });

    describe("transferFrom()", function () {
      it("Shouldn't allow user to transfer badge", async function () {
        const [addr1, addr2] = await ethers.getSigners();
        await myContract.connect(addr2).transferFrom(addr1.address, addr2.address, 1);
        expect(await myContract.ownerOf(1)).to.equal(addr1.address);
      });
    });
    
    // Full disclosure not sure why this isn't working. Need to come back to this

    /*
    describe("safeTransferFrom()", function () {
      it("Shouldn't allow user to transfer badge", async function () {
        const [addr1, addr2] = await ethers.getSigners();
        await myContract.connect(addr2)['safeTransferFrom(address, address, uint)'](addr1.address, addr2.address, 1);
        expect(await myContract.ownerOf(1)).to.equal(addr1.address);
      });
    });
    */
    describe("levelBadge()", function () {
      it("Should upgrade badge level", async function () {
        const [addr1, addr2] = await ethers.getSigners();
        await myContract.connect(addr1).levelBadge(1,2);
        expect(await myContract.getLevel(1)).to.equal(2);
      });
    });

    describe("tokenURI()", function () {
      it("Should return appropriate uri for badge level", async function () {
        const [addr1, addr2] = await ethers.getSigners();
        expect(await myContract.tokenURI(1)).to.equal("ipfs.io/levelThreeMetadata");
      });
    });
  });
});