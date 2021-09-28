import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x63524eb0Cb45D444D1Da9799a56cE1c14B71438f'
);

export default instance;
