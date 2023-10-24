import React from "react";
import styled from "styled-components";

const MyPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  .myPages {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
  }

  .my-row {
    display: flex;
    flex-wrap: wrap;
    width: 800px; /* 원하는 너비 설정 */
    margin: 20px;
  }

  .my-column {
    flex: 1;
    text-align: center;
  }

  .title,
  .adds,
  .buttons {
    margin: 0; /* 기본 마진 제거 */
  }

  .my-column p {
    margin: 0; /* 각 항목의 기본 마진 제거 */
  }
`;

const UserPage = () => {
  return (
    <MyPage>
      <div className="myPages">
        <div className="my-row">
          <div className="my-column">
            <p className="title">닉네임</p>
            <p className="adds">D_Clown</p>
            <p className="buttons">변경</p>
          </div>
          <div className="my-column">
            <p className="title">생년월일</p>
            <p className="adds">920228</p>
            <p className="buttons">변경</p>
          </div>
          <div className="my-column">
            <p className="title">전화번호</p>
            <p className="adds">01024026092</p>
            <p className="buttons">변경</p>
          </div>
        </div>
      </div>
    </MyPage>
  );
};

export default UserPage;
