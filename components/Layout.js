import React from 'react';
import {Menu,Container} from 'semantic-ui-react';
import Head from 'next/head';
import {Link} from '../routes';




export default function(props) {

return(

  <Container>

  <Head>
  	< link rel = "stylesheet" href = "//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css" />
  </Head>

  <div class="ui menu" style={{position:'relative',marginTop:'30px'}}>

  <Link route='/'>
  <a class="item">ELectoCoin</a>
  </Link>


  <div class="right menu">

  <Link route='/'>
  <a class="item">Campaign</a>
  </Link>
  <Link route='/campaigns/new'>
  <a class="item">+</a>
  </Link>
  </div>
</div>

{props.children}


<h1>footer</h1>
</Container>
);



}
