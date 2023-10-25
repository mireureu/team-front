import React, { useState } from "react";
import styled from "styled-components";
import { BsPencilSquare } from "react-icons/bs";

const MyPage = styled.div`
  max-width: 1295px;
  margin: 0 auto;

  .myPages {
    margin-top: 60px;
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
        text-align: right;
      }
    }
  }
`;

const UserPage = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [fields, setFields] = useState({
    nick: { value: userData?.nick || "D_Clown", isEditable: false },
    phone: { value: userData?.phone || "01024026092", isEditable: false },
    email: { value: userData?.email || "wawd@naver.com", isEditable: false },
    addr: { value: userData?.addr || "서울", isEditable: false },
  });
  
  // "취소" 버튼을 누를 때 필드의 초기값을 저장하는 상태 변수
  const [initialFieldValues, setInitialFieldValues] = useState({});

  const toggleEditable = (field) => {
    // 필드의 수정 모드가 활성화되면 현재 값 저장
    if (!fields[field].isEditable) {
      setInitialFieldValues({
        ...initialFieldValues,
        [field]: fields[field].value,
      });
    }

    setFields({
      ...fields,
      [field]: {
        ...fields[field],
        isEditable: !fields[field].isEditable,
      },
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

  const handleCancel = (field) => {
    // "취소" 버튼을 누를 때 필드를 초기값으로 복원하고 수정 모드 비활성화
    setFields({
      ...fields,
      [field]: {
        ...fields[field],
        value: initialFieldValues[field], // 초기값으로 복원
        isEditable: false, // 수정 모드 비활성화
      },
    });
  };

  const handleSave = () => {
    // // "닉네임" 필드
    // if (isEditableNick) {
    //   setInputValueNick(prevValueNick);
    //   setIsEditableNick(false);
    // }
    
    // // "전화번호" 필드
    // if (isEditablePhone) {
    //   setInputValuePhone(prevValuePhone);
    //   setIsEditablePhone(false);
    // }
  
    // // "이메일" 필드
    // if (isEditableEmail) {
    //   setInputValueEmail(prevValueEmail);
    //   setIsEditableEmail(false);
    // }
  
    // // "주소" 필드
    // if (isEditableAddr) {
    //   setInputValueAddr(prevValueAddr);
    //   setIsEditableAddr(false);
    // }
  };

  // useEffect(() => {
  //   // memberAPI();
  // }, []);
  

  return (
    <MyPage>
      <div className="myPages">
        <div className="my-names">
          {Object.keys(fields).map((field) => (
            <div className="my-column" key={field}>
              <p className="title">{field === "nick" ? "닉네임" : field}</p>
              <input
                type="text"
                className={`adds ${
                  fields[field].isEditable ? "edit-mode" : "normal-mode"
                }`}
                readOnly={!fields[field].isEditable}
                value={fields[field].value}
                onChange={(e) => handleInputChange(field, e)}
              />
              <button className="buttons" onClick={() => toggleEditable(field)}>
                <BsPencilSquare style={{ fontSize: "30px" }} />
                {fields[field].isEditable ? "취소" : "편집"}
              </button>
            </div>
          ))}
        </div>
        <input type="button" value={"취소"} />
        <input type="button" value={"저장"} onClick={handleSave} />
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
