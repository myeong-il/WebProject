import React, { Component ,useState } from 'react';
import {Card, Icon, Container, Divider, Dropdown, Grid, Header, Image, Button,
  List,  Menu,  Segment, Pagination, Table} from 'semantic-ui-react'
import {Link,BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";
import BoardWrite from "./BoardWrite.js"
import fire from './config/fire';
function Homepage(){

  const [freeboard , setFreeBoard] = useState([]);
  const [aftertravel, setAfterTravel] = useState([]);
  React.useEffect(() =>{


  var userId = fire.auth().currentUser;

  var query = fire.database().ref('자유게시판').limitToLast(5);

  const loadingFreeBoard = query.on("value" , snapshot =>
      {
        snapshot.forEach(function(childSnapshot)
        {
          setFreeBoard(data =>
            [...data,
              {
              title : childSnapshot.val().title,
              contents : childSnapshot.val().contents,
              writeDate : childSnapshot.val().writeDate,
              email :childSnapshot.val().email,
              userId : childSnapshot.val().userId,
              }
            ]);
        }
      );
       }
     );

    return () => {
          query.off('value', loadingFreeBoard);


        };
  },[]);

  React.useEffect(() =>{


  var userId = fire.auth().currentUser;

  var query = fire.database().ref('여행후기').limitToLast(5);

  const loadingAfterTravel = query.on("value" , snapshot =>
      {
        snapshot.forEach(function(childSnapshot)
        {
          setAfterTravel(data =>
            [...data,
              {
              title : childSnapshot.val().title,
              contents : childSnapshot.val().contents,
              writeDate : childSnapshot.val().writeDate,
              email :childSnapshot.val().email,
              userId : childSnapshot.val().userId,
              }
            ]);
        }
      );
       }
     );

    return () => {
          query.off('value', loadingAfterTravel);


        };
  },[]);



  return (
<Router>
<div class ='ui form' style={{ marginTop: '8em', marginLeft: '2em' }}>
<Grid>
<Grid.Row>
<Grid.Column width={3}>
  <div>
      <div class="ui link cards">
        <div class="card">
          <div class="content">
            <div class="header">'abcd'님 어서오세요!</div>
            <div class="meta">
              <a>회원</a>
            </div>
            <div class="description">
              어서오시라구요 꼴받게하지말고
            </div>
          </div>
        </div>
    </div>
  </div>
  </Grid.Column>
  <Grid.Column width={9}>
  <Header as='h2'>국내동행찾기 최근 글</Header>
  <Table celled selectable>
      <Table.Body>
      {freeboard.map((item) =>{
        return(
        <Table.Row>
          <Table.Cell>{item.title}</Table.Cell>
          <Table.Cell>{item.writeDate}</Table.Cell>
        </Table.Row>
      )
    })}
      </Table.Body>
    </Table>
    <Header as='h2'>여행후기 최근 글</Header>
    <Table celled selectable>
        <Table.Body>
          {aftertravel.map((item) =>{
            return(
            <Table.Row>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.writeDate}</Table.Cell>
            </Table.Row>
          )
        })}
        </Table.Body>
      </Table>
  </Grid.Column>
  </Grid.Row>
  </Grid>
  </div>
</Router>
  );
}
export default Homepage;
