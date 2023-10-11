import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import { getCategories, addQuestion } from "../api/question"; // 가상의 API 함수를 사용합니다.

const Header = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  padding: 20px 0;
  text-align: center;
`;

const CenteredButton = styled(Button)`
  margin: 0 auto; /* 버튼을 가운데 정렬합니다. */
  display: block; /* 버튼을 블록 수준 엘리먼트로 만듭니다. */
`;

const AskPage = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(1);

  // 카테고리 목록을 불러오는 함수
  //   const fetchCategories = async () => {
  //     const result = await getCategories(); // 가상의 API 함수로 카테고리 목록을 불러옵니다.
  //     setCategories(result.data);
  //   };

  //   useEffect(() => {
  //     fetchCategories(); // 컴포넌트가 마운트될 때 카테고리 목록을 불러옵니다.
  //   }, []);

  // 1:1 문의를 제출하는 함수
  const submitQuestion = async () => {
    // 필요한 정보를 FormData로 구성합니다.
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", selectedCategory);

    // try {
    //   // 가상의 API 함수로 1:1 문의를 제출합니다.
    //   await addQuestion(formData);
    //   // 문의 제출 후 필요한 처리를 할 수 있습니다.
    //   // 예: 메시지를 표시하고 페이지를 리디렉션합니다.
    //   alert("1:1 문의가 성공적으로 제출되었습니다.");
    //   // 페이지를 다른 곳으로 리디렉션하거나 다른 작업을 수행할 수 있습니다.
    // } catch (error) {
    //   // 문의 제출 중 에러가 발생하면 에러 처리를 할 수 있습니다.
    //   console.error("1:1 문의 제출 에러:", error);
    //   // 에러 메시지를 사용자에게 표시하거나 다른 조치를 취할 수 있습니다.
    // }
  };

  return (
    <Container>
      <Header>1:1 문의하기</Header>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>문의 카테고리</Form.Label>
          <Form.Select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <CenteredButton
          variant="primary"
          style={{ marginTop: "20px" }}
          onClick={submitQuestion}
        >
          문의 제출
        </CenteredButton>
      </Form>
    </Container>
  );
};

export default AskPage;
