import React, { useState, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getCategories, getPost, updatePost } from "../api/addpost"; // 수정된 API 함수 사용
import { useNavigate, useParams } from "react-router-dom";

// 서울시간 설정
function convertToSeoulTime(date) {
  const seoulOffset = 9 * 60; // 서울은 UTC+9
  const seoulTime = new Date(date.getTime() + seoulOffset * 60000);
  return seoulTime;
}

const UpdatePost = () => {
  const { auctionNo } = useParams();
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [itemName, setItemName] = useState("");
  const [desc, setDesc] = useState("");
  const [sMoney, setSmoney] = useState("");
  const [eMoney, setEmoney] = useState("");
  const [gMoney, setGmoney] = useState(0);
  const [select, setSelect] = useState(1);
  const [isBuyNowChecked, setIsBuyNowChecked] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]); // 이미지 미리보기 배열
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [eMoneyError, setEMoneyError] = useState("");
  const [auctionDate, setAuctionDate] = useState(new Date());
  const [auctionEndDate, setAuctionEndDate] = useState(new Date());
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPost(auctionNo);
        if (response.status === 200) {
          const post = response.data;
          setTitle(post.auctionTitle);
          setItemName(post.itemName);
          setDesc(post.itemDesc);
          setSmoney(post.auctionSMoney);
          setEmoney(post.auctionEMoney);
          setGmoney(post.auctionGMoney);
          setSelect(post.category.categoryNo);
          setIsBuyNowChecked(post.auctionNowbuy === "Y");
          setImagePreviews(
            post.auctionImg
              .split(",")
              .map((imagePath) => `/images/${imagePath}`)
          );
          setAuctionDate(new Date(post.auctionDate));
          setAuctionEndDate(new Date(post.auctionEndDate));
          setLoaded(true);
        } else {
          console.error("게시물 정보 불러오기 실패.");
        }
      } catch (error) {
        console.error("게시물 정보 불러오기 중 오류발생:", error);
      }
    };

    if (!loaded) {
      fetchData();
    }
  }, [auctionNo, loaded]);

  const onClick = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("itemName", itemName);
    formData.append("desc", desc);
    formData.append("sMoney", sMoney);
    formData.append("eMoney", eMoney);
    formData.append("gMoney", gMoney);
    formData.append("categoryNo", select);
    formData.append("nowBuy", isBuyNowChecked ? "Y" : "N");

    const seoulAuctionDate = convertToSeoulTime(auctionDate);
    const seoulAuctionEndDate = convertToSeoulTime(auctionEndDate);
    formData.append("auctionDate", seoulAuctionDate.toISOString());
    formData.append("auctionEndDate", seoulAuctionEndDate.toISOString());

    for (let i = 0; i < images.length; i++) {
      formData.append("image", images[i]);
    }

    try {
      const response = await updatePost(auctionNo, formData); // 업데이트 API 함수 호출
      if (response.status === 200) {
        setIsModalOpen(true);
      } else {
        console.error("게시물 업데이트 중 오류발생.");
      }
    } catch (error) {
      console.error("게시물 업데이트 중 오류가 발생했습니다.", error);
    }
  };

  const onUploadImage = (e) => {
    const selectedImages = e.target.files;
    const newImages = [...images];
    for (let i = 0; i < selectedImages.length; i++) {
      newImages.push(selectedImages[i]);
    }

    const imagePreviewsArray = Array.from(selectedImages).map((image) =>
      URL.createObjectURL(image)
    );

    setImages(newImages);
    setImagePreviews([...imagePreviews, ...imagePreviewsArray]);
  };

  const removeImage = (index) => {
    const newImagePreviews = [...imagePreviews];
    newImagePreviews.splice(index, 1);

    const newImages = [...images];
    newImages.splice(index, 1);

    setImagePreviews(newImagePreviews);
    setImages(newImages);
  };

  const categoryAPI = async () => {
    const result = await getCategories();
    setCategories(result.data);
  };

  const onChangeCategory = (e) => {
    setSelect(e.currentTarget.value);
  };

  useEffect(() => {
    categoryAPI();
    const minBidLimit = sMoney * 0.1;
    setEmoney(minBidLimit);
  }, [sMoney]);

  return (
    <Container>
      <h1>경매글 수정</h1>
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
            onChange={(e) => setItemName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            value={desc}
            placeholder="게시글 내용"
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            value={sMoney}
            placeholder="경매시작가격(최대 입력값 1억원)"
            onChange={(e) => setSmoney(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            value={Math.floor(eMoney)}
            placeholder="최소입찰가 (자동 설정)"
            disabled
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
          {categories.map((category, index) => (
            <option value={category.categoryNo} key={index}>
              {category.categoryName}
            </option>
          ))}
        </Form.Select>
        <Form.Group className="mb-3">
          <Form.Label>이미지 업로드</Form.Label>
          <Form.Control
            type="file"
            onChange={onUploadImage}
            multiple
            accept="image/*"
          />
        </Form.Group>
        {imagePreviews.map((imagePreview, index) => (
          <div key={index}>
            <img
              src={imagePreview}
              alt={`Image ${index}`}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <button onClick={() => removeImage(index)} type="button">
              삭제
            </button>
          </div>
        ))}
        <Button
          variant="danger"
          style={{ marginTop: "20px" }}
          onClick={onClick}
          disabled={
            title === "" ||
            itemName === "" ||
            desc === "" ||
            sMoney === "" ||
            eMoney === "" ||
            (isBuyNowChecked && gMoney === "") ||
            images.length === 0
          }
        >
          수정
        </Button>
      </Form>
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>업로드 성공</Modal.Title>
        </Modal.Header>
        <Modal.Body>게시물이 성공적으로 업로드되었습니다.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setIsModalOpen(false);
              navigate("/AuctionDetail");
            }}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UpdatePost;
