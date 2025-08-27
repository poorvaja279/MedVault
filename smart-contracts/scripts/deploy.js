async function main() {
  const MedVault = await ethers.getContractFactory('MedVault')
  const med = await MedVault.deploy()
  await med.deployed()
  console.log('✅ MedVault deployed to:', med.address)
}

main().catch(e => { 
  console.error(e); 
  process.exitCode = 1 
})
