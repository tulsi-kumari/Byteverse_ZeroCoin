import styled from "styled-components";
import {ethers} from 'ethers';
import GovernmentBody from '../artifacts/contracts/TheContractCrew.sol/GovernmentBody.json'
import Contractor from '../artifacts/contracts/TheContractCrew.sol/Contractor.json'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from 'next/link'
import {useRouter} from 'next/router';


 export default function Detail({Data}) {
  const Router=useRouter();
   const[count,setCount]=useState(0);
 
   

   const [status,setStatus]=useState(false);

    const checkStatus=async()=>{
      if(status==true){
        return true
      }else{
        console.log("not yet");
      }
    }
    
  
    const SetApproval= async()=>{
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
          Data.address,
          Contractor.abi,
          signer
        );

      const approve=await contract.approve();

      await approve.wait();

      setCount(count+1);
      }catch{
        console.log("error , only engineer can approve");
      }



    }
    
       

    const PassContract = async () => {
    try {
      
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
          Data.address,
          Contractor.abi,
          signer,
          {
            from: state.accounts[0],
            gasPrice: 1000,
            gas: 100000
        }
        );
      
      const transaction = await contract.passContract({value: ethers.utils.parseEther(Data.requiredAmount),gasPrice:5000});
      await transaction.wait(); 
      setStatus(true); 
  } catch (error) {
      console.log("error");
  }
   
    }


  return (
    <DetailWrapper>
      <BottomContainer>
        <TopLeftWrap>
        <Paragraph>Check Your Initiated   </Paragraph>
        <Heading>CONTRACT STATUS</Heading>
        <Caption>
            YOUR CONTRACT UPDATES JUST A CLICK AWAY
          </Caption>
        
          <Text><Paragraph> BEST OF LUCK!! </Paragraph></Text>
        <ButtonWrap> <TNavLinks >
        {status==false? "Not Awarded Yet":"Congratulations!Your Contract has been Passed"}
      </TNavLinks></ButtonWrap>
      
          
        
        <Text><Paragraph>Scroll down  to see awarding procedure  </Paragraph></Text>
       
        
    </TopLeftWrap> 
    
        </BottomContainer>
        <TopLeftWrap>
        <Paragraph>Your deals will be thoroughly analysed and reviewed here by</Paragraph>
        <Heading>OUR BEST ENGINEERS</Heading>
        <Text><Paragraph>Using Voting Algorithm </Paragraph> 
        <Paragraph>to maintain your trust in us</Paragraph></Text>
        <Text><Paragraph>Any suspicious activity will be easily detected </Paragraph> </Text>
        <Caption>
            CONSENSUS IS THE RIGHT CONSCIENCE
        </Caption>
        <Text><Paragraph> Bid your best deals to get the majority approval </Paragraph></Text>
        <ButtonWrap><TNavLinks>Analyse this contract</TNavLinks></ButtonWrap>
        <Text><Paragraph>Disclaimer:Only for government authorized engineers </Paragraph></Text>
       
        
    </TopLeftWrap>    



        <LeftContainer>
            <FundsData>
                <Funds>
                    <FundTextTitle>Project Id</FundTextTitle>
                    <FundTextContent>{Data._projectId}</FundTextContent>
                </Funds>
                <Funds>
                    <FundTextTitle>Poject Name</FundTextTitle>
                    <FundTextContent>{Data.projectName}</FundTextContent>
                </Funds>
            </FundsData>
            <FundsData>
                <Funds>
                    <FundTextTitle>Contractor Address</FundTextTitle>
                    <FundTextContent>{Data.contractorAddress.slice(0,6)}...{Data.contractorAddress.slice(39)}</FundTextContent>
                </Funds>
                <Funds>
                    <FundTextTitle>Required Amount</FundTextTitle>
                    <FundTextContent>{Data.requiredAmount}</FundTextContent>
                </Funds>
            </FundsData>
            <DonateSection>
                <Textarea  placeholder="Enter Contract Review"/>
              <Donate onClick={SetApproval}><ButtonWrap><TNavLinks>Approve</TNavLinks></ButtonWrap></Donate> 
            </DonateSection>
           
        </LeftContainer>
        <TopLeftWrap>
        <Paragraph>You will be awarded your deals here by</Paragraph>
        <Heading>THE GOVERNMENT</Heading>
        <Text><Paragraph>This a decentralised system with no single authority</Paragraph> 
        <Paragraph>Your deals will be awarded only if you gain the mazority approvals</Paragraph></Text>
        
        <Caption>
            DECENTRALIZATION !! THE FUTURE IS HERE !!
        </Caption>
        <Text><Paragraph>To get awarded , bid the best deals </Paragraph></Text>
        <ButtonWrap>Pass Contract</ButtonWrap>
        <Text><Paragraph>Disclaimer:Accessible only by MRTH Official</Paragraph></Text>
       
        
    </TopLeftWrap>  
        <RightContainer>
           <FundsData>
                <Funds>
                    <FundTextTitle>Project Id</FundTextTitle>
                    <FundTextContent>{Data._projectId}</FundTextContent>
                </Funds>
                <Funds>
                    <FundTextTitle>Project Name</FundTextTitle>
                    <FundTextContent>{Data.projectName}</FundTextContent>
                </Funds>
            </FundsData>
            <FundsData>
            <Funds>
                <FundTextTitle>Approval count</FundTextTitle>
                  <FundTextContent>{count}</FundTextContent> 
              </Funds>    
              <Funds>
                <FundTextTitle>Contract Address</FundTextTitle>
                  <FundTextContent>{Data.address.slice(0,6)}...{Data.address.slice(39)}</FundTextContent> 
              </Funds>  
            </FundsData>      
            <FundsData>
                <Funds>
                    <FundTextTitle>Contractor Address</FundTextTitle>
                    <FundTextContent>{Data.contractorAddress.slice(0,6)}...{Data.contractorAddress.slice(39)}
                    </FundTextContent>
                </Funds>
                <Funds>
                    <FundTextTitle>Required Amount</FundTextTitle>
                    <FundTextContent>{Data.requiredAmount}</FundTextContent>
                </Funds>
            </FundsData>
            <DonateSection>
                <Textarea  placeholder="Enter Instructions to be followed"/>
                <Donate onClick={PassContract}><ButtonWrap><TNavLinks>Pass Contract</TNavLinks></ButtonWrap></Donate>
            </DonateSection>
        </RightContainer>
        
    </DetailWrapper>
  );

  }
