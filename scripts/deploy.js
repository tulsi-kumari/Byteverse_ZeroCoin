const hre = require('hardhat');

async function main() {
    const GovernmentBody = await hre.ethers.getContractFactory("GovernmentBody")
    const governmentBody = await GovernmentBody.deploy();

    await governmentBody.deployed();

    console.log("Factory deployed to:", governmentBody.address);
}

main()
     .then(() => process.exit(0))
     .catch((error) => {
        console.log(error);
        process.exit(1);
     });