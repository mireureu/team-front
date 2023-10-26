import styled from "styled-components";
import AddComment from "./AddComment";
import { useState, useRef } from "react";
import Reply from "./Reply";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../store/commentSlice";

const Box = styled.div`
  width: 95%;
  margin: 10px auto;
  margin-bottom: 30px;

  h2 {
    font-weight: bold;
    margin-bottom: 5px;
  }
  button {
    background: black;
    color: white;
    border-radius: 5px;
    margin: 10px;
    padding: 5px 10px;
  }
`;

const Comment = ({ comment }) => {
  const [isActive, setIsActive] = useState(true);
  const [content, setContent] = useState(comment.commentDesc);
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const onClick = () => {
    setIsActive(!isActive);
  };

  const handleBlur = () => {
    setContent(contentRef.current.innerText);
  };

  const onUpdate = () => {
    dispatch(
      updateComment({
        commentCode: comment.commentCode,
        videoCode: comment.videoCode,
        commentDesc: content,
      })
    );
  };

  const onDelete = () => {
    dispatch(deleteComment(comment.commentCode));
  };
  return (
    <Box>
      <h2>@{comment.member.id}</h2>
      <div>
        <span
          contentEditable="true"
          suppressContentEditableWarning
          ref={contentRef}
          onBlur={handleBlur}
        >
          {content}
        </span>
        <button onClick={onClick}>답글</button>
        <button onClick={onUpdate}>수정</button>
        <button onClick={onDelete}>삭제</button>
      </div>
      <AddComment
        active={isActive}
        parent={comment.commentCode}
        code={comment.videoCode}
      />
      {comment.replies?.map((reply) => (
        <Reply reply={reply} key={reply.commentCode} />
      ))}
    </Box>
  );
};
export default Comment;
