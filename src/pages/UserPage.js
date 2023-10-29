import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsPencilSquare } from "react-icons/bs";
import { updateUser, userInfo } from "../api/user";

const MyPage = styled.div`
  max-width: 1295px;
  min-width: 800px;
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
  }

  .my-column {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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
`;

const UserPage = () => {
  const userData = JSON.parse(localStorage.getItem("user"));

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 초기 필드 값 설정
  const [initialFieldValues, setInitialFieldValues] = useState({
    nick: userData?.nick || "",
    phone: userData?.phone || "",
    email: userData?.email || "",
    addr: userData?.addr || "",
  });

  // 각 필드에 대한 상태 설정
  const [nickField, setNickField] = useState({
    value: initialFieldValues.nick,
    isEditable: false,
  });
  const [phoneField, setPhoneField] = useState({
    value: initialFieldValues.phone,
    isEditable: false,
  });
  const [emailField, setEmailField] = useState({
    value: initialFieldValues.email,
    isEditable: false,
  });
  const [addrField, setAddrField] = useState({
    value: initialFieldValues.addr,
    isEditable: false,
  });

  const toggleEditable = (field) => {
    // 편집 모드 전환 함수
    switch (field) {
      case "nick":
        setNickField((prevField) => ({
          ...prevField,
          isEditable: !prevField.isEditable,
          value: !prevField.isEditable
            ? initialFieldValues.nick
            : prevField.value,
        }));
        break;
      case "phone":
        setPhoneField((prevField) => ({
          ...prevField,
          isEditable: !prevField.isEditable,
          value: !prevField.isEditable
            ? initialFieldValues.phone
            : prevField.value,
        }));
        break;
      case "email":
        setEmailField((prevField) => ({
          ...prevField,
          isEditable: !prevField.isEditable,
          value: !prevField.isEditable
            ? initialFieldValues.email
            : prevField.value,
        }));
        break;
      case "addr":
        setAddrField((prevField) => ({
          ...prevField,
          isEditable: !prevField.isEditable,
          value: !prevField.isEditable
            ? initialFieldValues.addr
            : prevField.value,
        }));
        break;
      default:
        break;
    }
  };

  const handleInputChange = (field, e) => {
    // 입력 값 업데이트 함수
    switch (field) {
      case "nick":
        setNickField({ ...nickField, value: e.target.value });
        break;
      case "phone":
        setPhoneField({ ...phoneField, value: e.target.value });
        break;
      case "email":
        setEmailField({ ...emailField, value: e.target.value });
        break;
      case "addr":
        setAddrField({ ...addrField, value: e.target.value });
        break;
      default:
        break;
    }
  };

  const handleSave = async () => {
    // 데이터를 저장할 객체 생성
    const updatedData = {};
  
    // 각 필드를 확인하고 값이 비어있지 않은 경우에만 추가
    if (nickField.value.trim() !== "") {
      updatedData.nick = nickField.value;
    }
  
    if (phoneField.value.trim() !== "") {
      updatedData.phone = phoneField.value;
    }
  
    if (emailField.value.trim() !== "" && isEmailValid(emailField.value)) {
      updatedData.email = emailField.value;
    } else if (!isEmailValid(emailField.value)) {
      // 이메일이 유효하지 않은 경우에 대한 처리
      alert("유효하지 않은 이메일 주소입니다.");
      return;
    }
  
    if (addrField.value.trim() !== "") {
      updatedData.addr = addrField.value;
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

  // 이메일 유효성 검사
  const isEmailValid = (email) => {
    const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegExp.test(email);
  };

  const isAllFieldsEmpty = () => {
    // 모든 필드가 비어 있는지 확인
    if (
      nickField.value.trim() === "" &&
      phoneField.value.trim() === "" &&
      emailField.value.trim() === "" &&
      addrField.value.trim() === ""
    ) {
      return true;
    }
    return false;
  };

  // 미리보기
  const openModal = (item) => {
    // setSelectedItem(item);
    setIsModalOpen(true);
  };

  // 미리보기 창 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MyPage>
      <div className="myPages">
        <h2 style={{ marginLeft: "40px" }}>내 정보</h2>
        <div className="my-names">
          {/* 닉네임 */}
          <div className="my-column">
            <p className="title">닉네임</p>
            <input
              type="text"
              className={`adds ${
                !nickField.isEditable ? "normal-mode" : "edit-mode"
              }`}
              readOnly={!nickField.isEditable}
              value={
                !nickField.isEditable
                  ? initialFieldValues.nick
                  : nickField.value
              }
              onChange={(e) => handleInputChange("nick", e)}
            />
            <button className="buttons" onClick={() => toggleEditable("nick")}>
              <BsPencilSquare style={{ fontSize: "30px" }} />
              {nickField.isEditable ? "취소" : "변경"}
            </button>
          </div>

          {/* 전화번호 */}
          <div className="my-column">
            <p className="title">전화번호</p>
            <input
              type="text"
              className={`adds ${
                !phoneField.isEditable ? "normal-mode" : "edit-mode"
              }`}
              readOnly={!phoneField.isEditable}
              value={
                !phoneField.isEditable
                  ? initialFieldValues.phone
                  : phoneField.value
              }
              onChange={(e) => handleInputChange("phone", e)}
            />
            <button
              className="buttons"
              onClick={() => toggleEditable("phone")}
            >
              <BsPencilSquare style={{ fontSize: "30px" }} />
              {phoneField.isEditable ? "취소" : "변경"}
            </button>
          </div>

          {/* 이메일 */}
          <div className="my-column">
            <p className="title">이메일</p>
            <input
              type="text"
              className={`adds ${
                !emailField.isEditable ? "normal-mode" : "edit-mode"
              }`}
              readOnly={!emailField.isEditable}
              value={
                !emailField.isEditable
                  ? initialFieldValues.email
                  : emailField.value
              }
              onChange={(e) => handleInputChange("email", e)}
            />
            <button
              className="buttons"
              onClick={() => toggleEditable("email")}
            >
              <BsPencilSquare style={{ fontSize: "30px" }} />
              {emailField.isEditable ? "취소" : "변경"}
            </button>
          </div>

          {/* 주소 */}
          <div className="my-column">
            <p className="title">주소</p>
            <input
              type="text"
              className={`adds ${
                !addrField.isEditable ? "normal-mode" : "edit-mode"
              }`}
              readOnly={!addrField.isEditable}
              value={
                !addrField.isEditable
                  ? initialFieldValues.addr
                  : addrField.value
              }
              onChange={(e) => handleInputChange("addr", e)}
            />
            <button className="buttons" onClick={() => toggleEditable("addr")}>
              <BsPencilSquare style={{ fontSize: "30px" }} />
              {addrField.isEditable ? "취소" : "변경"}
            </button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px" }}>
          <input
            type="button"
            value={"저장"}
            onClick={handleSave}
            style={{ fontSize: "20px" }}
            disabled={isAllFieldsEmpty()}
          />
        </div>
        <div className="my-set">
          <div className="my-column">
            <p className="title">주소</p>
            <p className="adds">970228</p>
          </div>
        </div>
      </div>
    </MyPage>
  );
};

export default UserPage;
