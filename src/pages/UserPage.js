import React, { useState, useEffect } from "react";
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
  const [fields, setFields] = useState({
    nick: { value: '', isEditable: false },
    phone: { value: '', isEditable: false },
    email: { value: '', isEditable: false },
    addr: { value: '', isEditable: false },
  });

  // "취소" 버튼을 누를 때 필드의 초기값을 저장하는 상태 변수
  const [initialFieldValues, setInitialFieldValues] = useState({});

  // 페이지가 로드될 때 localStorage에서 사용자 정보를 가져와 fields 상태 업데이트
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setFields({
      nick: { value: userData?.nick || '', isEditable: false },
      phone: { value: userData?.phone || '', isEditable: false },
      email: { value: userData?.email || '', isEditable: false },
      addr: { value: userData?.addr || '', isEditable: false },
    });
  }, []); // 빈 배열을 전달하여 페이지가 로드될 때 한 번만 실행

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
    // 이 부분에서 업데이트된 정보를 서버에 보내거나 로컬 스토리지에 저장할 수 있습니다.
    // 예를 들어, 서버에 사용자 정보를 업데이트하고 서버에서 업데이트된 정보를 가져와
    // localStorage에 저장할 수 있습니다.

    // 사용자 정보를 업데이트하고 업데이트된 정보를 localStorage에 저장하는 예:
    const updatedUserData = {
      nick: fields.nick.value,
      phone: fields.phone.value,
      email: fields.email.value,
      addr: fields.addr.value,
    };

    // 서버에 사용자 정보 업데이트 요청 (가상의 비동기 예시)
    updateUserOnServer(updatedUserData).then(() => {
      // 업데이트된 정보를 localStorage에 저장
      localStorage.setItem("user", JSON.stringify(updatedUserData));
    });
  };

  return (
    <MyPage>
      <div className="myPages">
        <div className="my-names">
          {Object.keys(fields).map((field) => (
            <div className="my-column" key={field}>
              <p className="title">{field}</p>
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