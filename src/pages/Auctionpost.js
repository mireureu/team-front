import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import img1 from "../img/image1.jpg";
import img2 from "../img/image2.jpg";
import img3 from "../img/image3.jpg";
import img4 from "../img/image4.jpg";
import img5 from "../img/image5.jpg";

const Auctionpost = () => {
  const [bidAmount, setBidAmount] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [img1, img2, img3, img4, img5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const imageContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const centeredTextStyle = {
    textAlign: "center",
  };

  const favoriteButtonStyle = {
    backgroundColor: "pink",
    borderColor: "pink",
  };

  const reportButtonStyle = {
    padding: "0.375rem 0.75rem",
    width: "auto",
  };

  const marginBottomStyle = {
    marginBottom: "80px",
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col xs={6}>
          <div style={imageContainerStyle}>
            <img
              src={images[currentImageIndex]}
              alt="Auction"
              className="w-100 mb-3"
            />
            <div>
              <Button
                className="mr-2"
                onClick={() =>
                  setCurrentImageIndex(
                    (prevIndex) =>
                      (prevIndex - 1 + images.length) % images.length
                  )
                }
              >
                이전
              </Button>
              <Button
                onClick={() =>
                  setCurrentImageIndex(
                    (prevIndex) => (prevIndex + 1) % images.length
                  )
                }
              >
                다음
              </Button>
            </div>
          </div>
        </Col>

        <Col xs={6}>
          <Form>
            <FormGroup className="gr1" style={marginBottomStyle}>
              <Row className="justify-content-center">
                <Col xs={12} style={centeredTextStyle}>
                  <FormLabel>상품명</FormLabel>
                </Col>
                <Col xs={6} className="text-center">
                  <FormLabel>시작시간</FormLabel>
                </Col>
                <Col xs={6} className="text-center">
                  <FormLabel>종료시간</FormLabel>
                </Col>
                <Col xs={12} className="text-center">
                  <FormLabel>입찰횟수</FormLabel>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup className="gr2" style={marginBottomStyle}>
              <Row className="justify-content-center">
                <Col xs={6} className="text-center">
                  <FormLabel>경매 시작가격</FormLabel>
                </Col>
                <Col xs={6} className="text-center">
                  <FormLabel>현재 입찰금액</FormLabel>
                </Col>
                <Col xs={6} className="text-center">
                  <FormLabel>최소 입찰단위</FormLabel>
                </Col>
                <Col xs={6} className="text-center">
                  <FormLabel>즉시구매가</FormLabel>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup className="gr3">
              <Row>
                <Col md={8}>
                  <FormLabel>입찰 금액 입력</FormLabel>
                  <Form.Control
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                </Col>
                <Col md={4} className="d-flex flex-column align-items-center">
                  <Button type="submit" className="mb-2">
                    입찰하기
                  </Button>
                  <Button type="button" style={favoriteButtonStyle}>
                    관심등록
                  </Button>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup className="gr4">
              <Row className="justify-content-center">
                <Col xs={12} className="text-center">
                  <FormLabel>판매자 아이디</FormLabel>
                </Col>
                <Col xs={12} className="text-center">
                  <FormLabel>총 판매건수</FormLabel>
                  <FormLabel>판매자 등급</FormLabel>
                </Col>
                <Button type="button" style={reportButtonStyle}>
                  신고하기
                </Button>
              </Row>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={{ textAlign: "center" }}>
          게시글 내용
        </Col>
      </Row>
    </Container>
  );
};

export default Auctionpost;
