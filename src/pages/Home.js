import styled from "styled-components";
import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import images from "../src/components/1.png";
import styled from "styled-components";
// import { getAuctionBoard } from "./api/auctionBoard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWrench } from "@fortawesome/free-solid-svg-icons";

const Main = styled.div`
  display: grid;
  margin: 30px;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-areas:
    "g-left g-banner g-right"
    "g-left g-newitem g-right"
    "g-lower g-lower g-lower";
  gap: 20px;
`;

const Banner = styled.div`
  grid-area: g-banner;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 217, 250);
  /* width: 80%; */
  height: 150px;
  /* margin: 0 auto; */
`;

const Left = styled.div`
  grid-area: g-left;
  border: 1px solid black;
`;

const NewItem = styled.div`
  grid-area: g-newitem;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  grid-area: g-right;
  border: 1px solid black;
`;

const Lower = styled.div`
  grid-area: g-lower;
  height: 150px;
  border: 1px solid black;
`;

const News = styled.div`
  /* border: 1px solid black; */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-content: center;
  gap: 20px;
  margin: 0 auto;
  max-width: 1000px;

  .new-box {
    width: 200px;
    height: 250px;
    background-color: rgba(234, 234, 234);
    border: 1px solid black;
    justify-self: center;
    border-radius: 5%;
    transition: 0.5s;
    position: relative;
    z-index: 1;
    cursor: pointer; /* 커서를 포인터로 변경 */
    /* background-image: none; */

    .new-font {
      position: absolute;
      width: 80%;
      left: 10%;
      height: auto;
      text-align: center;
      bottom: 0;
      line-height: 1;

      p {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 5px;
        height: 30px;
        border: 1px solid black;
        border-radius: 10px;
      }
    }
  }

  .new-box:hover {
    transform: scale(1.5);

    transform-origin: center;
    z-index: 2;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 800px;
  height: 600px;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  z-index: 3;
  border: 1px solid black;

  h2 {
    display: flex;
    justify-content: center;
  }

  .flex-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  .flex-row .times,
  .flex-row .values {
    margin: 0;
  }

  .flex-row .times::after {
    content: "";
    margin-right: 10px;
  }

  .clows-button,
  .move-page {
    position: absolute;
    right: 20px;
  }

  .clows-button .move-page::after {
    content: "";
    margin-right: 10px;
  }
`;

const Home = () => {
  // const auctionBoardAPI = async () => {
  //   const result = await getAuctionBoard();
  // }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPage = () => {
    setIsModalOpen(false);
  };

  return (
    <Main className="div-container">
      <Left className="div-item"></Left>

      <Banner>
        <h1>[ 주간 핫! 베스트 상품 ]</h1>
        {/* <h1>[ 주간 New 경매! ]</h1> */}
      </Banner>

      <NewItem className="div-item">
        <News className="new-container">
          <div onClick={openModal} className="new-box">
            <div className="new-font">
              <h5>게시글 제목</h5>
              <p>
                마감시간 :<span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
          <div onClick={openModal} className="new-box">
            <div className="new-font">
              <h5>게시글 제목</h5>
              <p>
                마감시간 :<span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
          <div onClick={openModal} className="new-box">
            <div className="new-font">
              <h5>게시글 제목</h5>
              <p>
                마감시간 :<span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
          <div onClick={openModal} className="new-box">
            <div className="new-font">
              <h5>게시글 제목</h5>
              <p>
                마감시간 :<span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
          <div onClick={openModal} className="new-box">
            <div className="new-font">
              <h5>게시글 제목</h5>
              <p>
                마감시간 :<span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
          <div onClick={openModal} className="new-box">
            <div className="new-font">
              <h5>게시글 제목</h5>
              <p>
                마감시간 :<span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
          <div onClick={openModal} className="new-box">
            <div className="new-font">
              <h5>게시글 제목</h5>
              <p>
                마감시간 :<span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
          <div onClick={openModal} className="new-box">
            <div className="new-font">
              <h5>게시글 제목</h5>
              <p>
                마감시간 : <span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
        </News>
      </NewItem>

      <Right className="div-item"></Right>

      <Lower className="div-item"></Lower>

      {isModalOpen && (
        <Modal>
          <div className="content">
            <h2>상품 이름</h2>
            <div className="flex-row">
              <p className="times">
                마감시간 :<span>30:05:20</span>
              </p>
              <p className="values">
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
          <button className="move-page" onClick={openPage}>
            상세 페이지로
          </button>
          <button className="close-button" onClick={closeModal}>
            닫기
          </button>
        </Modal>
      )}
    </Main>
  );
};

export default Home;
