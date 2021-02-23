import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import React, {Component} from 'react';
import moment from 'moment';
import cookies from 'next-cookies'

import Layout from '../../components/layout'
//
export default class extends Component {
  static async getInitialProps(ctx) {
    var site_id = process.env.SITE_ID
    var content = "category"
    var url = process.env.API_URL + '/api/token_get'
    const res = await fetch(url)
    const json = await res.json()
    var url_categ = process.env.API_URL +`/api/get/find?content=${content}&site_id=${site_id}`
    const res_categ = await fetch(url_categ)    
    const json_categ = await res_categ.json()
    var url_tag = process.env.API_URL +`/api/get/find?content=tags&site_id=${site_id}`
    const res_tag = await fetch(url_tag)    
    const json_tag = await res_tag.json()
//console.log(json_tag)    
    return { 
      user_id :cookies(ctx).user_id,
      csrf: json.csrf,
      category_items: json_categ,
      tags: json_tag,
    }
  }  
  constructor(props){
    super(props)
    this.state = {
      title: '', content: '', _token : '',category_id:'',
      pub_date: '', price :0,
    }
    this.handleClick = this.handleClick.bind(this);
    this.database = null
//console.log(props)
  }
  componentDidMount(){
    var dt = moment().format('YYYY-MM-DD')
    var elem = document.getElementById('pub_date');
    elem.value = dt
//    console.log(d)
    this.setState({ 
      _token: this.props.csrf.token 
    });
  }   
  handleChangeTitle(e){
    this.setState({title: e.target.value})
  }
  handleChangePrice(e){
    this.setState({price: e.target.value})
  }
  handleChangeContent(e){
    this.setState({content: e.target.value})
  }   
  handleClick(){
    this.add_item()
  } 
  async add_item(){
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
          console.log(item.name, value)
          elem.push(item.id)
        }
      }) 
      var json= JSON.stringify( elem );
// console.log(json)
      var elem = document.getElementById('category_id');
      var item = {
        category_id: elem.value,
        tag_ids: json,
        title: this.state.title,
        content: this.state.content,
        pub_date : elemDate.value,
        price: this.state.price,
        _token: this.state._token
      }
//console.log(item)
      const res = await fetch(process.env.BASE_URL + '/api/books/new', {
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
      alert("Error, save item")
      console.error(error);
    }    
  }
  tabCategory(){
    var category = this.props.category_items 
//console.log(category)
    return (
      <div>
        <hr />
        <label>Category :</label>
        <select id="category_id" name="category_id" className="form-control">
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
  checkRow(){
    var tags = this.props.tags
//console.log(tags)
    return tags.map((item, index) => {
// console.log(item )
      var name = "check_" + item.id
      return(
        <div key={index}>
          <input type="checkbox" name={name} id={name}
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
          <h1>Books - Create</h1>
          {this.tabCategory()}
          <hr />          
          <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" className="form-control"
                    onChange={this.handleChangeTitle.bind(this)} />
                </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
            <div className="form-group">
                <label>Content:</label>
                <textarea type="text" onChange={this.handleChangeContent.bind(this)}
                className="form-control" rows="8"></textarea>                  
            </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" className="form-control"
                    onChange={this.handleChangePrice.bind(this)} />
                </div>
            </div>
          </div>
          <div className="form-group">
            <label>Pub date:</label>
            <input type="date" name="pub_date" id="pub_date" className="form-control" />
          </div>
          <hr />
          <div className="form-group">
            <label>Tag :</label>
            {this.checkRow()}          
          </div>
        </form>
        <div className="form-group">
              <button className="btn btn-primary" onClick={this.handleClick}>Create
              </button>
        </div>                
        <hr />          
        </div>
      </Layout>
    )    
  } 
}

