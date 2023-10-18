import { useEffect } from 'react';
import { Nav } from 'react-bootstrap';

const Kakaopay = () => {
    const userCode = "imp55224240";

    const requestPay = () => {
        // 카카오페이 결제 요청 코드
        
        window.IMP.request_pay({
            pg: "kakaopay",
            pay_method: "card",
            merchant_uid: 'merchant_' + new Date().getTime(),
            name: "테스트 결dd제",
            amount: 10000000,
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
          alert(`결제 성공: ${status} ${merchant_uid} ${buyer_tel} ${pg} ${paid_amount}`);
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
