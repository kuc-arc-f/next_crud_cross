import Link from 'next/link';
import cookies from 'next-cookies'

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
      items: json ,user_id :cookies(ctx).user_id
    }
  }
  constructor(props){
    super(props)
//console.log(this.props)
  }  
  render() {
    const items = this.props.items
//console.log(items)
    return (
    <Layout>
      <div className="container">
        <Link href="/books/create">
          <a className="btn btn-primary mt-2">New</a>
        </Link>  
        <hr className="mt-2 mb-2" />        
        <h3>Books - index</h3>
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
              category_name={item.category.name}
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
