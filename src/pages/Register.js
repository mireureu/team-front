import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { addUser, duplicate } from "../api/connection";
import { useNavigate } from 'react-router-dom';
import DaumPostcode from '../components/DaumPostcode';

const Register = () => {
    const [name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [phone, setPhone] = useState("");
    const [sphone, setsPhone] = useState("");
    const [addr, setAddr] = useState("");
    const [detailaddr, setDetailAddr] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState("");
    const [securityNumber, setSecurityNumber] = useState("");
    const [email, setEmail] = useState("");
    const successRegi = useNavigate(); // onClick시 성공하면 홈으로 이동 실패하면 다시 회원가입창으로
    const handleAddressSelected = (selectedAddress) => {
        setAddr(selectedAddress);
    };

    const duplicationCheckAPI = async (id) => {
        const formData = new FormData();
        formData.append("id", id);
        try {
            const response = await duplicate(formData);
            return response.data.isDuplicate;
        } catch (error) {
            throw error;
        }
    };

    const duplicateIdClick = async () => {
        try {
            const isDuplicate = await duplicationCheckAPI(id);
            if (isDuplicate) {
                alert("이 ID로 이미 가입된 사용자가 있습니다");
                console.log("이 ID로 이미 가입된 사용자가 있습니다");
            } else {
                console.log("사용 가능한 아이디입니다.");
                alert("사용 가능한 아이디입니다.");
            }
        } catch (error) {
            console.error("중복 확인 중 오류가 발생했습니다:", error);
        }
    };

    const onClick = async () => {
        const userData = {
            id: id,
            password: password,
            nick: nickName,
            name: name,
            birthday: securityNumber,
            email: email,
            phone: phone,
            sphone: sphone,
            addr: addr + "" + detailaddr,
        };

        // addUser 함수를 호출하여 사용자 데이터를 서버로 전송
        addUser(userData)
            .then(response => {
                // 성공적으로 서버에 데이터를 보낸 경우의 처리
                if (response.data) {
                    console.log("사용자가 성공적으로 등록되었습니다.");
                    successRegi('/'); // 홈페이지로 이동
                }
            })
            .catch(error => {
                console.error('회원 가입 중 오류가 발생했습니다:', error);
            });
    }


    
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

    const handleFrontChange = (e) => {
        const newRegistrationNumberFront = e.target.value.slice(0, 7); // 최대 6글자로 제한
        setRegistrationNumberFront(newRegistrationNumberFront);

        if (newRegistrationNumberFront.length === 6) {
            // 앞자리가 6글자일 때 뒷자리로 이동
            document.getElementById('registrationNumberBack').focus();
        }
    };

    const handleBackChange = (e) => {
        const newRegistrationNumberBack = e.target.value.slice(0, 7); // 최대 7글자로 제한
        setRegistrationNumberBack(newRegistrationNumberBack);

        if (newRegistrationNumberBack.length === 7 && registrationNumberFront.length === 6) {
            setRegistrationNumberValid(true);
        } else {
            setRegistrationNumberValid(false);
        }
    };

    const inputWidth = "750px";

    return (
        <Container className="panel">
            <Form>

                <Form.Group as={Row} className="mb-3">
                    <Col sm>
                        <Form.Control type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} style={{ width: inputWidth }} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm>
                        <Form.Control type="text" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} style={{ width: inputWidth }} />
                    </Col>
                    <Col>
                        <Button disabled={!id} onClick={duplicateIdClick}>아이디 중복확인</Button>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Col sm>
                        <Form.Control type="password" placeholder="비밀번호"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                checkPassword(e);
                            }} style={{ width: inputWidth }} />
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
                        <Form.Control type="text" placeholder="닉네임" value={nickName} onChange={(e) => setNickName(e.target.value)} style={{ width: inputWidth }} />
                    </Col>
                </Form.Group>





                <Form.Group as={Row} className="mb-3">
                    <Col sm>
                        <Form.Control type="text" placeholder="번호" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: inputWidth }} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm>
                        <Form.Control type="text" placeholder="번호" value={sphone} onChange={(e) => setsPhone(e.target.value)} style={{ width: inputWidth }} />
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
                                    value={registrationNumberFront}
                                    onChange={(e) => {

                                        handleFrontChange(e);
                                    }}

                                    style={{ width: "500px" }}
                                />
                            </Col>

                            <Col sm={5}>
                                <Form.Control
                                    id="registrationNumberBack"
                                    type="text"
                                    placeholder="뒷자리"
                                    onChange={(e) => {
                                        handleBackChange(e);
                                    }}
                                    value={registrationNumberBack}
                                    style={{ width: "500px" }}
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
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                checkEmail(e);
                            }}
                            style={{ width: inputWidth }}
                        />
                        {!emailValid && (
                            <p className="text-danger">올바르지 않은 이메일입니다.</p>
                        )}
                    </Col>
                </Form.Group>



                <Button
                    onClick={() => {
                        DaumPostcode({ onAddressSelected: handleAddressSelected });
                    }}
                    style={{ border: "1px solid red", backgroundColor: "white", color: "red" }}
                >
                    우편 번호 검색
                </Button>









                <Form.Group as={Row} className="mb-3">
                    <Col sm>
                        <Form.Control type="text" placeholder="기본 주소" value={addr} onChange={(e) => setAddr(e.target.value)} style={{ width: inputWidth }} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm>
                        <Form.Control type="text" placeholder="상세 주소" value={detailaddr} onChange={(e) => setDetailAddr(e.target.value)} style={{ width: inputWidth }} />
                    </Col>
                </Form.Group>
                <br />


                <div className="d-grid gap-1">
                    <Button variant="secondary" onClick={onClick} disabled={!passwordMatch || !emailValid || !registrationNumberValid}>
                        회원 가입
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default Register;
