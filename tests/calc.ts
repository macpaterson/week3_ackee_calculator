import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Calc } from "../target/types/calc";
const { SystemProgram } = anchor.web3
import { expect } from 'chai';


//Moka works using predescribed it blocks 
describe("calc", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  //Referencing the program - Abstraction that allows us to call methods of our SOL program.
  const program = anchor.workspace.Calc as Program<Calc>;
  const programProvider = program.provider as anchor.AnchorProvider;

  //Generating a keypair for our Calc account
  const calcPair = anchor.web3.Keypair.generate();

  const text = "Winter School Of Solana"

  //Creating a test block
  it("Creating Calc Instance", async () => {
    //Calling create instance - Set our calc keypair as a signer
    await program.methods.create(text).accounts(
      {
          calc: calcPair.publicKey,
          user: programProvider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
      }
  ).signers([calcPair]).rpc()

  //We fecth the account and read if the string is actually in the account
  const account = await program.account.calc.fetch(calcPair.publicKey)
  expect(account.greeting).to.eql(text)
  });

  //Another test step - test out addition
  it('Addition',async () => {
    await program.methods.add(new anchor.BN(2), new anchor.BN(3))
    .accounts({
        calc: calcPair.publicKey,
    })
    .rpc()
    const account = await program.account.calc.fetch(calcPair.publicKey)
    expect(account.result).to.eql(new anchor.BN(5))
  })
  
  it('Subtraction',async () => {
    await program.methods.sub(new anchor.BN(5), new anchor.BN(3))
    .accounts({
        calc: calcPair.publicKey,
    })
    .rpc()
    const account = await program.account.calc.fetch(calcPair.publicKey)
    expect(account.result).to.eql(new anchor.BN(2))
  })
  
  it('Multiplication',async () => {
    await program.methods.multiply(new anchor.BN(2), new anchor.BN(3))
    .accounts({
        calc: calcPair.publicKey,
    })
    .rpc()
    const account = await program.account.calc.fetch(calcPair.publicKey)
    expect(account.result).to.eql(new anchor.BN(6))
  })
  
  it('Division',async () => {
    await program.methods.divide(new anchor.BN(6), new anchor.BN(3))
    .accounts({
        calc: calcPair.publicKey,
    })
    .rpc()
    const account = await program.account.calc.fetch(calcPair.publicKey)
    expect(account.result).to.eql(new anchor.BN(2))
  })
  
  it('Exponents',async () => {
    await program.methods.exponents(new anchor.BN(2), new anchor.BN(3))
    .accounts({
        calc: calcPair.publicKey,
    })
    .rpc()
    const account = await program.account.calc.fetch(calcPair.publicKey)
    expect(account.result).to.eql(new anchor.BN(8))
  })

});