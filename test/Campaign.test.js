const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const compilefactory = require('../ethereum/build/factory.json');
const crowdfunding = require('../ethereum/build/crowdfunding.json');
let accounts;
let factory;
let campaignAddress;
let campaign;
beforeEach(async () => {
	accounts = await web3.eth.getAccounts();
	factory = await new web3.eth.Contract(JSON.parse(compilefactory.interface)).deploy({
		data: compilefactory.bytecode
	}).send({
		from: accounts[0],
		gas: '1000000'
	});
	await factory.methods.Creatfactory('103').send({
		from: accounts[0],
		gas: '1000000'
	});
	const address = await factory.methods.returnAddress().call();
	campaignAddress = address[0];
	campaign = await new web3.eth.Contract(JSON.parse(crowdfunding.interface), campaignAddress);
});
describe('Campaigns', () => {
	it('My first test', () => {
		assert.ok(factory.options.address);
		assert.ok(campaign.options.address)
	})
	it('caller is the campaig manager', async () => {
		const manager = await campaign.methods.manager().call();
		assert.equal(accounts[0], manager);
	});
	it('check if user can involve in contribution', async () => {
		await campaign.methods.contribute().send({
			value: '200',
			from: accounts[1]
		})
		const isContributor = await campaign.methods.approvers(accounts[1]).call();
		assert(isContributor);
	});
	it('check the minimum requirment code', async () => {
		try {
			await campaign.methods.contribute().send({
				value: '5',
				from: accounts[1]
			});
			assert(false)
		} catch (err) {
			assert(err);
		}
	})
})
