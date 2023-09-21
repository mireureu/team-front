import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ds from '../src/image/image.jpg';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
// import CardGroup from 'react-bootstrap/CardGroup';

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
`;

const App = () => {
  return (
    <StyledHeader>
      <Container>
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
        <Table style={{display: "flex", flexFlow: "row", flexWrap: "wrap"}} striped bordered hover>
          <Card style={{ width: '18rem', marginTop: '30px' }} className="hover">
            <Card.Img variant="top" src={ds} />
            <Card.Body>
              <Card.Title>짭새</Card.Title>
              <Card.Text></Card.Text>
              <p>입찰 : 21회</p>
              <p>종료까지 : ~~</p>
              <Button variant="primary">
                <div className="hidden-hover">시작가 : 10000원</div>
                <div className="show-hover">현재가 : 572800원</div>
                <div className="small-text">클릭 시 경매 참가</div>
              </Button>
            </Card.Body>
          </Card>
          {/* <Card style={{ width: '18rem', marginTop: '30px' }} className="hover">
            <Card.Img variant="top" src={ds} />
            <Card.Body>
              <Card.Title>짭새</Card.Title>
              <Card.Text></Card.Text>
              <Button variant="primary">
                <div className="hidden-hover">시작가 : 10000원</div>
                <div className="show-hover">경매 참가</div>
              </Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem', marginTop: '30px' }} className="hover">
            <Card.Img variant="top" src={ds} />
            <Card.Body>
              <Card.Title>짭새</Card.Title>
              <Card.Text></Card.Text>
              <Button variant="primary">
                <div className="hidden-hover">시작가 : 10000원</div>
                <div className="show-hover">경매 참가</div>
              </Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem', marginTop: '30px' }} className="hover">
            <Card.Img variant="top" src={ds} />
            <Card.Body>
              <Card.Title>짭새</Card.Title>
              <Card.Text></Card.Text>
              <Button variant="primary">
                <div className="hidden-hover">시작가 : 10000원</div>
                <div className="show-hover">경매 참가</div>
              </Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem', marginTop: '30px' }} className="hover">
            <Card.Img variant="top" src={ds} />
            <Card.Body>
              <Card.Title>짭새</Card.Title>
              <Card.Text></Card.Text>
              <Button variant="primary">
                <div className="hidden-hover">시작가 : 10000원</div>
                <div className="show-hover">경매 참가</div>
              </Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem', marginTop: '30px' }} className="hover">
            <Card.Img variant="top" src={ds} />
            <Card.Body>
              <Card.Title>짭새</Card.Title>
              <Card.Text></Card.Text>
              <Button variant="primary">
                <div className="hidden-hover">시작가 : 10000원</div>
                <div className="show-hover">경매 참가</div>
              </Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem', marginTop: '30px' }} className="hover">
            <Card.Img variant="top" src={ds} />
            <Card.Body>
              <Card.Title>짭새</Card.Title>
              <Card.Text></Card.Text>
              <Button variant="primary">
                <div className="hidden-hover">시작가 : 10000원</div>
                <div className="show-hover">경매 참가</div>
              </Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem', marginTop: '30px' }} className="hover">
            <Card.Img variant="top" src={ds} />
            <Card.Body>
              <Card.Title>짭새</Card.Title>
              <Card.Text></Card.Text>
              <Button variant="primary">
                <div className="hidden-hover">시작가 : 10000원</div>
                <div className="show-hover">경매 참가</div>
              </Button>
            </Card.Body>
          </Card> */}
          {/* <CardGroup>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This card has supporting text below as a natural lead-in to
            additional content.{' '}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </CardGroup> */}
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