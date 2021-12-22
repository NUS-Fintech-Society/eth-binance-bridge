const TokenEth = artifacts.require("TokenEth.sol");
const TokenBsc = artifacts.require("TokenBsc.sol");

module.exports = async function (deployer, network, addresses) {
  if (network === "ethTestnet") {
    await deployer.deploy(TokenEth);
    const tokenEth = await TokenEth.deployed();
    await tokenEth.mint(addresses[0], 1000);
  }
  if (network === "bscTestnet") {
    await deployer.deploy(TokenBsc);
    const tokenBsc = await TokenBsc.deployed();
  }
};
