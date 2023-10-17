import { useEffect } from 'react';
import { Nav } from 'react-bootstrap';

const Kakaopay = () => {
    const userCode = "imp78127210";

    const requestPay = () => {
        // 카카오페이 결제 요청 코드
        window.IMP.request_pay({
            pg: "kakaopay",
            pay_method: "card",
            merchant_uid: "test_lnnzwwot", 
            name: "테스트 결제",
            amount: 100,
            buyer_tel: "010-2261-0000",
        });
    };

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