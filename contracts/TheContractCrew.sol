//this our smart contract which implements the whole idea of infrastructure development system's decentralization

// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
contract GovernmentBody{

    //the person to deploy this contract becomes the official to pass all contracts
    address public  MRTH_Official;
    address[] public  trustedEngineers;

    event contractsCreated(string indexed category,uint indexed projectId,string indexed projectName,address contractAddress,uint amount,uint deadline);
    
    constructor(){
        MRTH_Official=msg.sender;
        //please enter your own panel of engineer's address here..We did it according to our own metamask wallet addresses
        trustedEngineers.push(0x5b838CDF0B1C179a357F6729e206E10b8e34E8FA);
        trustedEngineers.push(0x54b2ba03bfc4eB49b90DB80fB220388B68e5b96b);
        trustedEngineers.push(0xc83521Bbe8EEb4F9f4c06Cd3d04E151FCe5C940f);
    }
    

    //function for contractors to initiate a deal with the government  directly
    //it is compulsory that this function is not called by any engineer or Government Officials
    function proposeDeal(
        string memory category,
        uint projectId,
        string memory _projectName,
        uint _requiredAmount,
        uint _deadline) public {

            require(!isEngineer(msg.sender),"trusted engineer can't be contractor");
            require(msg.sender!=MRTH_Official,"Official can't propose a deal");

            Contractor newContactor=new Contractor(
                                      category,
                                      projectId,
                                      _projectName,
                                      _requiredAmount,
                                      _deadline,
                                      trustedEngineers,
                                      0,
                                      MRTH_Official);

             emit contractsCreated(category,projectId, _projectName, address(newContactor), _requiredAmount, _deadline);

    }

    //function to check if the invoking account is of engineer's or not
    function isEngineer(address approver)private view returns (bool){
          for(uint i=0;i<trustedEngineers.length;i++){
              if(trustedEngineers[i]==approver){
                  return true;
              }
          }
          return false;
    }

    

}
 
//This is an instance of a contract proposed by any contractor
contract Contractor{
    string public category;
    uint public  projectId;
    string public  projectName;
    uint public requiredAmount;
    uint public deadline;
    address[] public  trustedEngineers;
    uint public  approvalCount;
    address payable public  contractorAddress;
    address public  MRTH_Official;

    event passedContracts(string indexed category,uint projectId,address indexed contractor,uint amount,uint indexed timestamp);
    event approvingEngineers(address indexed engineerAddress,uint indexed timestamp,uint indexed projectId);

    constructor(
        string memory _category,
        uint _projectId,
        string memory _projectName,
        uint _requiredAmount,
        uint _deadline,
         address[]  memory _trustedEngineers,
        uint _count,
        address official

    ){  category=_category;
        projectId=_projectId;
         projectName=_projectName;
         requiredAmount=_requiredAmount;
         deadline=_deadline;
         trustedEngineers=_trustedEngineers;
         approvalCount=_count;
         contractorAddress=payable (msg.sender);
         MRTH_Official=official;
    }


    function isEngineer(address approver)private view returns (bool){
          for(uint i=0;i<trustedEngineers.length;i++){
              if(trustedEngineers[i]==approver){
                  return true;
              }
          }
          return false;
    }
    
    //function through which an engineer approves a contract
    function approve() public {
       require(isEngineer(msg.sender),"Only a Government approved engineer can approve");
       approvalCount++;
       emit approvingEngineers(msg.sender, block.timestamp, projectId);
    }
    

    //function through which a government official passes a contract
    function passContract() public  payable {
        require(msg.sender==MRTH_Official,"Only government official can pass a contract");  
        require(approvalCount>=trustedEngineers.length/2,"Contractor must get majority approvals to get awarded with a deal");
        contractorAddress.transfer(msg.value);
        emit passedContracts(category,projectId, contractorAddress, msg.value, block.timestamp);    
    }

    
}