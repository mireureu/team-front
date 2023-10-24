import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getCategories, getItem } from "../api/auctionBoard";

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
  const [sortOption, setSortOption] = useState("0"); // 정렬 옵션 기본값을 0으로 설정

  const categoryAPI = async () => {
    const result = await getCategories();
    setCategories(result.data);
  };

  const itemAPI = async (selectedCategory, selectedPage, sortOption) => {
    try {
      const result = await getItem(selectedPage, selectedCategory, sortOption);
      console.log(result);
      setTotalPages(result.data.totalPages);
      setItems(result.data.content);
    } catch (error) {
      console.error("데이터 불러오기 오류:", error);
    }
  };

  const handleSortOptionChange = (event) => {
    const newSortOption = event.target.value;
    setSortOption(newSortOption);
    setPage(1);
    setItems([]);
    itemAPI(category, page, newSortOption);
  };

  useEffect(() => {
    categoryAPI();
  }, []);

  useEffect(() => {
    itemAPI(category, page, sortOption);
  }, [category, page, sortOption]);

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
        <Form.Select
          aria-label="정렬기준"
          value={sortOption}
          onChange={handleSortOptionChange}
        >
          <option value="0">기본</option>
          <option value="1">입찰 높은 순</option>
          <option value="2">조회순</option>
          <option value="3">등록순</option>
          <option value="4">낮은 가격순</option>
          <option value="5">높은 가격순</option>
        </Form.Select>
        <div className="cards-container">
          {items.length > 0 &&
            items.map((item, index) => (
              <Card
                key={index}
                style={{ width: "18rem", marginTop: "30px" }}
                className="hover"
              >
                <Link to={`/auctionpost/${item.auctionNo}`}>
                  {" "}
                  {/* 게시글 번호를 URL에 전달하는 Link 생성 */}
                  <Card.Img variant="top" src={"/upload/" + item.auctionImg.split(",", 1)} />
                  <Card.Body>
                    <Card.Title>{item.auctionTitle}</Card.Title>
                    <Card.Text></Card.Text>
                    <p>입찰 : {item.auctionAttendNo}회</p>
                    <p>조회 : {item.auctionCheckNo}</p>
                    {item.auctionEndDate && (
                      <p>
                        남은 시간:{" "}
                        {calculateTimeDifference(item.auctionEndDate).days}일{" "}
                        {calculateTimeDifference(item.auctionEndDate).hours}시간{" "}
                        {calculateTimeDifference(item.auctionEndDate).minutes}분{" "}
                        {calculateTimeDifference(item.auctionEndDate).seconds}초
                      </p>
                    )}
                    <div className="hover-button">
                      <div>현재가 : {item.currentPrice}원</div>
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
                        style={{ display: "none" }}
                        onMouseLeave={() => {
                          // ...
                        }}
                      >
                        현재가 : {item.currentPrice}원
                      </div>
                      <div className="small-text">클릭 시 경매 참가</div>
                    </div>
                  </Card.Body>
                </Link>
              </Card>
            ))}
        </div>
        <Pagination
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={page === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          />
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