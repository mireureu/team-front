import { useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { getCategories } from "../api/connection";
import { useDispatch, useSelector } from "react-redux";
import { userSave, userLogout } from "../store/userSlice";
import Kakaopay from "../components/KakaoPay";
import { asyncSearch } from "../store/searchSlice";
import { userInfo } from "../api/user";


const StyledHeader = styled.header`
  #basic-navbar-nav {
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
  }
`;

const Divider = styled.div`
  border-top: 1px solid #ccc;
  margin: 5px 0;
`;

const CategoryColor = styled.div`
    background-color: whitesmoke;
    max-width: 1295px;
    margin: 0 auto;

  `;

const Header = () => {
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const movePage = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [name, setName] = useState("");
  const [point, setPoint] = useState(0);

  const Search = () => {
    console.log(keyword);
    dispatch(asyncSearch({ keyword: keyword }));
    movePage("/SearchResult", { state: { keyword } });
  }

  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const save = localStorage.getItem("user");
    if (Object.keys(user).length === 0 && save != null) {
      const savedUser = JSON.parse(save);
      dispatch(userSave(savedUser));
      setPoint(savedUser.point); // 포인트 상태 업데이트
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userLogout());
    movePage("/");
    window.location.replace("/"); // 새로고침
  }

  // 로그인 직후 새로고침을 안하면 토큰값이 안넘어가서 직접 넣어줬음.
  const updateUserInfo = async (user) => {
    if (user) {
      const response = await userInfo(user.token);
      const newPoint = response.data.point;
      const newName = response.data.name;
      const formatPoint = newPoint ? newPoint.toLocaleString('ko-KR'): 0;
      setPoint(formatPoint);
      setName(newName);
    }
  };
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      updateUserInfo(savedUser);
    }
  }, []);
  const [categories, setCategories] = useState([]);

  const categoryAPI = async () => {
    const result = await getCategories();
    setCategories(result.data);
  };

  useEffect(() => {
    categoryAPI();
  }, []);

  const [show, setShow] = useState(false);

  const Login = () => {
    movePage("/login");
  }

  const register = () => {
    movePage("/register");
  }

  const handleTabSelect = (eventKey) => {
    if (eventKey === 'home') {
      handleShow();
      return;
    }
  };

  return (
    <>
      <StyledHeader id="fill-tab-style">
        <Navbar bg="white" variant="dark" collapseOnSelect>
          <Navbar.Brand href="/" style={{ marginLeft: '100px', color: "black", fontWeight: "bold" }}>
            중번당
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">

              {name && 
                <Nav.Link style={{ color: "black" }}> {name} 님 {point} point</Nav.Link>
              }
              <Nav.Link onClick={register} style={{ color: "black" }}>회원가입</Nav.Link>
              <Kakaopay />

              {Object.keys(user).length === 0 ? (
                <Nav.Link onClick={Login} style={{ color: "black" }}>로그인</Nav.Link>
              ) : (
                <Nav.Link onClick={logout} style={{ color: "black" }}>로그아웃</Nav.Link>
              )}
              <Nav.Link href="#" style={{ color: "black" }}>배송조회</Nav.Link>
              <Nav.Link href="#" style={{ color: "black" }}>고객센터</Nav.Link>
            </Nav>
          </Navbar.Collapse>  
        </Navbar>
        <Divider />
        <Form onSubmit={(e) => {
          e.preventDefault();
          Search();
        }}>
          <InputGroup className="mb-3" style={{ width: "40%", height: "55px", marginTop: 15, marginLeft: "auto", marginRight: "auto", outline: "none" }}>
            <Form.Control
              placeholder="검색어를 입력해주세요"
              style={{
                borderRadius: "25px 0 0 25px",
                boxShadow: "5px 5px 4px rgba(0, 0, 0, 0.5)",
                borderColor: "#d9d9d9",
                borderRight: "none",
              }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Nav.Link>
              <Button
                type="submit"
                variant="outline-secondary"
                id="button-addon2"
                style={{
                  height: "100%",
                  background: "white",
                  borderRadius: "0",
                  boxShadow: "5px 5px 4px rgba(0, 0, 0, 0.5)",
                  borderColor: "#d9d9d9",
                  borderLeft: "none",
                }}
                onClick={Search}
                className="custom-button"
              >
                <AiOutlineSearch className="aiBtn" style={{ fontSize: "30px", color: "black" }} />
              </Button>
            </Nav.Link>
          </InputGroup>
        </Form>






        <CategoryColor>
          <Tabs
            defaultActiveKey="home"
            id="fill-tab-example"
            className="mb-3"
            fill
            onSelect={handleTabSelect}
            style={{ marginTop: "40px", fontSize: "20px" }}
          >
            <Tab eventKey="home" title="전체카테고리" />
            <Tab eventKey="profile" title={<Link to="/newItems" style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}>신상품</Link>} />
            <Tab eventKey="longer-tab" title={<Link to="/bestItems" style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}>베스트상품</Link>} />
            <Tab eventKey="contact" title={<Link to="/contact" style={{ textDecoration: "none", color: "black", fontWeight: "bold", border: "none", outline: "none" }}>QnA</Link>} className="no-hover-animation" />
          </Tabs>
        </CategoryColor>
      </StyledHeader>
      <Button variant="primary" onClick={handleShow} style={{ display: 'none' }}>
        Launch
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>전체 상품</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {categories.map((Category) => (
            <a href="#" key={Category.categoryNo} style={{ textDecoration: "none", color: "black" }}>
              <p>{Category.categoryName}
              {console.log(Category.categoryNo)}</p>
            </a>
            
          ))}
          
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
