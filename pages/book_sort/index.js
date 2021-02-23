import Link from 'next/link';
import Router from 'next/router'
import cookies from 'next-cookies'
import flash from 'next-flash';

import Layout from '../../components/layout'
import LibCms from '../../libs/LibCms'
import LibCommon from '../../libs/LibCommon'
import IndexRow from './IndexRow';
//
export default class Page extends React.Component {
  static async getInitialProps(ctx) {
    var site_id = process.env.SITE_ID
    var url = process.env.API_URL +"/api/get/find?content=books&site_id=" +site_id
    const res = await fetch(url)    
    var json = await res.json()
    var url_categ = process.env.API_URL +`/api/get/find?content=category&site_id=${site_id}`
    const res_categ = await fetch(url_categ)    
    const json_categ = await res_categ.json() 
    json = LibCommon.convert_items(json)   
    json = LibCms.get_post_items(json, json_categ)
// console.log(json)
    return { 
      items: json ,user_id :cookies(ctx).user_id,
      json_categ: json_categ,
    }
  }
  constructor(props){
    super(props)
    this.state = {
      items: this.props.items,
    }    
//console.log(this.props)
  }
  componentDidMount(){
    console.log( "user_id=" ,this.props.user_id )
    if(typeof this.props.user_id === 'undefined'){
      flash.set({ messages_error: 'Error, Login require' })
      Router.push('/login');
    }    
  }
  handleChangeSort(e){
console.log(e.target.value)
    var type = e.target.value
    this.get_sort_items(type)
//    this.setState({category_id: e.target.value})
  } 
  async get_sort_items(sort_type){
    var site_id = process.env.SITE_ID
    if( parseInt(sort_type) == 1){
      var url = process.env.API_URL +"/api/get/find?content=books&site_id=" +site_id
      const res = await fetch(url)    
      var json = await res.json()
    }
    else if( parseInt(sort_type) == 2){
      var url = process.env.API_URL +`/api/get/find?content=books&site_id=${site_id}&order=price:ASC`
      var res = await fetch(url)    
      var json = await res.json()
    }
    else if( parseInt(sort_type) == 3){
      var url = process.env.API_URL +`/api/get/find?content=books&site_id=${site_id}&order=price:DESC`
      var res = await fetch(url)    
      var json = await res.json()
    }
    json = LibCommon.convert_items(json)   
    json = LibCms.get_post_items(json, this.props.json_categ)    
    this.setState({  items: json, });    
console.log(json)
  }        
  render() {
//    const items = this.props.items
    const items = this.state.items
//console.log(items)
    return (
    <Layout>
      <div className="container">
        <Link href="/books/create">
          <a className="btn btn-primary mt-2">New</a>
        </Link>  
        <hr className="mt-2 mb-2" />        
        <h3>BookSort - index</h3>
        <div className="sort_select_wrap">
          <select id="sort_select" name="sort_select" className="form-control"
          onChange={this.handleChangeSort.bind(this)}>
            <option value="1">作成日 DESC</option>
            <option value="2">Price ASC</option>
            <option value="3">Price DESC</option>
          </select>
        </div>
        <table className="table table-hover">
          <thead>
          <tr>
              <th>Title</th>
              <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {items.map((item, index) => {
//console.log(item)
            return (<IndexRow key={index}
              category_name={item.category.name} price={item.price}
              id={item._id} title={item.title} date={item.created_at} />       
            )
          })}
          </tbody>
        </table>
      </div>
    </Layout>
    )
  }
}
