pragma solidity ^0.4.17;
contract factory{

    address[] public deployedCampaigns;

    function Creatfactory(uint value) public {

    address newContract = new crowdfunding(value,msg.sender);
     deployedCampaigns.push(newContract);

    }

    function returnAddress() public view returns (address[]){

        return deployedCampaigns;

    }




}

contract crowdfunding {
	struct Request {
		string discription;
		uint value;
		address recipient;
		bool complete;
		mapping(address => bool) approvers;
		uint accepterCount;
	}
	address public manager;
	uint public funds;
	mapping(address => bool) public approvers;
	Request[] public requests;
	uint public approversCount ;

	function crowdfunding(uint fundss,address a) public {
		manager = a;
		funds = fundss;
	}

	function contribute() public payable {
		require(msg.value > funds);
		approvers[msg.sender] = true;
		approversCount++;
	}

	function createRequest(string discription, uint value, address recipient) public {
	    require(msg.sender == manager);
		Request memory obj1 = Request({
			discription: discription,
			value: value,
			recipient: recipient,
			complete: false,
			accepterCount: 0
		});
		requests.push(obj1);
	}

	function approveRequest(uint index) public {
		require(!requests[index].approvers[msg.sender]);
		require(approvers[msg.sender]);
		requests[index].approvers[msg.sender] = true;
		requests[index].accepterCount++;
	}

	function finalizeRequest(uint a) public {
		require(msg.sender == manager);
		require(requests[a].accepterCount >= approversCount);
		require(!requests[a].complete);
		requests[a].recipient.transfer(requests[a].value);
		requests[a].complete = true;
	}

  function getSummary() public view returns(

  uint,uint,uint,uint,address
  )
   {

  return (
        funds,
        this.balance,
        requests.length,
        approversCount,
        manager




    );


}
}
