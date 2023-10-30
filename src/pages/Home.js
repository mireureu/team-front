// import Carousel from 'react-bootstrap/Carousel';
// import images from '../src/components/1.png';
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getCategories } from "../api/connection";
import { getAuctionBoard, getHotList, getNewList } from "../api/auctionBoard";
import RecentPosts from "./RecentPosts"; // 최근 본 게시물 목록

// import { getAuctionBoard } from "./api/auctionBoard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWrench } from "@fortawesome/free-solid-svg-icons";

// import imgTest1 from "../img/가로tast.png";
import hot from "../components/hot.png";

const Main = styled.div`
  position: relative;
`;

const Centers = styled.div`
  /* display: grid; */
  max-width: 1295px;
  margin: 0 auto;
  height: 1200px;
  /* grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "g-left g-banner g-right"
    "g-left g-newitem g-right"
    "g-lower g-lower g-lower"; */
  gap: 20px;
`;

const Banner = styled.div`
  grid-area: g-banner;
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 184, 90);
  width: 100%;
  margin-bottom: 20px;
  /* margin: 0 auto; */
  img {
    width: auto;
    height: 180px;
  }
`;

const Left = styled.div`
  grid-area: g-left;
  border: 1px solid black;
`;

const NewItem = styled.div`
  /* grid-area: g-newitem; */
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
`;

// const Right = styled.div`
//   /* grid-area: g-right; */
//   position: absolute;
//   top: 0;
//   right: 0;
//   width: 240px;
//   height: 700px;
//   border: 1px solid black;
//   margin-right: 25px;
// `;

const Lower = styled.div`
  grid-area: g-lower;
  height: 150px;
  border: 1px solid black;
`;

const News = styled.div`
  grid-area: g-newitem;
  /* border: 1px solid black; */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-content: center;
  gap: 20px;
  margin: 0 auto;
  max-width: 1000px;

  /* section { */
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

    .new-image {
      margin-top: 10px;
      margin-left: 10px;
      width: 180px;
      height: 180px;
      overflow: hidden;
      border-radius: 10px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .new-font {
      position: absolute;
      width: 80%;
      left: 10%;
      height: auto;
      text-align: center;
      bottom: 0;
      line-height: 1;

      h5 {
        background-color: rgba(217, 220, 253);
        border-radius: 10px;
      }

      p {
        background-color: rgba(172, 180, 246);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 5px;
        height: 30px;
        border: 1px solid black;
        border-radius: 10px;
        white-space: pre;

        &.p-time-short {
          background-color: rgba(255, 70, 70);
          color: white;
        }
      }
    }
  }

  .new-box:hover {
    transform: scale(1.5);
    transform-origin: center;
    z-index: 2;
  }
  /* } */
`;

