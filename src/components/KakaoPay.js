import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import { updatePoint } from '../api/pay';
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 800px;
  height: 600px;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  z-index: 4;
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


const Kakaopay = () => {

  const userData = JSON.parse(localStorage.getItem("user"));
  const name = userData ? userData.name : '';
  const phone = userData ? userData.phone : '';
  const point = userData ? userData.point : '';
  const id = userData ? userData.id : '';


  const userCode = "imp55224240";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handlePayment = () => {
    // 여기에서 결제 요청 로직을 실행
    window.IMP.request_pay({
      pg: "kakaopay",
      pay_method: "card",
      merchant_uid: 'merchant_' + new Date().getTime(),
      name: name,
      amount: amount,
      buyer_tel: phone,
    }, callback);
  };

  function callback(response) {
    const {
      success,
      merchant_uid,
      status,
      pg,
      name,
      buyer_tel,
      paid_amount,
      error_msg
    } = response;

    if (success) {
      const updateUserData = {
        point: point,
        id: id,
      };
      const data = { ...updateUserData, point: amount };
      updatePoint(data);
      console.log(data);
      
    } else {
      alert(`결제 실패: ${error_msg} ${merchant_uid} ${buyer_tel} ${pg}`);
    }
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/v1/iamport.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      window.IMP.init(userCode);
    };
  }, [userCode]);

  return (
    <div>
      <Nav.Link onClick={openModal} style={{ color: "black" }}>카카오페이로 결제</Nav.Link>
      {isModalOpen && (
        <Modal        
        >
          <h2>금액 선택</h2>
          <input
            type="number"
            placeholder="결제할 금액을 입력하세요"
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={() => handlePayment(amount)}>선택</button>
          <button onClick={closeModal}>닫기</button>
        </Modal>
      )}
    </div>

  );
};

export default Kakaopay;
