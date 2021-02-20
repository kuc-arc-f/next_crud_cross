//import Head from 'next/head'
import Link from 'next/link';
import Router from 'next/router'
import React from 'react'
import flash from 'next-flash';
import cookies from 'next-cookies'

import Layout from '../../../components/layout'
//
export default class extends React.Component {
  static async getInitialProps(ctx) {
    console.log("id=", ctx.query.id)
    var site_id = process.env.SITE_ID
    var id = ctx.query.id
    var content = "books"
    var url = process.env.API_URL+ `/api/get/findone?content=${content}&id=${id}`
    const res = await fetch(url)
    const json = await res.json()
    var url = process.env.API_URL + '/api/token_get'
    var tokenRes = await fetch(url)
    var tokenJson = await tokenRes.json() 
    var url_categ = process.env.API_URL +`/api/get/find?content=category&site_id=${site_id}`
    const res_categ = await fetch(url_categ)    
    const json_categ = await res_categ.json()
//console.log(json_categ)           
      return {
          id: id,
          item: json,
          user_id :cookies(ctx).user_id,
          csrf: tokenJson.csrf,
          category_items: json_categ,
      };
  }
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.state = {
      title: this.props.item.title, 
      content: this.props.item.content,
      category_id: this.props.item.category_id, 
      _token : this.props.csrf.token,
    }
//console.log(this.props.item )
  }  
  componentDidMount(){
  }     
  handleChangeTitle(e){
    console.log("handleChangeTitle:")
    this.setState({title: e.target.value})
  }
  handleChangeContent(e){
    this.setState({content: e.target.value})
  }  
  async handleClickDelete(){
    console.log("#deete-id:" , this.props.id)
    try {
      var item = {
        id: this.props.id,
        _token: this.state._token
      }
//console.log(item)
      const res = await fetch(process.env.BASE_URL +'/api/tasks/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        Router.push('/tasks');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }     
  } 
  async handleClick(){
  console.log("#-handleClick")
//  console.log(this.state)
    await this.update_item()
  }     
  async update_item(){
    try {
      var item = {
        category_id: this.state.category_id,
        title: this.state.title,
        content: this.state.content,
        id: this.props.id,
        _token: this.state._token
      }
//console.log(item)
      const res = await fetch(process.env.BASE_URL +'/api/books/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        Router.push('/books');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }     
  }  
  /*
  setInitCategory(){
    console.log(this.state.category_id)
  }
  */
  handleChangeType(e){
    this.setState({category_id: e.target.value})
  }  
  tabCategory(){
    var category = this.props.category_items 
//console.log(category)
    return (
      <div>
        <hr />
        <label>Category :</label>
        <select id="category_id" name="category_id" className="form-control"
        value={this.state.category_id} onChange={this.handleChangeType.bind(this)}>
          <option value="0">Select please</option>
          {category.map((item, index) => {
//            console.log(item.name)
            return(<option key={index}
              value={item._id.toString()}>{item.name}</option>)            
          })}          
        </select>          
      </div>
    )
  }   
  render() {
    return (
      <Layout>
          <div className="container">
            <Link href="/books">
              <a className="btn btn-outline-primary mt-2">Back</a></Link>
            <hr className="mt-2 mb-2" />
            <h1>Books - Edit</h1>
            {this.tabCategory()}
            <hr /> 
            <div className="row">
              <div className="col-md-6">
                  <div className="form-group">
                      <label>Title:</label>
                      <input type="text" id="title" className="form-control"
                      value={this.state.title}
                      onChange={this.handleChangeTitle.bind(this)} />
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <div className="form-group">
                  <label>Content:</label>
                  <input type="text" className="form-control"
                    value={this.state.content}
                    onChange={this.handleChangeContent.bind(this)}/>
              </div>
              </div>
            </div><br />
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.handleClick}>Save
              </button>
            </div>
            <hr />                  
            <div className="form-group">
              <button className="btn btn-danger" onClick={this.handleClickDelete}>Delete
              </button>
            </div>

            <hr />
            ID : {this.props.id}
          </div>
      </Layout>
    );
  };
}


