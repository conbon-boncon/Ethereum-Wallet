const Wallet = artifacts.require('Wallet');

contract('EtherWallet', (accounts) => {
  let wallet = null;
  
  before(async () => {
    wallet = await Wallet.deployed();
  });

  it('Should set account 0 as owner', async ()=>{
      const owner = await wallet.owner();
      assert(owner == accounts[0])
  });

  it('Should deposit ether in wallet', async () =>{
    await wallet.deposit({from: accounts[0], value:100});
    const balance = await wallet.getBalance();
    assert(balance == 100);
  });

  it('Should transfer ether to another address', async ()=>{
    const walletBalance = await wallet.getBalance();
    assert(parseInt(walletBalance) == 100);
    const beforeBalanceOfReciever = await web3.eth.getBalance(accounts[1]);
    await wallet.sendMoney(accounts[1], 50, {from:accounts[0]});
    const walletBalanceAfterTransfer = await wallet.getBalance();
    const afterBalanceOfReceiver = await web3.eth.getBalance(accounts[1]);

    const initialBalance = web3.utils.toBN(beforeBalanceOfReciever);
    const afterBalance = web3.utils.toBN(afterBalanceOfReceiver);
    assert(parseInt(walletBalanceAfterTransfer) == 50);
    assert(afterBalance.sub(initialBalance).toNumber() == 50);
  });

  it('Should not transfer ether if transaction is not from owner', async ()=>{
    try{
        await wallet.sendMoney(accounts[2], 50, {from:accounts[1]})
    }catch(e){
        assert(e.message.includes('VM Exception while processing transaction: revert'));
    }
  });
  
});