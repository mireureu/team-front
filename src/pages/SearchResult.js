import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getTotalPages } from '../api/search';
import { getCategories, getItem } from '../api/auctionBoard';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
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

const SearchResult = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState("0");

  const searchResult = useSelector((state) => (state.search));
  const content = searchResult?.content || [];
  const location = useLocation();
  const keyword = location.state ? location.state.keyword : null;

  const TotalPage = searchResult?.getTotalPages || 1;
  const categoryAPI = async () => {
    const result = await getCategories();
    setCategories(result.data);
  };

  const itemAPI = async (selectedPage, sortOption) => {
    try {
      const getResult = await getTotalPages(keyword,selectedPage,sortOption);      
      setItems(getResult.data.content);
      
    } catch (error) {
      console.error("데이터 불러오기 오류:", error);
    }
  };

  const handleSortOptionChange = (event) => {
    const newSortOption = event.target.value;
    setSortOption(newSortOption);
    setPage(1);
    setItems([]);
    itemAPI(page, newSortOption);
  };

  useEffect(() => {
    categoryAPI();
  }, []);

  useEffect(() => {
    if(keyword!=null){
      itemAPI(page, sortOption);
    }    
  }, [sortOption, page, keyword]);

  useEffect(()=>{
    itemAPI();
  },[]);

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
    if (newPage > 0){
      setPage(newPage);
    } else if (items.length === 0) {
      setPage(1);
    }
  };
  return (
    <StyledHeader>
      <Container>
        <Form.Select aria-label="정렬기준" value={sortOption} onChange={handleSortOptionChange}>
          <option value="1">기본</option>
          <option value="2">입찰 높은 순</option>
          <option value="3">조회순</option>
          <option value="4">등록순</option>
          <option value="5">낮은 가격순</option>
          <option value="6">높은 가격순</option>
        </Form.Select>
        <div className="cards-container">
          {items.length > 0 &&
            items.map((item) => (
              <Card key={item.auctionNo} style={{ width: '18rem', marginTop: '30px' }} className="hover">
                <a href="#" style={{ textDecoration: "none" }}>
                  <Card.Img variant="top" src={item.auctionImg} />
                  <Card.Body>
                    <Card.Title>{item.auctionTitle}</Card.Title>
                    <Card.Text></Card.Text>
                    <p>입찰 : {item.auctionAttendNo}회</p>
                    <p>조회 : {item.auctionCheckNo}</p>
                    {item.auctionEndDate && (
                      <p>

                        남은 시간: {calculateTimeDifference(item.auctionEndDate).days}일{' '}
                        {calculateTimeDifference(item.auctionEndDate).hours}시간{' '}
                        {calculateTimeDifference(item.auctionEndDate).minutes}분{' '}
                        {/* {calculateTimeDifference(item.auctionEndDate).seconds}초 */}
                      </p>
                    )}
                    <div className="hover-button">
                      <div>
                        현재가 : {item.currentPrice}원
                      </div>
                      <div
                        className="hidden-hover"
                        onMouseEnter={() => {
                      
                        }}
                      >
                        현재가 : {item.currentPrice}원
                      </div>
                      <div
                        className="show-hover"
                        id={`show-hover-${item.auctionAttendNo}`}
                        style={{ display: 'none' }}
                        onMouseLeave={() => {
                  
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
          {Array.from({ length: TotalPage }, (_, i) => (
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
            disabled={page === TotalPage}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={page === TotalPage}
          />
        </Pagination>
        <div className="current-page">
          {/* 현재 페이지: {page}/{totalPages} */}
        </div>
      </Container>
    </StyledHeader>
  );
};

export default SearchResult;