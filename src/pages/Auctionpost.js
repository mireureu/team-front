import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost, updateCurrentPrice } from "../api/addpost";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { getComments, getreComments } from "../api/auctionBoard";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addComment, updateComment, deleteComment } from "../store/commentSlice";
import { Margin } from "@mui/icons-material";


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
  const { auctionNo } = useParams();
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

  const handleEditComment = (comment) => {
    console.log(comment);
    setIsEditing(true);
    setEditingComment(comment.content);  
    setSelectedComment(comment); 
    console.log(editingComment);
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
      console.log("★");
      console.log(response.data);
      console.log("★");
    } catch (error) {
      console.error("대댓글 데이터를 불러오는 중 오류 발생:", error);
    } 
  };

  const onUpdate = (e) => {
    if (!selectedComment) {
      console.log("온업데이트작동확인");
      return;
    }
  
    if (editingComment.trim() === "") {
      alert("수정할 내용을 입력해주세요.");
      return;
    }
  
    const commentNo = selectedComment.commentNo;
    const parrentNo = selectedComment.parent;
  

    dispatch(
      updateComment({
        commentNo: commentNo,
        content: editingComment,        
        auctionNo: auctionNo,
        commentParent: parrentNo
      })
      );
      console.log(parrentNo+"부모번호체크");
      
      
  
    // 수정 후 상태 초기화
    setIsEditing(false);
    setEditingComment("");
    setSelectedComment(null);
    
  };
  

  const handleLoadRecomments = (comment) => {
    setSelectedComment(comment);
    loadRecomments(comment.commentNo, comment.auctionNo);
    console.log(comment);
  };
  

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

  const handlePrevImage = () => {
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

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % auctionPost.auctionImg.split(",").length
    );
  };

  function formatSeoulTime(dateString) {
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
      updateCurrentPrice(auctionPost.auctionNo, newCurrentPrice)
        .then((updatedPost) => {
          setAuctionPost(updatedPost);
        })
        .catch((error) => {
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
                      <Button variant="primary" onClick={handleImmediatePurchase}>
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
        <Button variant="outline-danger" size="sm" 
        onClick={() => handleDeleteComment(comment)}>
          삭제
        </Button>
      )}
      {comment.member.id === savedUser.id && (
        <Button id="focus2" variant="outline-primary" size="sm" 
        onClick={() => handleEditComment(comment)}>
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
                  <Button variant="outline-danger" size="sm" 
                  onClick={() => handleDeleteComment(recomment)}>
                    삭제
                  </Button>
                )}
                {recomment.member.id === savedUser.id && (
                  
                  <Button variant="outline-primary" size="sm" 
                  onClick={() => handleEditComment(recomment)}>
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
              id ="커서테스트"
            />
          </Form.Group>

              

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outline-danger" onClick={handleCancelEdit} size="sm">
              수정 취소
            </Button>

            <Button
            variant="primary"
            type="submit"
            size="sm"
            onClick={() => {
                onUpdate(selectedComment.commentNo, editingComment, selectedComment.auctionNo, selectedComment.parent)
                console.log(selectedComment.commentNo, editingComment, selectedComment.member.id, selectedComment.parent + "★★★★★★★★★★")
            }}
            // disabled={editingComment.trim() === ""}
          >
            수정 완료
          </Button>
{/* 
          <Form.Group>
            <Form.Label>온업데이트체크</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="댓글을 수정하세요"
              value={editingComment}
              onChange={(e) => {
                if (selectedComment) {
                  console.log(selectedComment.commentNo, e.target.value, selectedComment.member.id);
                } else {
                  console.log("selectedComment is null");
                  console.log(e.target.value);
                  console.log(selectedComment.commentNo);
                }
              }}
              style={{ resize: "none" }}
            />
          </Form.Group> */}


          
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
);
};

export default Auctionpost;
