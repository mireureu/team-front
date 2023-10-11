import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [minimumBid, setMinimumBid] = useState("");
  const [buyNowPrice, setBuyNowPrice] = useState("");
  const [endDate, setEndDate] = useState("");
  const [images, setImages] = useState([]); // 이미지 배열 추가
  const [imagePreviews, setImagePreviews] = useState([]); // 이미지 미리보기 배열 추가

  const handleSubmit = () => {
    // 경매글 작성 로직을 구현할 수 있습니다.
    // 제목(title), 설명(description), 경매 시작가격(startPrice),
    // 최소 입찰금액(minimumBid), 즉시구매가(buyNowPrice),
    // 경매 종료일자(endDate), 이미지(images) 등의 정보를 이용하여 경매글을 작성하고,
    // 서버로 요청을 보낼 수 있습니다.
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    // 이미지 배열에 추가
    setImages((prevImages) => [...prevImages, selectedImage]);

    // 이미지 파일을 미리보기로 보여주기
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // 이미지 미리보기 배열에 추가
        setImagePreviews((prevPreviews) => [
          ...prevPreviews,
          event.target.result,
        ]);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const removeImage = (index) => {
    // 이미지와 미리보기 배열에서 해당 이미지를 제거
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col xs={12}>
          <Form>
            <FormGroup>
              <FormLabel>제목</FormLabel>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>설명</FormLabel>
              <Form.Control
                as="textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>경매 시작가격</FormLabel>
              <Form.Control
                type="number"
                value={startPrice}
                onChange={(e) => setStartPrice(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>최소 입찰금액</FormLabel>
              <Form.Control
                type="number"
                value={minimumBid}
                onChange={(e) => setMinimumBid(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>즉시구매가</FormLabel>
              <Form.Control
                type="number"
                value={buyNowPrice}
                onChange={(e) => setBuyNowPrice(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>경매 종료일자</FormLabel>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>이미지 업로드</FormLabel>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple // 여러 개의 이미지를 선택할 수 있도록 설정
              />
              {imagePreviews.length > 0 &&
                imagePreviews.map((preview, index) => (
                  <div key={index} className="mt-2">
                    <img
                      src={preview}
                      alt={`이미지 미리보기 ${index + 1}`}
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="mt-1"
                      onClick={() => removeImage(index)}
                    >
                      삭제
                    </Button>
                  </div>
                ))}
            </FormGroup>

            <Button type="submit" onClick={handleSubmit}>
              경매글 작성
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
