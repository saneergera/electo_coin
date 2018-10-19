import web3 from './web3';


import CampaignFactory from './build/factory.json';

const factory = new web3.eth.Contract(
JSON.parse(CampaignFactory.interface),
// '0x6076b3fDffA2090C703a327afb09754eC1B0F4d5'
'0xee11511Eb28361571582FaC898d51278DeA86cdb'
);


export default factory;
