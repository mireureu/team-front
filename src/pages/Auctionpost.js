import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost, updateCurrentPrice, getCountAuction } from "../api/addpost";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";

function convertToSeoulTime(utcDateString) {
  // 시간 설정
  const utcDate = new Date(utcDateString);
  const seoulOffset = 9 * 60; // 서울은 UTC+9
  const seoulTime = new Date(utcDate.getTime() + seoulOffset * 60000);
  return seoulTime;
}

const Auctionpost = () => {
  const [auctionPost, setAuctionPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newCurrentPrice, setNewCurrentPrice] = useState(0); // 현재 가격 변경
  const { auctionNo } = useParams();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sellerAuctionCount, setSellerAuctionCount] = useState(0);

  useEffect(() => {
    // 데이터 가져오는 함수
    const fetchAuctionPost = async () => {
      try {
        const response = await getPost(auctionNo);
        setAuctionPost(response.data);

        // 추가: 판매자의 등록 게시물 수 가져오기
        const sellerId = response.data?.memberId?.id;
        if (sellerId) {
          const sellerCountResponse = await getCountAuction(sellerId);
          setSellerAuctionCount(sellerCountResponse.data[0]?.AUCTION_COUNT);
        }
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

  const handlePrevImage = () => {
    // 이미지 이전버튼
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0
        ? auctionPost.auctionImg.split(",").length - 1
        : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    // 이미지 다음버튼
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % auctionPost.auctionImg.split(",").length
    );
  };

  function formatSeoulTime(dateString) {
    const seoulDate = convertToSeoulTime(dateString);
    const options = {
      timeZone: "Asia/Seoul", // 서울 시간대로 설정
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return seoulDate.toLocaleDateString("ko-KR", options);
  }

  const handleImmediatePurchase = () => {
    // 즉시구매 관련 (미구현)
    alert("즉시구매가 완료되었습니다.");
  };

  const handlePriceChangeSuccess = () => {
    // 입찰 성공 시 팝업
    setShowSuccessModal(true);
  };

  const handlePriceChange = async (e) => {
    // 입찰가격 변경
    try {
      const newPrice =
        auctionPost.currentNum === 0
          ? auctionPost.auctionSMoney + auctionPost.auctionEMoney
          : auctionPost.currentPrice + auctionPost.auctionEMoney;

      await updateCurrentPrice(auctionPost.auctionNo, {
        currentPrice: newPrice,
      });

      // 입찰 변경이 성공하면 성공 모달을 표시합니다.
      handlePriceChangeSuccess();
    } catch (error) {
      console.error("입찰 변경 실패:", error);
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
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={
                      "/upload/" +
                      auctionPost.auctionImg.split(",")[currentImageIndex]
                    }
                    alt="Auction Image"
                    style={{
                      width: "auto",
                      height: "100%",
                      display: "block",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
                <div className="text-center">
                  <p>
                    이미지 {currentImageIndex + 1} /{" "}
                    {auctionPost.auctionImg.split(",").length}
                  </p>
                  <div>
                    <Button variant="primary" onClick={handlePrevImage}>
                      이전
                    </Button>
                    <Button variant="primary" onClick={handleNextImage}>
                      다음
                    </Button>
                  </div>
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
                  <p>등록건수: {sellerAuctionCount}</p>
                  <p>회원 등급: </p>
                </Row>
              </Col>
            </Row>
            <Row className="border-top justify-content-center">
              <Col xs={12} md={6} className="border-right">
                <p>경매 시작가: {auctionPost.auctionSMoney}원</p>
                <p>최소 입찰가: {auctionPost.auctionEMoney}원</p>
                <p>총 입찰 횟수: {auctionPost.currentNum}</p>
                <p>입찰 인원: {auctionPost.auctionAttendNo}명</p>
                <p>현재 가격: {auctionPost.currentPrice}원</p>
              </Col>
              <Col xs={12} md={6}>
                입찰하기
                <Form.Group>
                  <Form.Control
                    type="number"
                    style={{ width: "300px" }} // 원하는 폭(가로 크기)으로 설정
                    value={
                      auctionPost.currentNum === 0
                        ? auctionPost.auctionSMoney + auctionPost.auctionEMoney
                        : auctionPost.currentPrice + auctionPost.auctionEMoney
                    }
                    onChange={(e) => setNewCurrentPrice(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handlePriceChange}>
                  입찰
                </Button>
                <div className="border-top my-3"></div>
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
        <Col xs={12} md={12} className="border-right">
          {auctionPost && (
            <p className="text-right mt-3 item-desc">
              게시글 내용: {auctionPost.itemDesc}
            </p>
          )}
        </Col>
      </Row>
      <style>
        {`
          .item-desc {
            border: 1px solid #ccc; /* You can adjust the border style as needed */
            padding: 10px; /* Add padding for spacing */
          }
        `}
      </style>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>입찰 변경 성공</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>입찰가 변경이 성공적으로 제출되었습니다.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowSuccessModal(false);
              window.location.reload(); // 팝업 닫기 후 페이지 새로고침
            }}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Auctionpost;
