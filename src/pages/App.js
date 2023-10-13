import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ds from '../img/image.jpg';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
// import CardGroup from 'react-bootstrap/CardGroup';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import React, { useState } from 'react';


const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .container {
    text-align: center;
  }
.Pagination.Item.active {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}
.cards-container {
    display: flex;
    flex-flow: row;
    justify-content: center;
  }

  .hover {
    border: 1px solid;
    padding: 10px;
    width: 300px;

    background-color: initial;
    color: black;
  }

  .hover:hover {
    /* 호버 시 배경색과 텍스트 컬러 변경 */
    background-color: whitesmoke; /* 원하는 배경색으로 변경 */
    color: white; /* 원하는 텍스트 컬러로 변경 */
  }
  .show-hover {
    display: none;
    
  }
  .hover:hover .show-hover {
    display: block;
    
  }
  .hover:hover .hidden-hover {
    display: none;
    
  }
  .Card{
    margin-left: 100px;
  }
  .small-text{
    font-size: 12px;
  }
  .hover-button {
  /* 기본 배경색과 텍스트 컬러 초기화 */
  background-color: initial;
  color: initial;
}

.hover-button:hover {
  /* 호버 시 배경색과 텍스트 컬러 변경 */
  background-color: white; 
  color: black; /* 원하는 텍스트 컬러로 변경 */
}
`;

const App = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setIsChecked(checked);
    if (checked) {
      console.log('체크박스가 체크되었습니다.');
    } else {
      console.log('체크박스가 해제되었습니다.');
    }
  };
  return (
    <StyledHeader>
      <Container>
      <Table striped bordered hover>
        <thead>
        <tr>
        <th>
          <Form>
            {['checkbox'].map((type) => (
              <div key={`inline-${type}`} className="mb-3" >
                <Form.Check
                  inline
                  label=""
                  type="checkbox"
                  id="inline-checkbox-1"
                  onChange={handleCheckboxChange}
                  checked={isChecked}
                />
                <Form.Check
                  inline
                  label=""
                  type={type}
                  id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  label=""
                  type={type}
                  id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  label=""
                  type={type}
                  id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  label=""
                  type={type}
                  id={`inline-${type}-1`}
                />
              </div>
            ))}
          </Form>
        </th>
        </tr>
        </thead>
        <tbody>
        </tbody>
    </Table>;
        <Tabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3" justify>
          <Tab eventKey="home" title="예정">
            예정중인 경매
          </Tab>
          <Tab eventKey="profile" title="진행 중">
            진행중인 경매
          </Tab>
          <Tab eventKey="longer-tab" title="종료">
            종료된 경매
          </Tab>
        </Tabs>
        
        
        <Form.Select aria-label="Default select example">
          <option value="1">인기순</option>
          <option value="2">조회순</option>
          <option value="3">등록순</option>
          <option value="4">낮은 가격순</option>
          <option value="5">높은 가격순</option>
        </Form.Select>
        <Table style={{ display: "flex", flexFlow: "row", flexWrap: "wrap" }} striped bordered hover>
          <tbody>
            <tr>
              <td>
                <Card style={{ width: '18rem', marginTop: '30px' }} className="hover">
                  <a href='#' style={{ textDecoration: "none" }}>
                    <Card.Img variant="top" src={ds} />
                    <Card.Body>
                      <Card.Title>짭새</Card.Title>
                      <Card.Text></Card.Text>
                      <p>입찰 : 21회</p>
                      <p>종료까지 : ~~</p>
                      <Button variant="primary" className="hover-button">
                        <div className="hidden-hover">시작가 : 10000원</div>
                        <div className="show-hover">현재가 : 572800원</div>
                        <div className="small-text">클릭 시 경매 참가</div>
                      </Button>
                    </Card.Body>
                  </a>
                </Card>
              </td>
            </tr>
          </tbody>
        </Table>
        <Pagination style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Item active>{2}</Pagination.Item>
          <Pagination.Item disabled>{3}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </Container>
    </StyledHeader>

  );
};

export default App;
