import React, { Component, useState } from 'react';
import {Container, Divider, Dropdown, Grid, Header, Image, Button,
  List,  Menu,  Segment} from 'semantic-ui-react'
import fire from './config/fire';
import Find from "./Find.js"
fucntion FindWrite(){



  const history = useHistory();
  var [titletext, setTitletext ] = useState("");
  var [contentstext , setContentstext] = useState("");

  const titleHandler = (e) =>
  {
     e.preventDefault();
    setTitletext(e.target.value);

  }
  const contentsHandler = (e) =>
  {
     e.preventDefault();
      setContentstext(e.target.value);
  }

  const saveData = (e)  =>
  {
   e.preventDefault();
    if(titletext === '' || contentstext ==='')
    {

    }
    else {
      var title = titletext;
      var contents = contentstext;
      var writeDate = Date.now();
      var userId = fire.auth().currentUser;
      fire.database().ref('users/'+userId.uid+'/자유게시판').push().set({
        title : title,
        contents : contents,
        writeDate : writeDate,
      });

      setTitletext('');
      setContentstext('');
      history.goBack();
    }



  }
    return (
      <form>
      <div>

      <Container text style={{ marginTop: '7em' }}>
      <Header as='h1'>글쓰기</Header>
      <div class ='ui form'>
      <div class="field">
      <label>제목</label>
      <textarea id = "titlearea" rows="1" onChange ={titleHandler}></textarea>
      </div>
      <div class="field">
      <label>내용</label>
      <textarea id ="contentsarea" rows='20' onChange = {contentsHandler}></textarea>
      </div>
      </div>
      <Button.Group>
      <Button onClick={saveData} positive>Save</Button>
      <Button.Or />
      <Link to='/FreeBoard'>
      <Button>Cancel</Button>
      </Link>
      </Button.Group>

      </Container>

      </div>
      </form>

    );



}
export default FindWrite;