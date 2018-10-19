import React, {	Component } from 'react';
import { Card, Button} from 'semantic-ui-react';
import factory from '../ethereum/factory.js';
import Layout from '../components/Layout.js';
import {Link} from '../routes';

class CampaignIndex extends Component {

	static async getInitialProps() {
		const campaigns = await factory.methods.returnAddress()
			.call();
		return {
			campaigns: campaigns
		}
	}


	renderCampaigns() {
		const item = this.props.campaigns.map( function( address ) {
			return {
				header: address,
				description: (
						<Link route={`/campaigns/${address}`} >
					< a > View Campaign </a>
					</Link>

				),
				fluid: true
			}
		} );
		return <Card.Group items = {
			item
		}
		/>
	}

	renderButton(){

		var x = 	<div><Link route="/campaigns/new"><a><Button primary floated="right" content='Create Campaign' icon='add circle' labelPosition='left' style = {{marginTop:'30px'}}/></a></Link></div>;
		return x;

	}

	render() {
		return (
			<Layout>
			<div >

		<h1>Open Campaign</h1>
		{this.renderButton()}
		{this.renderCampaigns()}

		< /div>
</Layout>
	);
	}
}
export default CampaignIndex;
