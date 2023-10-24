import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import getUserInfo from "./user";


const { storedToken, userObject } = getUserInfo();

const Kakaopay = () => {
    const userCode = "imp55224240";

    const requestPay = () => {
        // 카카오페이 결제 요청 코드
        
        window.IMP.request_pay({
            pg: "kakaopay",
            pay_method: "card",
            merchant_uid: 'merchant_' + new Date().getTime(),
            name: "중번당 포인트충전",
            amount: 10000000,
            buyer_name: userObject.name,
            buyer_tel: "",
            
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
          name,
          buyer_name,
          error_msg
        } = response;
    
        if (success) {
          alert(`결제 성공: ${status} ${buyer_name} ${merchant_uid} ${buyer_tel} ${pg} ${paid_amount} ${name}`);
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
        
        <Nav.Link onClick={requestPay} style={{ color: "black" }}>카카오페이로 결제 </Nav.Link>
        
    );
    
};

export default Kakaopay;
