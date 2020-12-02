import React, { Component ,useState } from 'react';
import {Container, Header, Image, Button} from 'semantic-ui-react'
import {Link,BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";

import fire from './config/fire';

function BoardRead() {

   const [title,setTitle] = useState([]);
   const [contents,setContents] = useState([]);
   const [writeDate, setDate] = useState([]);
   const [email, setEmail] = useState([]);
   const [key, setKey] = useState([]);
   const urlname1 = window.location.pathname;
   var urlname = urlname1.replace('/', '');
   console.log(urlname);


   React.useEffect(() =>{
    var userId = fire.auth().currentUser.uid;

    var query = fire.database().ref('자유게시판');

    const loadingListener = query.on("value" , snapshot =>
        {
          snapshot.forEach(function(childSnapshot)
          {
          console.log(childSnapshot);
          console.log(urlname);
          if(urlname == childSnapshot.val().key) {
          setTitle(title => [...title, childSnapshot.val(),]);
          setContents(contents => [...contents, childSnapshot.val(),]);
          setDate(writeDate => [...writeDate,childSnapshot.val(),]);
          setEmail(email => [...email,childSnapshot.val(),]);
          setKey(key => [...key,childSnapshot.val(),]);
        }
          }
        );


       });
       return () => {
             query.off('value', loadingListener);
           };
     },[]);




    return(
      <div>
      {title.map((item) =>{
        return(
        <Container text style={{ marginTop: '7em' }}>
          <Header as='h1'>
            글 정보
          </Header>
          <div>
          <table class="ui selectable inverted table">
            <thead>
              <tr>
                <th>제목 : {item.title}</th>
                <th className="right aligned">작성자 : {item.email}</th>
              </tr>
              <tr>
                <th colspan="2" className="right aligned">작성일시 : {item.writeDate}</th>
              </tr>
              <tr>
                <th colspan="2">내용 : {item.contents}</th>
              </tr>
            </thead>
          </table>
          <Link to = '/FreeBoard'>
            <Button style={{ marginTop: '1em' }} className="ui blue button">
              뒤로가기
            </Button>
          </Link>

          </div>
        </Container>
      )
      })}
      </div>

    );


}

export default BoardRead;