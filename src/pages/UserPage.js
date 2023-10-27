import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsPencilSquare } from "react-icons/bs";
import { updateUser, userInfo } from "../api/user";

const MyPage = styled.div`
  max-width: 1295px;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  .myPages {
    margin-top: 40px;
    width: 80%;
  }

  .my-names, .my-set {
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
    border: 1px solid black;
    border-radius: 20px;

    .my-column {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title, .adds, .buttons {
        margin: 30px;
      }


      .title {
        flex: 0.5;
        margin-left: 50px;
        text-align: left;
      }

      .adds {
        flex: 2;
        border: 1px solid black;
        border-radius: 10px;
        text-align: center;

        &.edit-mode {
          border: 2px solid blue;
          background-color: white;
        }

        &.normal-mode {
          border: 1px solid black;
          background-color: gray;
        }
      }

      .buttons {
        flex: 0.5;
      }
      
    }

    
  }

`;

const UserPage = () => {
  const userData = JSON.parse(localStorage.getItem("user"));

  const [initialFieldValues, setInitialFieldValues] = useState({
    nick: userData?.nick || '',
    phone: userData?.phone || '',
    email: userData?.email || '',
    addr: userData?.addr || '',
  });
  
  const [fields, setFields] = useState({
    nick: { value: initialFieldValues.nick, isEditable: false },
    phone: { value: initialFieldValues.phone, isEditable: false },
    email: { value: initialFieldValues.email, isEditable: false },
    addr: { value: initialFieldValues.addr, isEditable: false },
  });

  const toggleEditable = (field) => {
    setFields((prevFields) => {
      const isEditable = !prevFields[field].isEditable;
      return {
        ...prevFields,
        [field]: {
          ...prevFields[field],
          value: isEditable ? prevFields[field].value : initialFieldValues[field], // 초기값으로 복원
          isEditable: isEditable,
        },
      };
    });
  };

  const handleInputChange = (field, e) => {
    setFields({
      ...fields,
      [field]: {
        ...fields[field],
        value: e.target.value,
      },
    });
  };

  const handleSave = async () => {
    // 데이터를 저장할 객체 생성
    const updatedData = {};
  
    // updatedData.id = userData.id;

    // 각 필드를 확인하고 값이 비어있지 않은 경우에만 추가
    if (fields.nick.value.trim() !== "") {
      updatedData.nick = fields.nick.value;
    }
  
    if (fields.phone.value.trim() !== "") {
      updatedData.phone = fields.phone.value;
    }
  
    if (fields.email.value.trim() !== "") {
      updatedData.email = fields.email.value;
    }
  
    if (fields.addr.value.trim() !== "") {
      updatedData.addr = fields.addr.value;
    }
  
    // 데이터가 비어있지 않은 경우에만 백엔드로 전송
    if (Object.keys(updatedData).length > 0) {
      // updateUser 함수를 호출하여 업데이트된 데이터를 전송
      try {
        const response = await updateUser(updatedData);
        window.location.replace("/UserPage");
        // 성공적으로 업데이트됐을 때의 처리
      } catch (error) {
        // 업데이트 실패 시의 처리
      }
    }
  };

  const updateUserInfo = async (user) => {
    if (user) {
        const response = await userInfo(user.token);    
        const newNick = response.data.nick;
        const newPhone = response.data.phone;
        const newEmail = response.data.email;
        const newAddr = response.data.addr;

        setInitialFieldValues({
          nick: newNick,
          phone: newPhone,
          email: newEmail,
          addr: newAddr,
        });
    }
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      updateUserInfo(savedUser);
    }
  }, []);


  const isEmailValid = (email) => {
    const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegExp.test(email);
  };

  return (
    <MyPage>
      <div className="myPages">
        <h2 style={{marginLeft:"40px"}}>내 정보</h2>
        <div className="my-names">
          {Object.keys(fields).map((field) => (
            <div className="my-column" key={field}>
              <p className="title">{field === 'nick' ? '닉네임' : field === 'phone' ? '전화번호' : field === 'email' ? '이메일' : '주소'}</p>
              <input
                type="text"
                className={`adds ${!fields[field].isEditable ? "normal-mode" : "edit-mode"}`}
                readOnly={!fields[field].isEditable}
                value={!fields[field].isEditable ? initialFieldValues[field] : fields[field].value}
                onChange={(e) => handleInputChange(field, e)}
              />
              <button className="buttons" onClick={() => toggleEditable(field)}>
                <BsPencilSquare style={{ fontSize: "30px" }} />
                {fields[field].isEditable ? "취소" : "편집"}
              </button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", margin:"20px" }}>
          <input type="button" value={"저장"} onClick={handleSave} style={{ fontSize: "20px" }} disabled={!isEmailValid(fields.email.value)} />
        </div>
        <div className="my-set">
          <div className="my-column">
            <p className="title">관심목록</p>
            <p className="adds">970228</p>
            <p className="buttons"></p>
          </div>
        </div>
      </div>
    </MyPage>
  );
};

export default UserPage;