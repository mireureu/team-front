import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Label } from '@mui/icons-material';

const Register = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [registrationNumberFront, setRegistrationNumberFront] = useState('');
    const [registrationNumberBack, setRegistrationNumberBack] = useState('');
    const [registrationNumberValid, setRegistrationNumberValid] = useState(true);
    const [isValidPasswordFormat, setIsValidPasswordFormat] = useState(true);

    const checkPassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        // 비밀번호 형식 유효성 검사
        const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%^&+=!])([0-9a-zA-Z@#$%^&+=!]){12,20}$/;
        const isValidPassword = passwordRegExp.test(newPassword);

        // 비밀번호 확인과 비교
        const isMatch = newPassword === confirmPassword;
        setPasswordMatch(isValidPassword && isMatch);

        // 정규표현식과 다를 경우 메시지 표시
        setIsValidPasswordFormat(isValidPassword);
    }

    const checkConfirmPassword = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setIsTyping(true);

        // 비밀번호와 비밀번호 확인 일치 여부 확인
        const isMatch = password === newConfirmPassword;
        setPasswordMatch(isTyping && isMatch);
    }

    // 이메일 체크 부분
    const checkEmail = (e) => {
        const email = e.target.value;
        var emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        const isValidEmail = emailRegExp.test(email);
        setEmailValid(isValidEmail);
    }

    const checkRegistrationNumberFront = (e) => {
        const newRegistrationNumberFront = e.target.value;
        const isValidRegistrationNumberFront = /^[0-9]{6}$/.test(newRegistrationNumberFront);
        setRegistrationNumberFront(newRegistrationNumberFront);
        setRegistrationNumberValid(isValidRegistrationNumberFront && registrationNumberBack.length === 7);
    }

    const checkRegistrationNumberBack = (e) => {
        const newRegistrationNumberBack = e.target.value;
        const isValidRegistrationNumberBack = /^[0-9]{7}$/.test(newRegistrationNumberBack);
        setRegistrationNumberBack(newRegistrationNumberBack);
        setRegistrationNumberValid(registrationNumberFront.length === 6 && isValidRegistrationNumberBack);
    }

    // 폼 요소의 너비 설정
    const inputWidth = "750px";


    return (
        <Container className="panel">
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Col sm>
                        <Form.Control type="password" placeholder="아이디" style={{ width: inputWidth }} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Col sm>
                        <Form.Control type="password" placeholder="비밀번호" onChange={checkPassword} style={{ width: inputWidth }} />
                        {!isValidPasswordFormat && (
                            <p className="text-danger">비밀번호 형식이 올바르지 않습니다. 아이디를 다시 입력해주세요.</p>
                        )}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Col sm>
                        <Form.Control
                            type="password"
                            placeholder="비밀번호 확인"
                            onChange={checkConfirmPassword}
                            style={{ width: inputWidth }}
                        />
                        {isTyping && !passwordMatch && (
                            <p className="text-danger">비밀번호가 일치하지 않습니다.</p>
                        )}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm>
                        <Form.Label>주민번호</Form.Label>
                        <Row>
                            <Col sm={5}>
                                <Form.Control
                                    type="text"
                                    placeholder="앞자리"
                                    onChange={checkRegistrationNumberFront}
                                    style={{ width: "500px" }}
                                />
                            </Col>
                    
                            <Col sm={5}>
                                <Form.Control
                                    type="text"
                                    placeholder="뒷자리"
                                    onChange={checkRegistrationNumberBack}
                                    style={{ width: "500px"}}
                                />
                            </Col>
                        </Row>
                        {!registrationNumberValid && (
                            <p className="text-danger">올바르지 않은 주민등록 번호입니다.</p>
                        )}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                    <Col sm>
                        <Form.Control
                            type="email"
                            placeholder="이메일"
                            onChange={checkEmail}
                            style={{ width: inputWidth }}
                        />
                        {!emailValid && (
                            <p className="text-danger">올바르지 않은 이메일입니다.</p>
                        )}
                    </Col>
                </Form.Group>

                <br />

                <div className="d-grid gap-1">
                    <Button variant="secondary" type="submit" disabled={!passwordMatch || !emailValid || !registrationNumberValid}>
                        회원 가입
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default Register;
