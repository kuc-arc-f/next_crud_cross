import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

import Layout from '../../components/layout'
import LibBook from '../../libs/LibBook'
import LibCommon from '../../libs/LibCommon'
//
function Page(data) {
// console.log(data.item )
  var tags = data.tags
  var item = data.item
  return (
  <Layout>
    <div className="container book_show_wrap">
      <Link href="/books">
        <a className="btn btn-outline-primary mt-2">Back</a></Link>
      <hr className="mt-2 mb-0"/>
      <div><h1>{item.title}</h1>
      Date : {item.created_at}<br />
      Category : {data.item.category.name}<br />
      Tag : 
      <pre className="pre_text">
      {tags.map((item, index) => {
//console.log(item)
        return (<span key={index}> #{item.name}</span>)
      })}      
      </pre>
      <hr className="mt-2 mb-2"/>
      </div>
      <div>{item.content}
      </div>
      <hr />
      Pub date : {item.pub_date}      
    </div>
  </Layout>
  )
}
//
Page.getInitialProps = async (ctx) => {
//  console.log(ctx.query.id)
  var id = ctx.query.id
  var site_id = process.env.SITE_ID
  var content = "books"
  var url = process.env.API_URL+ `/api/get/findone?content=${content}&id=${id}`
  const res = await fetch(url)
  const json = await res.json()
  var url_categ = process.env.API_URL +`/api/get/find?content=category&site_id=${site_id}`
  const res_categ = await fetch(url_categ)    
  const json_categ = await res_categ.json()
  var item = json
  item.category = LibBook.get_category_item(item.category_id , json_categ)
  item = LibCommon.convertItemDate(item)
  var url_tag = process.env.API_URL +`/api/get/find?content=tags&site_id=${site_id}`
  const res_tag = await fetch(url_tag)    
  const json_tag = await res_tag.json()  
//console.log( json_tag )
  var tag_arr = JSON.parse(item.tag_ids || '[]')
  var tags = LibBook.get_tag_items(tag_arr , json_tag)
//console.log(d)
  return { 
    item:item ,tags: tags
  }
}

export default Page

