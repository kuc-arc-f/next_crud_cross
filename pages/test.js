import React from 'react'

import LibCommon from '../libs/LibCommon'
import LibPagenate from '../libs/LibPagenate'
import Layout from '../components/layout'
import TopHeadBox from '../components/TopHeadBox'
import TestChild from '../components/TestChild'
import IndexRow from './IndexRow';
//
export default class extends React.Component {
// console.log(data.blogs)
//  var items = data.blogs.contents
  static async getInitialProps(ctx) {
console.log(process.env.API_URL)
    return {
      data: "",
    }
  }
  constructor(props){
    super(props)
//console.log(props.content_name )
  } 
  async test_func(){
    try {
      var url = process.env.API_URL +"/api/get/find?content=test_1&site_id=601ba04f8f2981001ef2624a"
      const res = await fetch(url)
      const json = await res.json()
console.log(json)
    } catch (error) {
//      alert("Error, save item")
      console.error(error);
    }    
  } 
  async test_func2(){
    try {
      var item = {
        title:"t218a3",
        content: "c3",
      }
      const res = await fetch(process.env.BASE_URL + '/api/test/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        const json = await res.json()
        console.log(json)
      } else {
        throw new Error(await res.text());
      }      
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }    
  } 
  clickHandler(){
    console.log("#clickHandler")
    this.test_func()
  }
  render(){
    return (
    <Layout>
      <div className="body_main_wrap">
        <div className="container">test:
        <hr />
        <button onClick={this.clickHandler.bind(this)}>Test1
        </button>
        </div>
      </div>
    </Layout>
    )
  }
}
/*
export const getStaticProps = async context => {
  try {
    return {
      props : {
        blogs: [],
      }
    };
  } catch (error) {
    console.error(error);
  }
}
*/

//export default Page
