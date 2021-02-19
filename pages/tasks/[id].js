import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

import Layout from '../../components/layout'
//
function Page(data) {
console.log(data.item )
  var item = data.item
  return (
  <Layout>
    <div className="container">
      <Link href="/tasks">
        <a className="btn btn-outline-primary mt-2">Back</a></Link>
      <hr />
      <div><h1>Title : {item.title}</h1>
      </div>
      <div>Content: {item.content}
      </div>      
    </div>
  </Layout>
  )
}
//
Page.getInitialProps = async (ctx) => {
  console.log(ctx.query.id)
  var id = ctx.query.id
  var content = "tasks"
  var url = process.env.API_URL+ `/api/get/findone?content=${content}&id=${id}`
  const res = await fetch(url)
  const json = await res.json()
//console.log(json)
  var item = json
  return { item:item }
}

export default Page

