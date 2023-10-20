import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api/addpost";
import { Container, Row, Col, Card } from "react-bootstrap";

const Auctionpost = () => {
  const [auctionPost, setAuctionPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스
  const { auctionNo } = useParams();

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
    if (auctionPost && auctionPost.auctionImg) {
      const imageUrls = auctionPost.auctionImg.split(",");
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      }, 5000); // 이미지를 5초마다 변경 (5000 밀리초)

      return () => {
        clearInterval(interval);
      };
    }
  }, [auctionPost]);

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
                {auctionPost.auctionImg && (
                  <img
                    src={auctionPost.auctionImg.split(",")[currentImageIndex]}
                    alt="Auction Image"
                    style={{ maxWidth: "100%" }}
                  />
                )}
              </Col>
              <Col xs={12} md={6}>
                <p>상품명: {auctionPost.itemName}</p>
                <p>경매 시작일: {auctionPost.auctionDate}</p>
                <p>경매 종료일: {auctionPost.auctionEndDate}</p>
              </Col>
            </Row>
            <Row className="border-top justify-content-center">
              <Col xs={12} md={6} className="border-right">
                <p>경매 시작가: {auctionPost.auctionSMoney}원</p>
                <p>최소 입찰가: {auctionPost.auctionEMoney}원</p>
                <p>입찰 인원: {auctionPost.auctionAttendNo}명</p>
                <p>현재 가격: {auctionPost.currentPrice}원</p>
              </Col>
              <Col xs={12} md={6}>
                <p>즉시구매여부: {auctionPost.auctionNowbuy}</p>
                <p>즉시구매가: {auctionPost.auctionGMoney}원</p>
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
            <p className="text-right mt-3">
              게시글 내용: {auctionPost.itemDesc}
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Auctionpost;
