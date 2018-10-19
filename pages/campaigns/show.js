import React,{ Component } from 'react';

class CampaigntShow extends Component {


static async getInitialProps(props){
console.log(props.query.address);

return {};


}

render(){

return <h3>Hello</h3>;

}


}

export default CampaigntShow;
