import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getCategories, addPost } from "../api/addpost";
import { useEffect, useState } from "react";

const Header = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  padding: 20px 0;
`;

const Post = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [itemName, setitemName] = useState("");
  const [dece, setDece] = useState("");
  const [sMoney, setSmoney] = useState("");
  const [eMoney, setEmoney] = useState("");
  const [gMoney, setGmoney] = useState("");
  const [select, setSelect] = useState(1);
  const [isBuyNowChecked, setIsBuyNowChecked] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const onImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length + images.length > 5) {
      alert("최대 5장까지 업로드할 수 있습니다.");
      return;
    }
    selectedImages.forEach((image) => {
      setImages((prevImages) => [...prevImages, image]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreviews((prevPreviews) => [
          ...prevPreviews,
          { url: event.target.result, id: image.name },
        ]);
      };
      reader.readAsDataURL(image);
    });
  };

  const onClick = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("itemName", itemName);
    formData.append("dece", dece);
    formData.append("sMoney", sMoney);
    formData.append("eMoney", eMoney);
    formData.append("gMoney", gMoney);
    formData.append("categoryNo", select); // 변경된 변수명
    formData.append("nowBuy", isBuyNowChecked ? "Y" : "N"); // 즉시 구매 여부를 "Y" 또는 "N"으로 설정

    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    try {
      const response = await addPost(formData); // 서버로 데이터 업로드
      if (response.status === 200) {
        // 업로드 성공 처리
        console.log("게시물이 성공적으로 업로드되었습니다.");
      } else {
        // 업로드 실패 처리
        console.error("게시물 업로드 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("게시물 업로드 중 오류가 발생했습니다.", error);
    }
  };

  const categoryAPI = async () => {
    const result = await getCategories();
    console.log(result);
    setCategories(result.data);
  };

  useEffect(() => {
    categoryAPI();
  }, []);

  const onChangeCategory = (e) => {
    setSelect(e.currentTarget.value);
  };

  return (
    <Container>
      <Header>경매글 작성</Header>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={title}
            placeholder="제목"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={itemName}
            placeholder="상품명"
            onChange={(e) => setitemName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            value={dece}
            placeholder="게시글 내용"
            onChange={(e) => setDece(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            value={sMoney}
            placeholder="경매시작가격"
            onChange={(e) => setSmoney(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            value={eMoney}
            placeholder="최소입찰가"
            onChange={(e) => setEmoney(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="즉시구매 사용여부"
            checked={isBuyNowChecked}
            onChange={() => setIsBuyNowChecked(!isBuyNowChecked)}
          />
        </Form.Group>
        {isBuyNowChecked && (
          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              value={gMoney}
              placeholder="즉시구매가"
              onChange={(e) => setGmoney(e.target.value)}
            />
          </Form.Group>
        )}
        <Form.Select onChange={onChangeCategory} value={select}>
          {categories.map((category) => (
            <option value={category.categoryNo} key={category.categoryNo}>
              {category.categoryName}
            </option>
          ))}
        </Form.Select>
        <Form.Group className="mb-3">
          <Form.Label>이미지 업로드 (최대 5장)</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={onImageChange}
            multiple
          />
        </Form.Group>
        <div>
          {imagePreviews.map((imagePreview) => (
            <img
              key={imagePreview.id}
              src={imagePreview.url}
              alt="미리보기"
              style={{ maxWidth: "100px", marginRight: "10px" }}
            />
          ))}
        </div>
        <Button
          variant="danger"
          style={{ marginTop: "20px" }}
          onClick={onClick}
        >
          저장
        </Button>{" "}
      </Form>
    </Container>
  );
};

export default Post;
