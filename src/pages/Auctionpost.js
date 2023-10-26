import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost, updateCurrentPrice } from "../api/addpost"; // 추가: updateCurrentPrice 함수 import
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { getComments } from "../api/auctionBoard";
import styled  from "styled-components";
import { Margin } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addComment } from "../store/commentSlice";
const CommentContainer = styled.div`

  .comment {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    .author {
      font-weight: bold;
      margin-right: 5px;
    }
    .content {
      margin-left: 5px;
    }
  }
`;


function convertToSeoulTime(utcDateString) {
  // 시간 설정
  const utcDate = new Date(utcDateString);
  const seoulOffset = 9 * 60; // 서울은 UTC+9
  const seoulTime = new Date(utcDate.getTime() + seoulOffset * 60000);
  return seoulTime;
}

const Auctionpost = () => {
  const dispatch =useDispatch();
  const [auctionPost, setAuctionPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newCurrentPrice, setNewCurrentPrice] = useState(0); //현재가격 변경
  const [addComments, setaddComments] = useState("");
  const { auctionNo } = useParams();
  const [comments, setComments] = useState([]);

  

  useEffect(() => {
    const fetchAuctionPost = async () => {
      try {
        const response = await getPost(auctionNo);
        setAuctionPost(response.data);
      } catch (error) {
        console.error("게시글 정보를 불러오는 중 오류 발생:", error);
      }
    };

    if (auctionNo) {
      fetchAuctionPost();
    }
  }, [auctionNo]);

  useEffect(() => {
    // 이미지 보여주기
    if (auctionPost && auctionPost.auctionImg) {
      const imageUrls = auctionPost.auctionImg.split(",");
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [auctionPost]);

  const clickAddComment =  () =>{
    const data = { content: addComments, auctionNo:auctionNo };
    dispatch(addComment(data)); 
    setaddComments(" ");
  }

  const handlePrevImage = () => {
    // 이미지 이전버튼
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0
        ? auctionPost.auctionImg.split(",").length - 1
        : prevIndex - 1
    );
  };
  useEffect(() => {
    const loadComments = async () => {
      try {
        if (auctionNo) {
          console.log(auctionNo);
          const response = await getComments(auctionNo);
          console.log(response.data);
          console.log("댓글 데이터:", response.data.content);
          setComments(response.data);
          console.log(comments);
        }
      } catch (error) {
        console.error("댓글 데이터를 불러오는 중 오류 발생:", error);
      }
    };
  
    if (auctionPost) {
      loadComments();
      console.log(loadComments());
    }
  }, [auctionPost]);
  

useEffect(() => {
  const fetchAuctionPost = async () => {
    try {
      const response = await getPost(auctionNo);
      setAuctionPost(response.data);
    } catch (error) {
      console.error("게시글 정보를 불러오는 중 오류 발생:", error);
    }
  };

  if (auctionNo) {
    fetchAuctionPost();
  }
}, [auctionNo]);


  const handleNextImage = () => {
    // 이미지 다음버튼
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % auctionPost.auctionImg.split(",").length
    );
  };

  function formatSeoulTime(dateString) {
    // 시간설정
    const seoulDate = convertToSeoulTime(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return seoulDate.toLocaleDateString("ko-KR", options);
  }

  const handleImmediatePurchase = () => {
    alert("즉시구매가 완료되었습니다.");
  };

  const handlePriceChange = () => {
    if (newCurrentPrice > auctionPost.currentPrice) {
      // 서버로 현재 가격을 업데이트
      updateCurrentPrice(auctionPost.auctionNo, newCurrentPrice)
        .then((updatedPost) => {
          // 업데이트가 성공하면 업데이트된 게시글을 받아와서 상태를 업데이트
          setAuctionPost(updatedPost);
        })
        .catch((error) => {
          // 에러 처리
          console.error("현재 가격 업데이트 실패:", error);
        });
    }
  };

  return (
    <Container>
      {auctionPost ? (
        <Card>
          <Card.Body>
            <h2 className="text-center border-bottom pb-3">
              {auctionPost.auctionTitle}
            </h2>
            <Row className="justify-content-center">
              <Col xs={12} md={6} className="border-right">
                <img
                  src={
                    "/upload/" +
                    auctionPost.auctionImg.split(",")[currentImageIndex]
                  }
                  alt="Auction Image"
                  style={{ maxWidth: "100%" }}
                />
                <div>
                  <Button variant="primary" onClick={handlePrevImage}>
                    이전 이미지
                  </Button>
                  <Button variant="primary" onClick={handleNextImage}>
                    다음 이미지
                  </Button>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <p>상품명: {auctionPost.itemName}</p>
                <p>경매 시작일: {formatSeoulTime(auctionPost.auctionDate)}</p>
                <p>
                  경매 종료일: {formatSeoulTime(auctionPost.auctionEndDate)}
                </p>
                <Row className="border-top justify-content-center">
                <p>판매자 정보: {auctionPost.memberId.id}</p>
                  <p>등록건수: </p>
                  <p>회원 등급: </p>
                </Row>
              </Col>
            </Row>
            <Row className="border-top justify-content-center">
              <Col xs={12} md={6} className="border-right">
                <p>경매 시작가: {auctionPost.auctionSMoney}원</p>
                <p>최소 입찰가: {auctionPost.auctionEMoney}원</p>
                <p>입찰 인원: {auctionPost.auctionAttendNo}명</p>
                <p>현재 가격: {auctionPost.currentPrice}원</p>
                <Form.Group>
                  <Form.Control
                    type="number"
                    value={newCurrentPrice}
                    onChange={(e) => setNewCurrentPrice(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handlePriceChange}>
                  입력가격 입찰
                </Button>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={6}>
                    <p>즉시구매여부: {auctionPost.auctionNowbuy}</p>
                    <p>즉시구매가: {auctionPost.auctionGMoney}원</p>
                  </Col>
                  <Col xs={12} md={6}>
                    {auctionPost.auctionNowbuy === "Y" ? (
                      <Button
                        variant="primary"
                        onClick={handleImmediatePurchase}
                      >
                        즉시구매
                      </Button>
                    ) : (
                      <Button variant="primary" disabled>
                        즉시구매
                      </Button>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
      <Row className="border-top">
        <Col xs={12} md={6} className="border-right">
          {auctionPost && (
            <p className="text-right mt-3 item-desc">
              게시글 내용: {auctionPost.itemDesc}
            </p>
          )}
        </Col>
      </Row>
      <Form onSubmit={clickAddComment}>
        {/* 댓글 추가 입력 폼 */}
        <div className="mt-3">
          <h3>댓글 작성</h3>
          <Form.Group>
            <Form.Label>댓글 내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="댓글을 입력하세요"
              onChange={(e) => setaddComments(e.target.value)}
              value={addComments}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            댓글 작성
          </Button>
        </div>
      </Form>
      <div>
        {comments.map((comment) => (
          <CommentContainer key={comment.commentNo}>
            <div className="comment">
              <span className="author">{comment.member.nick}:</span>
              <span className="content">{comment.content}</span>
            </div>
          </CommentContainer>
        ))}
      </div>
      <style>
        {`
          .item-desc {
            border: 1px solid #ccc; /* You can adjust the border style as needed */
            padding: 10px; /* Add padding for spacing */
          }
        `}
      </style>
      
    </Container>
    
  );
};

export default Auctionpost;
