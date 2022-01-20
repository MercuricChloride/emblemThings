// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

const localChainId = "31337";

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  await deploy("SimpleBadge", {
    from: deployer,
    //args: [],
    log: true,
  });

  const SimpleBadge = await ethers.getContract("SimpleBadge", deployer);

  await SimpleBadge.mintBadge("0x807a1752402D21400D555e1CD7f175566088b955", 1);
  await SimpleBadge.mintBadge("0x807a1752402D21400D555e1CD7f175566088b955", 2);
  await SimpleBadge.mintBadge("0x807a1752402D21400D555e1CD7f175566088b955", 3);
  await SimpleBadge.mintBadge("0x807a1752402D21400D555e1CD7f175566088b955", 4);

  await SimpleBadge.levelBadge(1, 0);
  await SimpleBadge.levelBadge(2, 1);
  await SimpleBadge.levelBadge(3, 2);
  await SimpleBadge.levelBadge(4, 3);
  /*
  const SVGBadge = await deploy("SVGBadge", {
    from: deployer,
    args: [69],
    log: true,
  });
  */

  /*
    To take ownership of yourContract using the ownable library uncomment next line and add the 
    address you want to be the owner. 
    // yourContract.transferOwnership(YOUR_ADDRESS_HERE);

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify your contracts with Etherscan
  // You don't want to verify on localhost
  /*
  if (chainId !== localChainId) {
    await run("verify:verify", {
      address: YourCollectible.address,
      contract: "contracts/YourCollectible.sol:YourCollectible",
      contractArguments: [],
    });
  }
  */
};
module.exports.tags = ["YourCollectible"];
