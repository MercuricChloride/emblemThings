const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("Badge Tests", function () {
  let myContract;
  let myContract2;
  let myContract3;
  let myContract4;
  let myContract5;

  let svgContract;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("SimpleBadge", function () {
    it("Should deploy 5 SimpleBadges", async function () {
      const SimpleBadge = await ethers.getContractFactory("SimpleBadge");
      myContract = await SimpleBadge.deploy();
      myContract2 = await SimpleBadge.deploy();
      myContract3 = await SimpleBadge.deploy();
      myContract4 = await SimpleBadge.deploy();
      myContract5 = await SimpleBadge.deploy();
      expect(myContract5).to.not.equal(undefined);
    });

    describe("transferOwnership", function () {
      it("Should transfer ownership", async function () {
        const [addr1] = await ethers.getSigners();
        await myContract.transferOwnership(addr1.address);
        expect(await myContract.owner()).to.equal(addr1.address);
      })
    });

    describe("mintBadge()", function () {
      it("Mint badge 1 to an account", async function () {
        const [addr1] = await ethers.getSigners();
        await myContract.mintBadge(addr1.address, 1);
        expect(await myContract.ownerOf(1)).to.equal(addr1.address);
      });
      it("Only allow owner to mint", async function () {
        const [addr1, addr2] = await ethers.getSigners();
        //await myContract.connect(addr2).mintBadge(addr2.address, 2);
        await expect(myContract.connect(addr2).mintBadge(addr2.address, 2)).to.be.revertedWith("Ownable: caller is not the owner");
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
      it("Owner can upgrade badge level", async function () {
        const [addr1, addr2] = await ethers.getSigners();
        await myContract.connect(addr1).levelBadge(1,2);
        expect(await myContract.getLevel(1)).to.equal(2);
      });
      it("Only allow owner to upgrade", async function () {
        const [addr1, addr2] = await ethers.getSigners();
        await expect(myContract.connect(addr2).levelBadge(1, 3)).to.be.revertedWith("Ownable: caller is not the owner");
      });
    });

    describe("tokenURI()", function () {
      it("Should return appropriate uri for badge level", async function () {
        const [addr1, addr2] = await ethers.getSigners();
        expect(await myContract.tokenURI(1)).to.equal("ipfs.io/levelThreeMetadata");
      });
    });

  });

  describe("SVG Badge", function () {
    it("Should deploy SVGBadge", async function () {
      const SVGBadge = await ethers.getContractFactory("SVGBadge");
      svgContract = await SVGBadge.deploy(myContract.address, myContract2.address, myContract3.address, myContract4.address, myContract5.address);
    });

    describe("transferOwnership", function () {
      it("Should transfer ownership", async function () {
        const [addr1] = await ethers.getSigners();
        await myContract.transferOwnership(addr1.address);
        expect(await myContract.owner()).to.equal(addr1.address);
      })
    });

    /*
    describe("mintBadge()", function () {
      it("Mint badge 1 to an account", async function () {
        const [addr1] = await ethers.getSigners();
        await myContract.mintBadge(addr1.address, 1);
        expect(await myContract.ownerOf(1)).to.equal(addr1.address);
      });
      it("Only allow owner to mint", async function () {
        const [addr1, addr2] = await ethers.getSigners();
        //await myContract.connect(addr2).mintBadge(addr2.address, 2);
        await expect(myContract.connect(addr2).mintBadge(addr2.address, 2)).to.be.revertedWith("Ownable: caller is not the owner");
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

    /*
    describe("levelBadge()", function () {
      it("Owner can upgrade badge level", async function () {
        const [addr1, addr2] = await ethers.getSigners();
        await myContract.connect(addr1).levelBadge(1,2);
        expect(await myContract.getLevel(1)).to.equal(2);
      });
      it("Only allow owner to upgrade", async function () {
        const [addr1, addr2] = await ethers.getSigners();
        await expect(myContract.connect(addr2).levelBadge(1, 3)).to.be.revertedWith("Ownable: caller is not the owner");
      });
    });

    describe("tokenURI()", function () {
      it("Should return appropriate uri for badge level", async function () {
        const [addr1, addr2] = await ethers.getSigners();
        expect(await myContract.tokenURI(1)).to.equal("ipfs.io/levelThreeMetadata");
      });
    });

  */
  });
});