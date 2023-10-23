  import React, { useEffect, useState } from 'react';
  import { Nav } from 'react-bootstrap';
  import Modal from 'react-modal';
  import "../css/modalstyle.css";
  Modal.setAppElement('#root'); // 모달을 열 때 화면 리더기에 영향을 주지 않도록 설정

  const Kakaopay = () => {
    const userCode = "imp55224240";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amount, setAmount] = useState(0);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };
    const handlePayment = (amount) => {
      // 여기에서 결제 요청 로직을 실행
      window.IMP.request_pay({
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: "테스트 결제",
        amount: amount,
        buyer_tel: "010-6471-7247",
      }, callback);
    };

    function callback(response) {
      const {
        success,
        merchant_uid,
        status,
        pg,
        buyer_tel,
        paid_amount,
        error_msg
      } = response;

      if (success) {
        console.log(`결제 성공: ${status} ${merchant_uid} ${buyer_tel} ${pg} ${paid_amount}`);
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

          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="금액 선택"
            overlayClassName="modal-overlay"
            className="modal-content"
          >
            <h2>금액 선택</h2>
            <input
              type="number"
              placeholder="결제할 금액을 입력하세요"
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={() => handlePayment(amount)}>선택</button>
          </Modal>
         
      </div>

    );
  };

  export default Kakaopay;
