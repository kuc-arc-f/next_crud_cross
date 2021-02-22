import Link from 'next/link';
import Layout from '../../components/layout'
import IndexRow from './IndexRow';
import Router from 'next/router'
import cookies from 'next-cookies'
import flash from 'next-flash';
//
export default class Page extends React.Component {
  static async getInitialProps(ctx) {
    var site_id = process.env.SITE_ID
    var url = process.env.API_URL +"/api/get/find?content=tasks&site_id=" +site_id
    const res = await fetch(url)    
    const json = await res.json()
// console.log(json)
    return { 
      items: json ,user_id :cookies(ctx).user_id
    }
  }
  constructor(props){
    super(props)
//console.log(this.props)
  }  
  componentDidMount(){
    console.log( "user_id=" ,this.props.user_id )
    if(typeof this.props.user_id === 'undefined'){
      flash.set({ messages_error: 'Error, Login require' })
      Router.push('/login');
    }    
  }    
  render() {
    const items = this.props.items
// console.log(items)
    return (
    <Layout>
      <div className="container">
        <Link href="/tasks/create">
          <a className="btn btn-primary mt-2">New</a>
        </Link>  
        <hr className="mt-2 mb-2" />        
        <h3>Tasks - index</h3>
        <table className="table table-hover">
          <thead>
          <tr>
              <th>Title</th>
              <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {items.map((item, index) => {
            return (<IndexRow key={index}
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
