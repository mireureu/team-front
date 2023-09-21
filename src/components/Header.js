import React, { useState } from 'react';
import '../scss/custom.scss';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";

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
`;

const Header = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTabSelect = (eventKey) => {
    if (eventKey === 'home') {
      // 'home' 탭을 클릭했을 때 'Button' 컴포넌트 클릭과 동일한 동작 수행
      handleShow();
      return;
    }
  };

  return (
    <>
      <StyledHeader id="fill-tab-style">
        <Navbar bg="white" variant="dark" collapseOnSelect>
          <Navbar.Brand href="#" style={{ marginLeft: '100px', color: "black", fontWeight: "bold" }}>
            중번당
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" style={{ color: "black" }}>회원가입</Nav.Link>
              <Nav.Link href="#" style={{ color: "black" }}>로그인</Nav.Link>
              <Nav.Link href="#" style={{ color: "black" }}>배송조회</Nav.Link>
              <Nav.Link href="#" style={{ color: "black" }}>고객센터</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Divider /> 
        <InputGroup className="mb-3" style={{ width: "40%", height: "55px", marginTop: 15, marginLeft: "auto", marginRight: "auto" }}>
          <Form.Control
            placeholder="검색어를 입력해주세요"
            style={{
              borderRadius: "25px 0 0 25px",
              boxShadow: "5px 5px 4px rgba(0, 0, 0, 0.5)",
              outline: "none",
              borderColor: "#d9d9d9",
              borderRight: "none",
            }}
          />
          <Link to="/search">
            <Button
              variant="outline-secondary"
              id="button-addon2"
              style={{
                height: "100%",
                background: "white",
                borderRadius: "0",
                boxShadow: "5px 5px 4px rgba(0, 0, 0, 0.5)",
                borderColor: "#d9d9d9",
                borderLeftColor: "white",
                borderLeft: "none",
              }}
              className="custom-button"
            >
              <AiOutlineSearch className="aiBtn" style={{ fontSize: "30px", color: "black" }} />
            </Button>
          </Link>
        </InputGroup>


        
        <CategoryColor>
          <Tabs
            defaultActiveKey="home"
            id="fill-tab-example"
            className="mb-3"
            fill
            onSelect={handleTabSelect}
            style={{ marginTop: "40px", fontSize: "20px" }}
          >
            <Tab eventKey="home" title="전체카테고리" >
            </Tab>

            <Tab eventKey="profile" title={<Link to="/newItems" style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}>신상품</Link>}></Tab>
            <Tab eventKey="longer-tab" title={<Link to="/bestItems" style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}>베스트상품</Link>}>
              Tab content for Loooonger Tab
            </Tab>
            <Tab eventKey="contact" title={<Link to="/contact" style={{ textDecoration: "none", color: "black", fontWeight: "bold", border: "none", outline: "none" }}>Contact</Link>} className="no-hover-animation">
            </Tab>
          </Tabs>
        </CategoryColor>
      </StyledHeader>
      <Button variant="primary" onClick={handleShow} style={{ display: 'none' }}>
        Launch
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>아이템들</Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
