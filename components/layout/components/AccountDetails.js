import styled from 'styled-components';
import {ethers} from 'ethers';
import { useState } from 'react';


const networks = {
    polygon: {
        chainId: `0x${Number(80001).toString(16)}`,
        chainName: "Polygon Testnet",
        nativeCurrency: {
            name : "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
    },
};

const AccountDetails=()=>{
  const[address,setAddress]=useState('');
  const[balance,setBalance]=useState('');
  
  const connectAccount = async() => {
    await window.ethereum.request({method:"eth_requestAccounts"});
    const provider=new ethers.providers.Web3Provider(window.ethereum,"any");
    if(provider.network!=="matic"){
      await window.ethereum.request({
        method:"wallet_addEthereumChain",
        params:[
          {
            ...networks["polygon"]
          }
        ]
      })

      const account=provider.getSigner();
      const Address=await account.getAddress();
      setAddress(Address);
      const Balance=ethers.utils.formatEther(await account.getBalance());
      setBalance(Balance);
    }
  }
    return (
    <ConnectAccWrap onClick={connectAccount} >
       {balance==''?<AccBalance></AccBalance> : <AccBalance>{balance.slice(0,4)}MATIC</AccBalance>}
      {address==''?<AccAddress >Connect Wallet</AccAddress>:<AccAddress>{address.slice(0,6)}...{address.slice(39)}</AccAddress>}
          
    
    </ConnectAccWrap>
  )
}
const ConnectAccWrap=styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding:5px 9px;
   height: 50%;
   /* color:${(props)=>props.theme.color}; */
   border-radius: 10px;
   margin-right: 15px;
   font-family: 'Comfortaa';
   text-transform: uppercase;
   font-weight: bold;
   font-size: x-small;
`
const AccAddress=styled.h2`
   height: 30%;
   display: flex;
   align-items: center;
   justify-content: center;
   padding:0 3px 0 3px;
   border-radius: 10px;
   color: 'black';
   //font-size: larger;
`
const AccBalance=styled.h2`
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-right: 5px;
`


export default AccountDetails