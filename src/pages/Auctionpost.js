import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPost,
  updateCurrentPrice,
  getCountAuction,
  deletePost,
} from "../api/addpost";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { getComments, getreComments } from "../api/auctionBoard";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addComment, updateComment, deleteComment } from "../store/commentSlice";
import { asyncAuctionInfo } from "../store/auctionSlice";
import Cookies from "js-cookie";
import { Modal } from "react-bootstrap"; // 모달 컴포넌트 import 추가
import { getInterest, addMyInterest, deleteCheck } from "../api/user"; // 관심등록 & 해제


const Main = styled.div`

  .checkButton {
    width: 150px;
    height: 40px;
  }

  .checkOn {
    background-color: red;
    color: wheat;

  }
  .checkOff {

  }
`;




function convertToSeoulTime(utcDateString) {
  const utcDate = new Date(utcDateString);
  const seoulOffset = 9 * 60;
  const seoulTime = new Date(utcDate.getTime() + seoulOffset * 60000);
  return seoulTime;
}

const Auctionpost = () => {
  const dispatch = useDispatch();
  const [auctionPost, setAuctionPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newCurrentPrice, setNewCurrentPrice] = useState(0);
  const [addComments, setAddComments] = useState("");
  const { auctionNo, interestNo } = useParams();
  const [comments, setComments] = useState([]);
  const [recomments, setRecomments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingComment, setEditingComment] = useState([]);
  const save = localStorage.getItem("user");
  const savedUser = JSON.parse(save);

  const handleDeleteComment = (comment) => {
    dispatch(deleteComment(comment.commentNo));
    window.location.reload();
  };
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sellerAuctionCount, setSellerAuctionCount] = useState(0);
  const navigate = useNavigate();

  const [interestData, setInterestData] = useState(null);
  const [isInterest, setInterestToggle] = useState(false);

  // 데이터 가져오기
  useEffect(() => {
    const fetchAuctionPost = async () => {
      try {

        const storedInterest = localStorage.getItem('isInterest');
        if (storedInterest !== null) {
          setInterestToggle(storedInterest === 'true');
        }

        const response = await getPost(auctionNo);

        setAuctionPost(response.data);

        if (response.data) {
          Cookies.set(`auctionPost${auctionNo}`, JSON.stringify(response.data));
        }
        dispatch(asyncAuctionInfo(auctionNo));

        // 판매자의 등록 게시물 수 가져오기
        const sellerId = response.data?.memberId?.id;
        if (sellerId) {
          const sellerCountResponse = await getCountAuction(sellerId);
          setSellerAuctionCount(sellerCountResponse.data);
        }
      } catch (error) {
        console.error("게시글 정보를 불러오는 중 오류 발생:", error);
      }
    };

    if (auctionNo) {
      fetchAuctionPost();
    }
  }, [auctionNo]);

  const handleEditComment = (comment) => {
    setIsEditing(true);
    setEditingComment(comment.content);
    setSelectedComment(comment);
    const editfocus = document.getElementById('focus2');
    editfocus.focus();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingComment("");
    setSelectedComment(null);
  };

  const loadRecomments = async (commentNo, auctionNo) => {
    try {
      const response = await getreComments(commentNo, auctionNo);
      setRecomments(response.data);
    } catch (error) {
      console.error("대댓글 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  const onUpdate = () => {
    if (!selectedComment) {
      return;
    }

    if (editingComment.trim() === "") {
      alert("수정할 내용을 입력해주세요.");
      return;
    }

    const commentNo = selectedComment.commentNo;
    const parentNo = selectedComment.parent;

    dispatch(
      updateComment({
        commentNo: commentNo,
        content: editingComment,
        auctionNo: auctionNo,
        commentParent: parentNo,
      })
    );

    // 수정 후 상태 초기화
    setIsEditing(false);
    setEditingComment("");
    setSelectedComment(null);
  };

  const handleLoadRecomments = (comment) => {
    setSelectedComment(comment);
    loadRecomments(comment.commentNo, comment.auctionNo);
  };

  // 이미지 보여주기
  useEffect(() => {
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

  const clickAddComment = () => {
    if (addComments.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    if (selectedComment) {
      const data = {
        content: addComments,
        auctionNo: auctionNo,
        commentParent: selectedComment.commentNo,
      };
      dispatch(addComment(data));
    } else {
      const data = { content: addComments, auctionNo: auctionNo };
      dispatch(addComment(data));
    }

    setAddComments("");
  };

  useEffect(() => {
    const loadComments = async () => {
      try {
        if (auctionNo) {
          const response = await getComments(auctionNo);
          setComments(response.data);
        }
      } catch (error) {
        console.error("댓글 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    if (auctionPost) {
      loadComments();
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

  const handlePriceChangeSuccess = () => {
    setShowSuccessModal(true);
  };

  const handlePriceChange = () => {
    if (newCurrentPrice > auctionPost.currentPrice) {
      updateCurrentPrice(auctionPost.auctionNo, newCurrentPrice)
        .then((updatedPost) => {
          setAuctionPost(updatedPost);
        })
        .catch((error) => {
          console.error("현재 가격 업데이트 실패:", error);
        });
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      try {
        const deletedAuction = await deletePost(auctionNo);
        if (deletedAuction) {
          alert("게시물이 삭제되었습니다.");
          navigate("/Auctiondetail");
        } else {
          alert("게시물 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("게시물 삭제 중 오류 발생:", error);
        alert("게시물 삭제에 실패했습니다.");
      }
    }
  };


  // interest 정보 가져오기
  const getInterestData = async (interestNo) => {
    try {
      const response = await getInterest(interestNo);
      setInterestData(response.data);
    } catch (error) {
      // 에러 처리
      console.error('에러 발생:', error);
    }
  }

  // 관심등록 토글 버튼
  const interestToggle = () => {
    setInterestToggle(isInterest => {
      const updatedInterest = !isInterest;
  
      // 로컬 스토리지에 관심 등록 정보 저장
      localStorage.setItem('isInterest', updatedInterest.toString());
  
      return updatedInterest;
    });
  }

  // 관심등록 on/off 데이터 전송
  const interestSet = async (auctionNo) => {
    
    const num = await auctionNo;

    if(isInterest) {
      deleteCheck(num);
    } else {
      addMyInterest(num);
    }
  }

  
  useEffect(() => {
    const storedInterest = localStorage.getItem('isInterest');
    if (storedInterest !== null) {
      setInterestToggle(storedInterest === 'true');
    }
  }, []);


  return (
    <Main>
      <Container>
      {auctionPost ? (
        <Card>
          <Card.Body>
            <button 
              className={ `checkButton ${isInterest ? 'checkOn' : 'checkOff'}`} 
              onClick={() => { interestToggle(); interestSet(auctionPost.auctionNo);
            }}>
            {isInterest ? '관심등록해제' : '관심등록'}
            </button>
            <h2 className="text-center border-bottom pb-3">
              {auctionPost.auctionTitle}
            </h2>
            <Row className="justify-content-center">
              <Col xs={12} md={6} className="border-right">
                <img
                  src={"/upload/" + auctionPost.auctionImg.split(",")[currentImageIndex]}
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
                <p>경매 종료일: {formatSeoulTime(auctionPost.auctionEndDate)}</p>
                <Row className="border-top justify-content-center">
                  <p>판매자 정보: {auctionPost.memberId.id}</p>
                  <p>등록건수: {sellerAuctionCount}</p>
                  <p>회원 등급: {auctionPost.memberId.authority}</p>
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
                    style={{ width: "300px" }}
                    value={
                      auctionPost.currentNum === 0
                        ? auctionPost.auctionSMoney + auctionPost.auctionEMoney
                        : auctionPost.currentPrice + auctionPost.auctionEMoney
                    }
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
                        disabled={
                          auctionPost.currentPrice >= auctionPost.auctionGMoney
                        }
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
      
      <div>
  {comments.map((comment) => (
    <div key={comment.commentNo}>
      <div className="comment" key={comment.commentNo}>
        <span className="author" style={{ fontWeight: 'bold', fontSize: '14.5px' }}>{comment.member.nick} </span>
        <span className="content">{comment.content}</span>
        {comment.member.id === savedUser.id && (
          <Button variant="outline-danger" size="sm" onClick={() => handleDeleteComment(comment)}>
            삭제
          </Button>
        )}
        {comment.member.id === savedUser.id && (
          <Button id="focus2" variant="outline-primary" size="sm" onClick={() => handleEditComment(comment)}>
            수정
          </Button>
        )}
        <hr></hr>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => handleLoadRecomments(comment)}
        >
          대댓글 불러오기
        </Button>
      </div>
      {selectedComment?.commentNo === comment.commentNo && (
        <div style={{ marginLeft: '5%' }}>
          {recomments.map((recomment) => (
            <div className="recomment" key={recomment.commentNo}>
              <div className="comment">
                <div style={{ marginTop: '10px' }}>
                  <span className="author" style={{ fontWeight: 'bold', fontSize: '14.5px' }}>{recomment.member.nick}</span>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <span className="content">{recomment.content}</span>
                  {recomment.member.id === savedUser.id && (
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteComment(recomment)}>
                      삭제
                    </Button>
                  )}
                  {recomment.member.id === savedUser.id && (
                    <Button variant="outline-primary" size="sm" onClick={() => handleEditComment(recomment)}>
                      수정
                    </Button>
                  )}
                </div>
                <hr></hr>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  ))}
</div>
<Form onSubmit={clickAddComment}>
  {isEditing ? (
    <div className="mt-3">
      <Form.Group>
        <Form.Label><h1>댓글 내용 수정</h1></Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="댓글을 수정하세요"
          value={editingComment}
          onChange={(e) => {
            console.log(e.target.value); // 이 부분에 console.log를 추가
            setEditingComment(e.target.value);
          }}
          style={{ resize: "none" }}
          id="커서테스트"
        />
      </Form.Group>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outline-danger" onClick={handleCancelEdit} size="sm">
          수정 취소
        </Button>
        <Button variant="danger" onClick={handleDeletePost}>
          게시글 삭제
        </Button>
        <Button variant="primary" onClick={() => navigate("/update")}>
          게시글 수정
        </Button>
        <style>
          {`
            .item-desc {
              border: 1px solid #ccc; /* 필요에 따라 테두리 스타일 조정 가능 */
              padding: 10px; /* 간격을 위한 패딩 추가 가능 */
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
              type="submit"
              size="sm"
              onClick={() => {
                onUpdate(selectedComment.commentNo, editingComment, selectedComment.auctionNo, selectedComment.parent)
                console.log(selectedComment.commentNo, editingComment, selectedComment.member.id, selectedComment.parent + "★★★★★★★★★★")
              }}
            >
              수정 완료
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  ) : selectedComment ? (
    <div className="mt-3">
      <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{selectedComment.member.nick}님의 댓글에 대댓글 작성</span>
      <Form.Group>
        <Form.Label>대댓글 내용</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="대댓글을 입력하세요"
          onChange={(e) => setAddComments(e.target.value)}
          value={addComments}
          style={{ resize: "none" }}
        />
      </Form.Group>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outline-danger" onClick={handleCancelEdit} size="sm">
          작성 취소
        </Button>
        <Button
          variant="outline-danger"
          type="submit"
          size="sm"
          disabled={addComments.trim() === ""}
        >
          대댓글 작성
        </Button>
      </div>
    </div>
  ) : (
    <div className="mt-3">
      <span style={{ fontSize: '40px' }}>댓글 작성</span>
      <Form.Group>
        <Form.Label>댓글 내용</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="댓글을 입력하세요"
          onChange={(e) => setAddComments(e.target.value)}
          value={addComments}
          style={{ resize: "none" }}
        />
      </Form.Group>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outline-danger"
          type="submit"
          size="sm"
          disabled={addComments.trim() === ""}
        >
          댓글 작성
        </Button>
      </div>
    </div>
  )}
</Form>
<style>
  {`
    .item-desc {
      border: 1px solid #ccc;
      padding: 10px;
    }
  `}
</style>
  </Container>
    </Main>
    
);
};

export default Auctionpost;
