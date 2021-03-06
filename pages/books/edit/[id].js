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
    var url_tag = process.env.API_URL +`/api/get/find?content=tags&site_id=${site_id}`
    const res_tag = await fetch(url_tag)    
    const json_tag = await res_tag.json()
//console.log(json)    
      return {
          id: id,
          item: json,
          user_id :cookies(ctx).user_id,
          csrf: tokenJson.csrf,
          category_items: json_categ,
          tags: json_tag,
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
      tag_ids: this.props.item.tag_ids,       
      _token : this.props.csrf.token,
      item: this.props.item
    }
//console.log(this.props.item )
  }  
  componentDidMount(){
    var elemDate = document.getElementById('pub_date');
    elemDate.value= this.props.item.pub_date

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
      const res = await fetch(process.env.BASE_URL +'/api/books/delete', {
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
  async handleClick(){
  console.log("#-handleClick")
//  console.log(this.state)
    await this.update_item()
  }     
  async update_item(){
    try {
      var myForm = document.getElementById('myForm');
      var formData = new FormData(myForm); 
      var elemDate = document.getElementById('pub_date');
      var elem = [] 
      var tags = this.props.tags     
      tags.map((item, index) => {
//console.log(item.name)
        var elemName = "check_" + item.id
        var value = formData.get( elemName )
        if(value ==  "on"){
          elem.push(item.id)
        }
      }) 
      var json= JSON.stringify( elem );
// console.log(json)      
      var item = {
        category_id: this.state.category_id,
        title: this.state.title,
        content: this.state.content,
        tag_ids: json,
        id: this.props.id,
        pub_date: elemDate.value,
        _token: this.state._token
      }
// console.log(item)
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
  valid_dispCheck(id, items){
    var ret = false
    items.map((item, index) => {
//console.log(item )
      if(item === id){
        ret = true
      }
    })    
    return ret
  }
  checkRow(){
//console.log(this.props.item.tag_ids)
    var tags = this.props.tags
    var self = this
    return tags.map((item, index) => {
      var tag_arr = JSON.parse(self.props.item.tag_ids || '[]')
      var valid = self.valid_dispCheck(item.id, tag_arr)
// console.log(item.id, valid )
      var name = "check_" + item.id
      return(
        <div key={index}>
          <input type="checkbox" name={name} id={name} defaultChecked={valid}
          /> {item.name}
        </div>        
      )
    })    
  }      
  render() {
    return (
    <Layout>
      <div className="container">
        <form action="/api/content/new" method="post" id="myForm" name="myForm">
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
              <textarea type="text" onChange={this.handleChangeContent.bind(this)}
              className="form-control" rows="8">{this.state.content}</textarea>                 
            </div>
            </div>
          </div>
          <div className="form-group">
            <label>Pub date:</label>
            <input type="date" name="pub_date" id="pub_date" className="form-control" />
          </div>
          <div className="form-group">
          <label>Tag :</label>
            {this.checkRow()}          
          </div>
          <hr />
        </form>
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


