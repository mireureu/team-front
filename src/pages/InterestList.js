import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getMyInterestList, deleteCheckList } from "../api/user";


const Main = styled.div`
    position: relative;

    .h2 {
        margin-left: 100px;
        margin: 40px;
    }
`;

const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;

    .checkBox {
        margin: 8px;
        position: absolute;
        width: 20px;
        height: 20px;
        z-index: 1;
    }
`;

const MyPage = styled.div`
  max-width: 1295px;
  margin: 0 auto;
  height: 1200px;

    .allMenu{
        margin: 0 auto;
        max-width: 1200px;
        border: 1px solid black;
        border-radius: 15px;
        background-color: skyblue;
        margin-bottom: 20px;
    
    .checks {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 40px;
        margin: 15px;
        border: 2px solid gray;
        border-radius: 10px;
        background-color: rgba(234, 234, 234);

        .checkBox {
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }
    }
  }

    .container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        justify-content: center;
        gap: 20px;
        margin: 0 auto;
        max-width: 1200px;
        

        .new-box {
            width: 200px;
            height: 300px;
            background-color: rgba(234, 234, 234);
            border: 1px solid black;
            justify-self: center;
            border-radius: 5%;
            transition: 0.5s;
            position: relative;
            cursor: pointer; /* 커서를 포인터로 변경 */
            /* background-image: none; */

            .new-image {
                margin-top: 30px;
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
                    max-width: 100%; /* 원하는 최대 너비 설정 (예: 200px) */
                    overflow: hidden; /* 넘치는 텍스트를 감출 수 있도록 설정 */
                    white-space: nowrap; /* 텍스트가 한 줄에 나타나도록 설정 */
                    text-overflow: ellipsis; /* 텍스트가 너비 제한을 넘어갈 때 생략 부호(...) 표시 */
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
    }
`;



const InterestList = () => {

    const [andList, setAndList] = useState([]);

    const [checkItems, setCheckItems] = useState([]);
    const [checkedAuctionNos, setCheckedAutionNos] = useState([]);

    const myListAPI = async () => {
        try {
            const result = await getMyInterestList();
            setAndList(result);
            const initialCheckStates = new Array(result.length).fill(false);
            setCheckItems(initialCheckStates); // Set initial check states
        } catch (error) {
            // Error handling
            console.error('에러 발생:', error);
        }
    };


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
            // 남은 시간만 업데이트
            setAndList((prevAndList) => {
                return prevAndList.map((ands) => {
                    const timeDifference = calculateTimeDifference(ands.auctionEndDate);
                    return {
                        ...ands,
                        timeDifference,
                    };
                });
            });
        }, 1000);

        // 컴포넌트 언마운트 시 타이머 해제
        return () => {
            clearInterval(timerId);
        };
    };
    

    // 해당 페이지로 이동
    const openPage = (auctionNo) => {
        // 페이지 이동을 위해 window.location.href를 사용
        window.location.href = `/auctionpost/${auctionNo}`;
    };

    // 

    const handleCheckboxChange = (index) => {

        const newCheckItems = [...checkItems];
        newCheckItems[index] = !newCheckItems[index];

        setCheckItems(newCheckItems);

        setCheckedAutionNos(andList.filter((_, i) => newCheckItems[i]).map((item) => item.interestNo));
    };


    const deleteCheck = () => {
        
    }

    const allDeleteButton = async () => {
        const formData = new FormData();
        formData.append("list", JSON.stringify(checkedAuctionNos));
      
        await deleteCheckList(formData);
    }

    useEffect(() => {
        myListAPI();
        startTimer();
    }, []);


    return (
        <Main>
            <MyPage>
                <div>
                    <h2 style={{ marginLeft: "60px", margin: "40px" }}>관심등록 List</h2>
                </div>
                <div className="allMenu">
                    <label className="checks">
                        <input 
                            className="checkBox" 
                            type="checkbox" 
                            onChange={(e) => {
                                setCheckItems(new Array(andList.length).fill(e.target.checked));
                            }}
                            checked={checkItems.every((isChecked) => isChecked)}
                        />
                         전체 선택
                    </label>
                    <div>
                        <button onClick={allDeleteButton}>
                            등록 해제
                        </button>
                    </div>
                </div>
                <Container>
                    <div className="container">
                        {andList.map((myList, index) => (
                            <div 
                                key={myList.auction.auctionNo}
                                className="new-box"
                            >
                                <input 
                                    className="checkBox" 
                                    type="checkbox" 
                                    onChange={() => handleCheckboxChange(index)}
                                    checked={checkItems[index]}
                                />

                                <div className="new-image">
                                    <img
                                        src={"/upload/" + myList.auction.auctionImg.split(",", 1)}
                                        alt={myList.auction.auctionTitle}
                                        onClick={() => openPage(myList.auction.auctionNo)}
                                    />
                                </div>
                                <div className="new-font">
                                    <h5>{myList.auction.auctionTitle}</h5>
                                    <p className={((calculateTimeDifference(myList.auction.auctionEndDate).hours < 8) && (calculateTimeDifference(myList.auction.auctionEndDate).days === 0)) || (calculateTimeDifference(myList.auction.auctionEndDate).hours < 0) ? "p-time-short" : ""}>
                                        {calculateTimeDifference(myList.auction.auctionEndDate).days > 0 ? (`남은 시간: ${calculateTimeDifference(myList.auction.auctionEndDate).days}일`) : calculateTimeDifference(myList.auction.auctionEndDate).hours >= 0 ? (`남은 시간: ${(calculateTimeDifference(myList.auction.auctionEndDate).hours < 10 ? '0' : '')}${calculateTimeDifference(myList.auction.auctionEndDate).hours}:${(calculateTimeDifference(myList.auction.auctionEndDate).minutes < 10 ? '0' : '')}${calculateTimeDifference(myList.auction.auctionEndDate).minutes}:${(calculateTimeDifference(myList.auction.auctionEndDate).seconds < 10 ? '0' : '')}${calculateTimeDifference(myList.auction.auctionEndDate).seconds}`) : ("경매 마감")}
                                    </p>
                                    <p>
                                        현재가 : <span>{myList.auction.currentPrice}</span>원
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </MyPage>
        </Main>
        
    );
};

export default InterestList;