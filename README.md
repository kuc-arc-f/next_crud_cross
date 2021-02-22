# next_crud_cross

 Version: 0.9.2

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2021/02/18

 update  : 2021/02/22

***
### Summary

Next.js + Headless CMS, Cross domain CRUD sample

***
### required

* Next.js : 10.0.0
* react : 16.13.1
* node : 14.11

***
### Setup

npm install

***
### Setup , etc
* next.config.js , 

if change URL, API URL, API_KEY, SITE_ID,BASE_URL

```
API_URL: "http://localhost:3001",
API_KEY: "1234",
SITE_ID: "1234",
BASE_URL: "http://localhost:3002"
```

* package.json / scripts

if change, port number ( -p )

```
"dev": "next dev -p 3002"
```

***
### start server
* Start :

yarn dev

* if change , release mode

yarn serve


***
### Document

https://cms-kuc-jamstack1.netlify.app/pages/6029cea268013b004be190e2

***
### Blog : 

Headless CMSを、バックエンドにしたCRUD をNext.jsで作成

https://note.com/knaka0209/n/ncbc51ec619e6

***

