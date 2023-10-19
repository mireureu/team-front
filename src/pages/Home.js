// import Carousel from 'react-bootstrap/Carousel';
// import images from '../src/components/1.png';
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getCategories } from "../api/connection";
import { getAuctionBoard, getHotList, getNewList } from "../api/auctionBoard";
import { async } from "q";
// import { getAuctionBoard } from "./api/auctionBoard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWrench } from "@fortawesome/free-solid-svg-icons";

// import imgTest1 from "../img/가로tast.png";
// import imgTest2 from "../img/세로tast.png";

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

  p {
    white-space: pre;
    border: 1px solid black;
    border-radius: 5px;
  }

  .flex-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  .flex-row .times, .flex-row .values {
    margin: 0;
  }

  .flex-row .times::after {
    content: "";
    margin-right: 10px;
  }

  .clows-button, .move-page {
    position: absolute;
    right: 20px;
  }

  .clows-button .move-page::after{
    content: "";
    margin-right: 10px;
  }
`;


const Home=()=> {
  // const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 클릭시 미리보기
  // const [timeRemaining, setTimeRemaining] = useState([]);
  
  const [timeRemaining, setTimeRemaining] = useState(''); // 남은 시간 표시

  // const [isShortTime, setIsShortTime] = useState(false);

  const [andList, setAndList] = useState([]);

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

    if(clicks === "a"){
      result = await getHotList();
    } else if (clicks === "b"){
      result = await getNewList();
    }

    console.log(result.data);
    setAndList(result.data);
  }
  
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

  // 해당 페이지로 이동 = 연결해야함 아직 연결 안함
  const openPage = () => {
    setIsModalOpen(false);
  };

  return (
    <Main className='div-container'>

      <Left className='div-item'>

      </Left>
      
      <Banner>
        <h1>[ 주간 핫! 베스트 상품 ]</h1>
        {/* <h1>[ 주간 New 경매! ]</h1> */}
      </Banner>

      <NewItem className='div-item'>
        <News className='new-container'>
          {andList.map((ands, index) => (
            <div onClick={() => openModal(ands)} className='new-box'>
              <div className='new-image'>
                <img src={"upload/" + ands.auctionImg} alt={ands.auctionTitle} />
              </div>
              <div className='new-font'>
                <h5>{ands.auctionTitle}</h5>
                  <p className={(calculateTimeDifference(ands.auctionEndDate).hours < 8) ? "p-time-short" : ""}>
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

      <Right className='div-item'>

      </Right>

      <Lower className="div-item">

      </Lower>

      {isModalOpen && selectedItem &&  (
        <Modal>
            <div className="content">
              <h2>{selectedItem.auctionTitle}</h2>
              <div className="flex-row">
                <p className="times">
                  {calculateTimeDifference(selectedItem.auctionEndDate).days > 0 ? (`남은 시간: ${calculateTimeDifference(selectedItem.auctionEndDate).days}일`) : calculateTimeDifference(selectedItem.auctionEndDate).hours >= 0 ? (`남은 시간: ${(calculateTimeDifference(selectedItem.auctionEndDate).hours < 10 ? '0' : '')}${calculateTimeDifference(selectedItem.auctionEndDate).hours}:${(calculateTimeDifference(selectedItem.auctionEndDate).minutes < 10 ? '0' : '')}${calculateTimeDifference(selectedItem.auctionEndDate).minutes}:${(calculateTimeDifference(selectedItem.auctionEndDate).seconds < 10 ? '0' : '')}${calculateTimeDifference(selectedItem.auctionEndDate).seconds}`) : ("경매 마감")}
                </p>
                <p className="values">
                  현재가 : <span>{selectedItem.currentPrice}</span>원
                </p>
              </div>
            </div>
          <button className="move-page" onClick={openPage}>상세 페이지로</button>
          <button className="close-button" onClick={closeModal}>닫기</button>
        </Modal>
      )}
    </Main>
  );
}

export default Home;