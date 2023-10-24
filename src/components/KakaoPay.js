import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import { updatePoint } from '../api/pay';
const Modal = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 2fr;
  
  position: fixed;
  top: 50%;
  left: 50%;
  width: 800px;
  height: 400px;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  z-index: 4;
  border: 1px solid black;
  border-radius: 20px;

  .top {

    h2 {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }

  .close {
    position: absolute;
    border-radius: 5px;
    top: 15px;
    right: 15px;
  }

  .mid {
    display: flex;
    justify-content: center;
    margin: 20px;

    .myPoint {
      border: 1px solid black;
      border-radius: 10px;
      width: 300px;
      background-color: skyblue; // 내 포인트 잔액 배경 색

      h4 {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }

      p {
        font-size: 20px;
        border: 1px solid black;
        border-radius: 5px;
        width: 200px;
        margin: 0 auto;
        margin-bottom: 20px;
        text-align: right;
        white-space: pre;
        background-color: white; // 포인트 출력칸 배경색
      }
    }
    
  }

  .bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;

    input {
      width: 320px;
    }

    input, button {
      font-size: 25px;
      text-align: right;
      border-radius: 10px;
      margin: 5px;
    }
    
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
        <Modal>
          <div className='top'>
            <h2>포인트 충전</h2>
            <button className='close' onClick={closeModal}>X</button>
          </div>
          <div className='mid'>
            <div className='myPoint'>
              <h4>내 포인트 잔액</h4>
              <p>
                <span> 포인트 </span>
              </p>
            </div>
          </div>
          <div className='bottom'>
            <input
                type="number"
                placeholder="충전할 금액을 입력하세요"
                onChange={(e) => setAmount(e.target.value)}
              />
            <button onClick={() => handlePayment(amount)}>결제하기</button>
          </div>
        </Modal>
      )}
    </div>

  );
};

export default Kakaopay;