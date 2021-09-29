import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xc6ce37779f7b4A246a92ea3e616489e4d5493783'
);

export default instance;