export async function getStaticPaths(){
  
    const provider=new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
    );

    const contract =new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        GovernmentBody.abi,
        provider
    );

    const getAllContracts=contract.filters.contractsCreated();
    const AllContracts=await contract.queryFilter(getAllContracts);

    return{
        paths: AllContracts.map((e)=> ({
            params:{
                address:e.args.contractAddress.toString(),
            }
        })),
        fallback:"blocking"
    }
}

export async function getStaticProps(context){
    const provider=new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
    );

    const contract =new ethers.Contract(
        context.params.address,
        Contractor.abi,
        provider
    );
     const projectId=await contract.projectId();
    const projectName=await contract.projectName();
     const requiredAmount=await contract.requiredAmount();
     const deadline=await contract.deadline();
     const approvalCount=await contract.approvalCount();
     const contractorAddress=await contract.contractorAddress();



     const Data={
        address:context.params.address,
        _projectId:parseInt(projectId),
        projectName,
        requiredAmount:ethers.utils.formatEther(requiredAmount),
        deadline:parseInt(deadline),
        _approvalCount:parseInt(approvalCount),
        contractorAddress
    }



    return {
        props:{
            Data
        },
    revalidate: 10
    }

}





const FundTextContent = styled.p`
  margin: 2px;
  padding: 0;
  font-family: "Poppins";
  font-size: normal;
`;

const Update=styled.div`
width: 100%;
`
const DetailWrapper = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 98%;
`;
const LeftContainer = styled.div`
  width: 45%;
  padding-top: 5rem;
  
`;
const RightContainer = styled.div`
  width: 50%;
  padding-top: 5rem;
`;
const BottomContainer=styled.div`
  width: 50%;
  padding-top: 10rem;
  width:48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`

const Title = styled.h1`
  padding-bottom: 3rem;
  margin: 0;
  text-align: center;
  font-family: "Comfortaa";
  font-size: x-large;
  color: ${(props) => props.theme.color};
`;
const DonateSection = styled.div`
  display: flex;
  width: 100%;
  justify-content:space-between;
  align-items: center;
  margin-top: 10px;
`;
const Textarea = styled.textarea`
  padding: 8px 15px;
  background-color: ${(props) => props.theme.detail};
  color: ${(props) => props.theme.color};
  //border: none;
  border-radius: 8px;
  //outline: none;
  ::placeholder{
    color:${(props) => props.theme.colorDiv} ;
  }
  font-size: large;
`;
const Donate = styled.button`
  display: flex;
  justify-content: center;
  width: 45%;
  padding: 15px;
  color: white;
  background-color: ${(props) => props.theme.btnDetail};
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: large;
`;

const TNavLinks=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme.colorDiv};     
    text-decoration: none;
    &:hover{
    background-color: ${(props) => props.theme.colorSec} ;
    color:${(props) => props.theme.color} ;
    transform: translateY(-2px);
    transition: transform 0.5s;
  }
    height: max-content;
    width: max-content;
    font-family: 'Comfortaa';
    margin:7px;
    border-radius: 6px;
    padding: 2px 5px 5px;
    cursor: pointer;
    text-transform: uppercase;
     font-weight: bold ;
     font-size: medium;
    

`

const Text=styled.p`
  margin-top: 0;
`
const TopLeftWrap=styled.div`
padding-top: 10rem;
  width:48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Caption=styled.h1`
   font-family: 'Oswald';
   font-size:1rem;
   font-weight: 300;
   font-style: bold;
   height: max-content;
   width: max-content;
   letter-spacing: 0.2rem;
   color:${(props) => props.theme.btnColor} ;
`
const Heading=styled.h1`
   font-family: 'Oswald';
   font-size:3.5rem;
   font-weight: 400;
   font-style: bold;
   height: max-content;
   width: max-content;
   letter-spacing: 0.5rem;
   color:${(props) => props.theme.btnColor} ;
`
const Paragraph=styled.p`
   margin:0;
   font-size: 1rem;
   padding: 0;
   font-weight: 500;
   text-align: center;
   font-family: 'Poppins';
   font-style: bold;
`
const ButtonWrap = styled.button`
margin-bottom: 10px;
  padding: 8px;
  text-align: center;
  width: max-content;
  background-color: ${(props) => props.theme.btnDetail};
  color: 'white';
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  &:hover{
    background-color: ${(props) => props.theme.colorSec} ;
    transform: translateY(-2px);
    transition: transform 0.5s;
  }
  font-size: 14px;
  font-weight: bold;
  //transition: all 0.3s ease;
`


const FundsData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const Funds = styled.div`
  width: 45%;
  background-color: ${(props) => props.theme.detail};
  padding: 8px;
  text-align: center;
`;
const FundTextTitle = styled.p`
  margin: 2px;
  padding: 0;
  font-family: "Poppins";
  font-size: normal;
  color:${(props) => props.theme.colorDiv} ;
`;
