import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getCategories, addPost } from "../api/addpost";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [itemName, setitemName] = useState("");
  const [desc, setDesc] = useState("");
  const [sMoney, setSmoney] = useState("");
  const [eMoney, setEmoney] = useState("");
  const [gMoney, setGmoney] = useState(0);
  const [select, setSelect] = useState(1);
  const [isBuyNowChecked, setIsBuyNowChecked] = useState(false);
  const [images, setImages] = useState([]);
  const [checkNo, setcheckNo] = useState(0);
  const [attendNo, setattendNo] = useState(0);
  const [imagePreviews, setImagePreviews] = useState([]); // 이미지 미리보기 배열
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const onClick = async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("itemName", itemName);
    formData.append("desc", desc);
    formData.append("sMoney", sMoney);
    formData.append("eMoney", eMoney);
    formData.append("gMoney", gMoney);
    formData.append("categoryNo", select);
    formData.append("checkNo", checkNo);
    formData.append("attendNo", attendNo);
    formData.append("nowBuy", isBuyNowChecked ? "Y" : "N"); // 즉시 구매 여부를 "Y" 또는 "N"으로 설정

    // 이미지를 FormData에 추가
    for (let i = 0; i < images.length; i++) {
      formData.append("image", images[i]);
    }

    try {
      const response = await addPost(formData);
      if (response.status === 200) {
        // 업로드 성공 시 모달 열기
        setIsModalOpen(true);
      } else {
        // 업로드 실패 처리
        console.error("게시물 업로드 중 오류발생.");
      }
    } catch (error) {
      console.error("게시물 업로드 중 오류가 발생했습니다.", error);
    }
  };

  const onUploadImage = (e) => {
    // 이미지 파일 배열을 새로운 배열에 추가
    const selectedImages = e.target.files;
    const newImages = [...images];
    for (let i = 0; i < selectedImages.length; i++) {
      newImages.push(selectedImages[i]);
    }

    // 이미지 미리보기 배열 업데이트
    const imagePreviewsArray = Array.from(selectedImages).map((image) =>
      URL.createObjectURL(image)
    );

    setImages(newImages);
    setImagePreviews([...imagePreviews, ...imagePreviewsArray]);
  };

  const removeImage = (index) => {
    const newImagePreviews = [...imagePreviews];
    newImagePreviews.splice(index, 1); // 선택한 이미지 미리보기 제거

    const newImages = [...images];
    newImages.splice(index, 1); // 선택한 이미지 배열에서 제거

    setImagePreviews(newImagePreviews);
    setImages(newImages);
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
      <h1>경매글 작성</h1>
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
          {categories.map((category, index) => (
            <option value={category.categoryNo} key={index}>
              {category.categoryName}
            </option>
          ))}
        </Form.Select>
        <Form.Group className="mb-3">
          <Form.Label>이미지 업로드</Form.Label>
          <Form.Control type="file" onChange={onUploadImage} multiple />
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
        >
          저장
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
              navigate("/AuctionDetail"); // 이 부분에서 페이지 이동
            }}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Post;
