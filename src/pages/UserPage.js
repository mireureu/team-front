import React, { useState } from "react";
import styled from "styled-components";
import { BsPencilSquare } from "react-icons/bs";
import { updateUser } from "../api/user";

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
    const updatedData = {};

    // 수정된 필드 확인
    for (const field of Object.keys(fields)) {
      if (fields[field].isEditable) {
        updatedData[field] = fields[field].value;
      }
    }

    try {
      // updateUser 함수를 호출하여 업데이트를 시도
      const response = await updateUser(updatedData);

      if (response.status === 200) {
        console.log('데이터 업데이트 성공');
        // 필드를 읽기 전용으로 설정하고 상태를 업데이트합니다.
        setFields((prevFields) => {
          const updatedFields = { ...prevFields };
          for (const field of Object.keys(fields)) {
            updatedFields[field].isEditable = false;
          }
          return updatedFields;
        });
      } else {
        console.error('데이터 업데이트 실패');
      }
    } catch (error) {
      console.error('데이터 업데이트 오류:', error);
    }
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
