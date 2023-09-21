import React, { useState, useEffect } from "react";
import img1 from "../img/image1.jpg";
import img2 from "../img/image2.jpg";
import img3 from "../img/image3.jpg";
import img4 from "../img/image4.jpg";
import img5 from "../img/image5.jpg";

const Auctionpost1 = () => {
  const styles = {
    container: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr", // 두 개의 동일한 너비의 칸을 만듭니다.
      gap: "10px", // 각 그리드 아이템 사이에 간격을 추가합니다.
      backgroundColor: "#f8f9fa", // 배경색 추가
    },
    gridItem: {
      border: "1px solid #000", // 그리드 아이템에 경계선을 추가합니다.
      display: "flex", // 그리드 아이템 내부를 flex로 설정하여 내용을 중앙에 배치합니다.
      flexDirection: "column", // 이제 요소들은 세로로 배열됩니다.
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff", // 배경색 추가
      borderRadius: "8px", // 모서리 둥글게
    },
    largeGridItem: {
      gridColumn: "span 2", // 두 칼럼 너비를 차지하도록 설정합니다.
      border: "1px solid #000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff", // 배경색 추가
      borderRadius: "8px", // 모서리 둥글게
    },
    LastGridItem: {
      gridColumn: "span 2", // 두 칼럼 너비를 차지하도록 설정합니다.
      border: "1px solid #000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff", // 배경색 추가
      borderRadius: "8px", // 모서리 둥글게
    },
    innerContainer: {
      display: "flex",
      flexDirection: "column", // 컨테이너 내부의 아이템들이 컬럼 방향(세로)으로 배열되게 합니다.
      height: "100%", // 이 스타일이 적용된 컨테이너의 높이를 100%로 설정합니다.
      width: "100%",
    },
    innerItemTop: {
      flex: 1, // 이 스타일이 적용된 아이템과 동일한 레벨의 다른 flex 아이템들과 같은 양의 공간을 차지하게 합니다.
      border: "1px solid #000", // 아이템에 경계선을 추가합니다.
      display: "flex", // 아이템 내부를 flex로 설정하여 내용을 중앙에 배치합니다.
      flexDirection: "column", // 아이템들을 세로로 배열합니다.
      justifyContent: "center",
      alignItems: "center",
      padding: "10px", // 안쪽 여백을 추가하여 내용과 경계선 사이에 간격을 만듭니다.
    },
    detailsRow: {
      display: "flex",
      justifyContent: "space-around", // 아이템들 사이에 동일한 간격을 만듭니다.
      width: "100%", // 컨테이너의 전체 너비를 차지하게 합니다.
      padding: "10px 0", // 위아래 패딩 추가
    },
    innerItemBottom: {
      flex: 1, // 이 스타일이 적용된 아이템과 동일한 레벨의 다른 flex 아이템들과 같은 양의 공간을 차지하게 합니다.
      border: "1px solid #000", // 아이템에 경계선을 추가합니다.
      display: "flex", // 아이템 내부를 flex로 설정하여 내용을 중앙에 배치합니다.
      flexDirection: "column", // 이 부분을 column으로 변경하여 아이템들이 수직으로 배열되게 합니다
      justifyContent: "center",
      alignItems: "center",
      padding: "10px", // 안쪽 패딩 추가
    },
    buttonContainer: {
      display: "flex", // 버튼들이 한 줄로 나열되도록 flex를 사용
      justifyContent: "space-around", // 버튼들 사이에 공간을 고르게 배분
    },
    button: {
      margin: "5px", // 버튼 주위에 마진 추가
      padding: "10px 20px", // 버튼 안에 패딩 추가
      border: "none",
      borderRadius: "4px", // 버튼 모서리 둥글게
      backgroundColor: "#6c757d", // 버튼 배경색
      color: "#fff", // 버튼 텍스트 색상
      cursor: "pointer", // 마우스 커서 변경
      fontSize: "16px", // 폰트 크기 설정
      ":hover": {
        backgroundColor: "#5a6268", // 호버 효과 추가
      },
    },
    button2: {
      marginTop: "10px", // 버튼 위쪽에 여백 추가
    },
    prevButton: {
      marginRight: "20px", // "이전" 버튼 오른쪽에 마진 추가
    },
    input: {
      margin: "0 10px 10px 0", // margin을 추가하여 input과 버튼 사이에 공간을 만듭니다
      padding: "10px", // padding 추가
      border: "1px solid #ccc", // border 스타일 설정
      borderRadius: "4px", // 모서리 둥글게
    },
    detailItem: {
      backgroundColor: "gray", // 배경색을 gray로 지정
      padding: "10px", // 패딩 추가
      margin: "5px 0", // 마진 추가
      borderRadius: "4px", // 모서리 둥글게
    },
  };

  const [bidAmount, setBidAmount] = useState(""); // 입찰 금액을 저장할 state 변수를 생성

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [img1, img2, img3, img4, img5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <from>
      <div style={styles.container}>
        <div style={styles.largeGridItem}>
          <h1>제목</h1>
        </div>
        <div style={styles.gridItem}>
          <img src={images[currentImageIndex]} alt="Auction" />
          <div>
            <button
              style={{ ...styles.button2, ...styles.prevButton }}
              onClick={() =>
                setCurrentImageIndex(
                  (prevIndex) => (prevIndex - 1 + images.length) % images.length
                )
              }
            >
              이전
            </button>
            <button
              style={styles.button2}
              onClick={() =>
                setCurrentImageIndex(
                  (prevIndex) => (prevIndex + 1) % images.length
                )
              }
            >
              다음
            </button>
          </div>
        </div>
        <div style={styles.gridItem}>
          <div style={styles.innerContainer}>
            <div style={styles.innerItemTop}>
              <div style={styles.detailItem}>상품명</div>
              <div style={styles.detailsRow}>
                <div style={styles.detailItem}>시작시간</div>
                <div style={styles.detailItem}>종료시간</div>
                <div style={styles.detailItem}>입찰 횟수</div>
              </div>
              <div style={styles.detailItem}>경매 시작가격</div>
              <div style={styles.detailItem}>현재 입찰금액</div>
              <div style={styles.detailItem}>최소 입찰단위</div>
              <div style={styles.detailItem}>즉시구매가</div>
              <div style={styles.buttonContainer}>
                <input
                  type="number" // 숫자만 입력받을 수 있도록 type을 number로 설정
                  value={bidAmount} // bidAmount state 변수와 input 엘리먼트를 연결
                  onChange={(e) => setBidAmount(e.target.value)} // 사용자가 값을 입력할 때마다 state 업데이트
                  placeholder="입찰 금액 입력" // 사용자에게 입력할 내용을 안내하는 placeholder 텍스트 추가
                  style={styles.input}
                />
                <button style={styles.button}>입찰하기</button>
                <button style={styles.button}>관심등록</button>
              </div>
            </div>
            <div style={styles.innerItemBottom}>
              <div style={styles.detailItem}>판매자 아이디</div>
              <div style={styles.detailItem}>총 판매건수</div>
              <div style={styles.detailItem}>판매자 등급</div>
              <div style={styles.buttonContainer}>
                <button style={styles.button}>신고하기</button>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.LastGridItem}>게시글 내용</div>
      </div>
    </from>
  );
};

export default Auctionpost1;