const Modal = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr 50px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "itemTitle itemTitle itemTitle" 
    "itemImg itemImg itemBoard"
    "itemLower-left . itemLower-right";


  position: fixed;
  top: 50%;
  left: 50%;
  width: 800px;
  height: 600px;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  z-index: 3;
  border: 5px solid skyblue;
  border-radius: 20px;

  .itemTitle {
    grid-area: itemTitle;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .itemImg {
    grid-area: itemImg;
    margin: 10px;
    overflow: hidden;
    border: 2px solid skyblue;
    border-radius: 15px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .itemBoard {
    grid-area: itemBoard;
    margin-top: 20px;
    .times {
      text-align: center;
      
    }
    
    .p-time-short {
      background-color: rgba(255, 70, 70);
      color: white;
      text-align: center;
    }

    .values {
      text-align: right;
    }

    .attend {
      text-align: center;
    }
  }

  .itemBoard p {
    font-size: 20px;
    white-space: pre;
    border: 2px solid rgba(255, 205, 18);
    border-radius: 5px;
    margin-left: 15px;
    margin-right: 15px;
  }

  .itemLower-left {
    grid-area: itemLower-left;
    display: flex;
    align-items: center;
    right: 0;
    margin-left: 10px;

    .move-page {
      background: #3498db;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 10px; /* 곡면을 만들어주는 속성 */
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
      transition: transform 0.2s; /* 마우스 호버 시 애니메이션 */
    }
    .move-page:hover {
      transform: scale(1.1); /* 마우스 호버 시 버튼 확대 효과 */
    }
  }

  

  .itemLower-right {
    grid-area: itemLower-right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 20px;

    .close-button {
      background: #3498db;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 10px; /* 곡면을 만들어주는 속성 */
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
      transition: transform 0.2s; /* 마우스 호버 시 애니메이션 */
    }

    .close-button:hover {
      transform: scale(1.1); /* 마우스 호버 시 버튼 확대 효과 */
    }
  }

  

  h4 {
    text-align: center;
  }

  
`;

const Home = () => {
  // const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 클릭시미리보기

  const [andList, setAndList] = useState([]);

  const [recentList, setRecentList] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null); // 사용자가 클릭한 항목 정보를 저장

  // 남은 시간을 1초마다 갱신
  const calculateTimeDifference = (auctionEndDate) => {
    if (!auctionEndDate) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const endDate = new Date(auctionEndDate);
    const currentDate = new Date();
    const timeDifference = endDate - currentDate;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    return {
      days: daysDifference,
      hours: hoursDifference % 24,
      minutes: minutesDifference % 60,
      seconds: secondsDifference % 60,
    };
  };

  const startTimer = () => {
    const timerId = setInterval(() => {
      // 1초마다 시간을 갱신
      setAndList((prevAndList) => {
        return prevAndList.map((ands) => {
          const timeDifference = calculateTimeDifference(ands.auctionEndDate);
          const newAnds = {
            ...ands,
            timeDifference,
          };
          return newAnds;
        });
      });
    }, 1000);

    // 컴포넌트 언마운트 시 타이머 해제
    return () => {
      clearInterval(timerId);
    };
  };

  const andListAPI = async () => {
    let clicks = "a";
    let result = null;

    if (clicks === "a") {
      result = await getHotList();
    } else if (clicks === "b") {
      result = await getNewList();
    }

    console.log(result.data);
    setAndList(result.data);
  };

  useEffect(() => {
    andListAPI();
    // categoryAPI();
    startTimer();
  }, []);

  // 미리보기 창 열기
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // 미리보기 창 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 해당 페이지로 이동
  const openPage = (auctionNo) => {
    // 페이지 이동을 위해 window.location.href를 사용
    window.location.href = `/auctionpost/${auctionNo}`;
  };

  // 쿠키로 최근 본 게시물 목록
  function addToRecentPosts(postId) {
    const recentPosts = JSON.parse(sessionStorage.getItem("recentPosts")) || [];
    recentPosts.push(postId);
    sessionStorage.setItem("recentPosts", JSON.stringify(recentPosts));
  }

  return (
    <Main className="div-container">
      <Centers>
        <Banner>
          {/* <h1>[ 주간 HOT 경매! ]</h1> */}
          <img src={hot}/>
          {/* <h1>[ 주간 New 경매! ]</h1> */}
        </Banner>

        <NewItem className="div-item">
          <News className="new-container">
            {andList.map((ands, index) => (
              <div
                key={ands.auctionNo}
                onClick={() => openModal(ands)}
                className="new-box"
              >
                <div className="new-image">
                  <img
                    src={"/upload/" + ands.auctionImg.split(",", 1)}
                    alt={ands.auctionTitle}
                  />
                </div>
                <div className="new-font">
                  <h5>{ands.auctionTitle}</h5>
                  <p className={((calculateTimeDifference(ands.auctionEndDate).hours < 8) && (calculateTimeDifference(ands.auctionEndDate).days === 0)) || (calculateTimeDifference(ands.auctionEndDate).hours < 0) ? "p-time-short" : ""}>
                    {calculateTimeDifference(ands.auctionEndDate).days > 0 ? (`남은 시간: ${calculateTimeDifference(ands.auctionEndDate).days}일`) : calculateTimeDifference(ands.auctionEndDate).hours >= 0 ? (`남은 시간: ${(calculateTimeDifference(ands.auctionEndDate).hours < 10 ? '0' : '')}${calculateTimeDifference(ands.auctionEndDate).hours}:${(calculateTimeDifference(ands.auctionEndDate).minutes < 10 ? '0' : '')}${calculateTimeDifference(ands.auctionEndDate).minutes}:${(calculateTimeDifference(ands.auctionEndDate).seconds < 10 ? '0' : '')}${calculateTimeDifference(ands.auctionEndDate).seconds}`) : ("경매 마감")}
                  </p>
                  <p>
                    현재가 : <span>{ands.currentPrice}</span>원
                  </p>
                </div>
              </div>
            ))}
          </News>
        </NewItem>
        

        {isModalOpen && selectedItem && (
          <Modal>
            <div className="itemTitle">
              <h2>{selectedItem.auctionTitle}</h2>
            </div>
            <div className="itemImg">
              <img src={"/upload/" + selectedItem.auctionImg.split(",", 1)} alt={selectedItem.auctionTitle} />
            </div>
            <div className="itemBoard">
              <h4>남은 시간</h4>
              <p className={((calculateTimeDifference(selectedItem.auctionEndDate).hours < 8) && (calculateTimeDifference(selectedItem.auctionEndDate).days === 0)) || (calculateTimeDifference(selectedItem.auctionEndDate).hours < 0) ? "p-time-short" : "times"}>
                {calculateTimeDifference(selectedItem.auctionEndDate).days > 0 ? (`${calculateTimeDifference(selectedItem.auctionEndDate).days}일`) : calculateTimeDifference(selectedItem.auctionEndDate).hours >= 0 ? (`${(calculateTimeDifference(selectedItem.auctionEndDate).hours < 10 ? '0' : '')}${calculateTimeDifference(selectedItem.auctionEndDate).hours}:${(calculateTimeDifference(selectedItem.auctionEndDate).minutes < 10 ? '0' : '')}${calculateTimeDifference(selectedItem.auctionEndDate).minutes}:${(calculateTimeDifference(selectedItem.auctionEndDate).seconds < 10 ? '0' : '')}${calculateTimeDifference(selectedItem.auctionEndDate).seconds}`) : ("경매 마감")}
              </p>
              <h4>시작가</h4>
              <p className="values">
                <span>{selectedItem.auctionSMoney}</span>원
              </p>
              <h4>현재가</h4>
              <p className="values">
                <span>{selectedItem.currentPrice}</span>원
              </p>
              <h4>입찰 참여 인원</h4>
              <p className="attend">
                <span>{selectedItem.auctionAttendNo}</span>
              </p>
            </div>
            <div className="itemLower-left">
              <button className="move-page" onClick={() => openPage(selectedItem.auctionNo)}>상세 페이지</button>
            </div>
            <div className="itemLower-right">
              <button className="close-button" onClick={closeModal}>닫기</button>
            </div>
            
            
          </Modal>
        )}
      </Centers>
      
      {/* <Right>

      </Right> */}
      
    </Main>


  );
};

export default Home;
