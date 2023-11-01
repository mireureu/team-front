import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getCategories, updatePost } from "../api/addpost";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 서울시간으로 변환
function convertToSeoulTime(date) {
  const seoulOffset = 9 * 60;
  const seoulTime = new Date(date.getTime() + seoulOffset * 60000);
  return seoulTime;
}

// 게시물 데이터를 담는 상태
const UpdatePost = () => {
  const auctionData = JSON.parse(localStorage.getItem("auction")); // 옥션 정보 불러오는거
  // console.log(auctionData.category.categoryNo); // 이게시글의 카테고리 넘버가 3번이라는거
  // auctionData.auctionTitle

  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState({
    title: auctionData.auctionTitle,
    itemName: auctionData.itemName,
    desc: auctionData.desc,
    sMoney: auctionData.sMoney,
    eMoney: auctionData.eMoney,
    gMoney: auctionData.gMoney,
    select: auctionData.category.categoryNo,
    isBuyNowChecked: auctionData.nowBuy === "Y",
    images: [], // 이미지는 따로 처리해야 합니다.
    checkNo: auctionData.checkNo,
    attendNo: auctionData.attendNo,
    auctionDate: new Date(auctionData.auctionDate),
    auctionEndDate: new Date(auctionData.auctionEndDate),
  });

  const {
    title,
    itemName,
    desc,
    sMoney,
    eMoney,
    gMoney,
    select,
    isBuyNowChecked,
    images,
    checkNo,
    attendNo,
    auctionDate,
    auctionEndDate,
  } = post;

  const [imagePreviews, setImagePreviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [eMoneyError, setEMoneyError] = useState("");

  // 게시물 수정 버튼 클릭 시 호출되는 함수
  const onClick = async () => {
    const formData = new FormData();
    console.log(auctionData);
    formData.append("title", title);
    formData.append("itemName", itemName);
    formData.append("desc", desc);
    formData.append("sMoney", sMoney);
    formData.append("eMoney", Math.floor(eMoney));
    formData.append("gMoney", gMoney);
    formData.append("categoryNo", select);
    formData.append("checkNo", checkNo);
    formData.append("attendNo", attendNo);
    formData.append("nowBuy", isBuyNowChecked ? "Y" : "N");

    const seoulAuctionDate = convertToSeoulTime(auctionDate);
    const seoulAuctionEndDate = convertToSeoulTime(auctionEndDate);
    formData.append("auctionDate", seoulAuctionDate.toISOString());
    formData.append("auctionEndDate", seoulAuctionEndDate.toISOString());

    for (let i = 0; i < images.length; i++) {
      formData.append("image", images[i]);
    }

    try {
      console.log(auctionData.auctionNo);
      const response = await updatePost(auctionData.auctionNo, formData);
      if (response.status === 200) {
        setIsModalOpen(true);
      } else {
        console.error("게시물 업로드 중 오류발생.");
      }
    } catch (error) {
      console.error("게시물 업로드 중 오류가 발생했습니다.", error);
    }
  };

  // 이미지 업로드 시 호출되는 함수
  const onUploadImage = (e) => {
    const selectedImages = e.target.files;
    const newImages = [...images];
    for (let i = 0; i < selectedImages.length; i++) {
      newImages.push(selectedImages[i]);
    }

    const imagePreviewsArray = Array.from(selectedImages).map((image) =>
      URL.createObjectURL(image)
    );

    setPost({
      ...post,
      images: newImages,
    });
    setImagePreviews([...imagePreviews, ...imagePreviewsArray]);
  };

  // 이미지 삭제 시 호출되는 함수
  const removeImage = (index) => {
    const newImagePreviews = [...imagePreviews];
    newImagePreviews.splice(index, 1);

    const newImages = [...images];
    newImages.splice(index, 1);

    setPost({
      ...post,
      images: newImages,
    });
    setImagePreviews(newImagePreviews);
  };

  // 카테고리 정보를 가져오는 함수
  const categoryAPI = async () => {
    const result = await getCategories();
    setCategories(result.data);
  };

  // 카테고리 선택 시 호출되는 함수
  const onChangeCategory = (e) => {
    setPost({
      ...post,
      select: e.currentTarget.value,
    });
  };

  // 페이지 로드 시 실행되는 효과
  useEffect(() => {
    categoryAPI();
    const minBidLimit = sMoney * 0.1;
    setPost({
      ...post,
      eMoney: minBidLimit,
    });
  }, [sMoney]);

  return (
    <Container>
      <h1>게시물 수정</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={title}
            placeholder="제목"
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={itemName}
            placeholder="상품명"
            onChange={(e) => setPost({ ...post, itemName: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            value={desc}
            placeholder="게시글 내용"
            onChange={(e) => setPost({ ...post, desc: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            value={sMoney}
            placeholder="경매시작가격(최대 입력값 1억원)"
            onChange={(e) => setPost({ ...post, sMoney: e.target.value })}
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
            onChange={() =>
              setPost({ ...post, isBuyNowChecked: !isBuyNowChecked })
            }
          />
        </Form.Group>
        {isBuyNowChecked && (
          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              value={gMoney}
              placeholder="즉시구매가"
              onChange={(e) => setPost({ ...post, gMoney: e.target.value })}
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
