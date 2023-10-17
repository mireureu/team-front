import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getCategories, getItem } from '../api/auctionBoard';
import imgtest1 from '../img/image.jpg';

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .container {
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .Pagination.Item.active {
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
  }
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    flex-flow: "row";
    justify-content: center;
  }

  .hover {
    border: 1px solid;
    padding: 10px;
    width: 300px;
    margin: 10px;
    background-color: initial;
    color: black;
    transition: background-color 0.3s, color 0.3s;
  }

  .hover:hover {
    background-color: whitesmoke;
    color: white;
    transform: scale(1.05);
  }

  .hidden-hover {
    display: none;
  }

  .hover-button:hover .hidden-hover {
    display: block;
  }

  .hover-button:hover .show-hover {
    display: none;
  }

  .Card {
    margin-left: 100px;
  }
  .small-text {
    font-size: 12px;
  }
  .hover-button {
    background-color: initial;
    color: initial;
  }

  .hover-button:hover {
    background-color: white;
    color: black;
  }

  .current-page {
    text-align: center;
    margin-top: 10px;
    font-weight: bold;
  }
`;

const App = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const categoryAPI = async () => {
    const result = await getCategories();
    setCategories(result.data);
  };

  const itemAPI = async (selectedCategory, selectedPage) => {
    try {
      // 서버에서 데이터 불러오기
      const result = await getItem(selectedPage, selectedCategory);

      console.log("aaaaaaaaaaaaa" + result.data); // 응답 데이터를 콘솔로 출력하여 응답 구조를 확인합니다.
      console.log(result.data.totalPages);
      console.log(result.data.content);
      // 불러온 데이터로 items 상태 업데이트
      setTotalPages(result.data.totalPages);
      setItems(result.data.content);
    } catch (error) {
      console.error("데이터 불러오기 오류:", error);
      // 에러 처리 - 예를 들어 오류 메시지를 표시하거나 다른 조치를 취할 수 있습니다.
    }
  };

  useEffect(() => {
    categoryAPI();
  }, []);

  useEffect(() => {
    itemAPI(category, page);
  }, [category, page]);

  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory !== category) {
      setCategory(selectedCategory);
      setPage(1);
      setItems([]);
    }
  };

  const calculateTimeDifference = (auctionEndDate) => {
    if (!auctionEndDate) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const endDate = new Date(auctionEndDate);
    const currentDate = new Date();
    const timeDifference = endDate - currentDate;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    return {
      days: daysDifference,
      hours: hoursDifference % 24,
      minutes: minutesDifference % 60,
      seconds: secondsDifference % 60,
    };
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      setPage(newPage);
    } else if (items.length === 0) {
      setPage(1);
    }
  };

  return (
    <StyledHeader>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <Offcanvas.Body>
                  <Button
                    variant="link"
                    onClick={() => handleCategoryChange(null)}
                  >
                    전체목록
                  </Button>
                  {categories.map((category) => (
                    <Button
                      variant="link"
                      key={category.categoryNo}
                      onClick={() => handleCategoryChange(category.categoryNo)}
                    >
                      {category.categoryName}
                    </Button>
                  ))}
                </Offcanvas.Body>
              </th>
            </tr>
          </thead>
        </Table>
        {/* <Tabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3" justify>
          <Tab eventKey="home" title="예정">
            예정중인 경매
          </Tab>
          <Tab eventKey="profile" title="진행 중">
            진행중인 경매
          </Tab>
          <Tab eventKey="longer-tab" title="종료">
            종료된 경매
          </Tab>
        </Tabs> */}
        <Form.Select aria-label="Default select example">
          {/* <option value="1">인기순</option> */}
          <option value="2">조회순</option>
          <option value="3">등록순</option>
          <option value="4">낮은 가격순</option>
          <option value="5">높은 가격순</option>
        </Form.Select>
        <div className="cards-container">
          {items.length > 0 && items.map((item, index) => (
            <Card key={index} style={{ width: '18rem', marginTop: '30px' }} className="hover">
              <a href="#" style={{ textDecoration: "none" }}>
                <Card.Img variant="top" src={imgtest1} />
                {console.log(item.auctionNo)}
                <Card.Body>
                  <Card.Title>{item.auctionTitle}</Card.Title>
                  <Card.Text></Card.Text>
                  <p>입찰 : {item.bidCount}회</p>
                  {item.auctionEndDate && (
                    <p>
                      남은 시간: {calculateTimeDifference(item.auctionEndDate).days}일{' '}
                      {calculateTimeDifference(item.auctionEndDate).hours}시간{' '}
                      {calculateTimeDifference(item.auctionEndDate).minutes}분{' '}
                      {calculateTimeDifference(item.auctionEndDate).seconds}초
                    </p>
                  )}
                  <div className="hover-button">
                    <div>
                      현재가 : {item.currentPrice}원
                    </div>
                    <div
                      className="hidden-hover"
                      onMouseEnter={() => {
                        // ...
                      }}
                    >
                      현재가 : {item.currentPrice}원
                    </div>
                    <div
                      className="show-hover"
                      id={`show-hover-${index}`}
                      style={{ display: 'none' }}
                      onMouseLeave={() => {
                        // ...
                      }}
                    >
                      현재가 : {item.currentPrice}원
                    </div>
                    <div className="small-text">클릭 시 경매 참가</div>
                  </div>
                </Card.Body>
              </a>
            </Card>
          ))}
        </div>
        <Pagination style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <Pagination.First onClick={() => handlePageChange(1)} disabled={page === 1} />
          <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === page}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={page === totalPages}
          />
        </Pagination>
        <div className="current-page"> 
        
          {/* 현재 페이지: {page}/{totalPages} */}
        </div>
      </Container>
    </StyledHeader>
  );
};

export default App;