import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import getUserInfo from "../api/user";

const MyPage = styled.div`
  max-width: 1295px;
  margin: 0 auto;

  .myPages {
    /* margin-top: 30px; */
    margin-top: 60px;
    /* border: 1px solid black; */

    .my-names {
      margin: 0 auto;
      margin-top: 30px;
      margin-bottom: 30px;
      border: 1px solid black;
      border-radius: 20px;
      width: 80%;

      .my-column {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title, .adds, .buttons {
          margin: 30px;
        }


        .title, .adds {
          flex: 1;
          
        }

        .title {
          margin-left: 50px;
          text-align: left;
        }

        .adds {
          border: 1px solid black;
          border-radius: 10px;
          text-align: center;
        }

        .buttons {
          flex: 0.5;
          text-align: right;
        }
      
      }
    }
    
  }

`;

const UserPage = () => {
  const [memberInfo, setMemberInfo] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));

  const nick = userData ? userData.nick : '';
  const birthday = userData ? userData.birthday : 0;
  const phone = userData ? userData.phone : '';
  const email = userData ? userData.email : '';
  const addr = userData ? userData.addr : '';

  const memberAPI = async () => {
    const result = await getUserInfo();
    
    return setMemberInfo(result.data);
  };

  useEffect(() => {
    memberAPI();
  }, []);


  return (
    <MyPage>

      <div className="myPages">
        <div className="my-names">
          <div className="my-column">
            <p className="title">닉네임</p>
            <p className="adds">D_Clown</p>
            <p className="buttons">변경</p>
          </div>
          <div className="my-column">
            <p className="title">생년월일</p>
            <p className="adds">970228</p>
            <p className="buttons">변경</p>
          </div>
          <div className="my-column">
            <p className="title">전화번호</p>
            <p className="adds">01012345678</p>
            <p className="buttons">변경</p>
          </div>
          <div className="my-column">
            <p className="title">이메일</p>
            <p className="adds">wwdaw@naver.com</p>
            <p className="buttons">변경</p>
          </div>
          <div className="my-column">
            <p className="title">주소</p>
            <p className="adds">서울시 강남</p>
            <p className="buttons">변경</p>
          </div>
        </div>
      </div>
    </MyPage>
  );
};

export default UserPage;
