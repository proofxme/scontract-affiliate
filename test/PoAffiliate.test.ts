import hre from "hardhat";
import { assert } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

// Fixture function for deploying the contract
async function deployFixture() {
  const [deployerWallet] = await hre.viem.getWalletClients();

  const myAffiliate = await hre.viem.deployContract("PoAffiliate", [deployerWallet.account.address]);

  return { myAffiliate };
}

describe("PoAffiliate deploy", function () {
  it("should deploy the contract with the proper owner", async function () {
    // Load the contract instance using the fixture function
    const { myAffiliate } = await loadFixture(deployFixture);

    const [deployerWallet] = await hre.viem.getWalletClients();

    // validate the owner
    const owner = await myAffiliate.read.owner();
    assert.equal(owner.toLowerCase(), deployerWallet.account.address.toLowerCase());
  });
  it("should have 0 minted memberships", async function () {
    // Load the contract instance using the fixture function
    const { myAffiliate } = await loadFixture(deployFixture);
  });

  it("should have the proper URI", async function () {
    // Load the contract instance using the fixture function
    const { myAffiliate } = await loadFixture(deployFixture);
    const [deployerWallet] = await hre.viem.getWalletClients();

    // set the id of the token as 0 and convert it to bigint
    const tokenId = BigInt(0);

    // mint a new token
    await myAffiliate.write.safeMint([deployerWallet.account.address, `${tokenId}.json`]);
    const uri = await myAffiliate.read.tokenURI([tokenId]);
    assert.equal(uri, `https://api.pox.me/affiliates/${tokenId}.json`);
  })
});