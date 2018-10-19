import React , {Component} from 'react';
import {Form,Button,Input,Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import {Router} from '../../routes';
class Campaignnew extends Component {


  state ={

    minimumContribution :'',
    errorMessage :'',
    loading:false

  }

onSubmit = async (event)=>{
event.preventDefault();
this.setState({loading:true,errorMessage :''});
try{
  const accounts = await web3.eth.getAccounts();
  await factory.methods.Creatfactory(this.state.minimumContribution)
  .send({
  from:accounts[0]
  });

  Router.pushRoute('/');
}
catch(err){
  this.setState({
  errorMessage :err.message})
}

this.setState({loading:false});

};



render(){
  return(

<Layout>

<h3>Create a Campaign</h3>
<Form onSubmit = {this.onSubmit} error={!!this.state.errorMessage}>
<Form.Field>
 <label>First Name</label>

 <Input label='wei'  labelPosition='right' onChange = {(event)=>{
   this.setState({minimumContribution:event.target.value})
 }}/>

</Form.Field>

<Message
    error
    header='OOPS!'
    content=
      {this.state.errorMessage}
  />

<Button loading = {this.state.loading} primary type='submit'>Create</Button>
</Form>

</Layout>
  );
}


}

export default   Campaignnew ;
