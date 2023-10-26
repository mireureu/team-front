import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getPostitem } from "../api/auctionBoard";
import { useEffect } from "react";
import { useState } from "react";
import {
  viewComments,
  addComment,
  updateComment,
  deleteComment,
} from "../store/commentSlice";
import { useSelector, useDispatch } from "react-redux";
import Reply from "../components/Reply";
import AddComment from "../components/AddComment";
import Comment from "../components/comments";

const StyledMain = styled.main`
  padding-top: 56px;
`;

const Watch = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [item, setitem] = useState(null);
  const comments = useSelector((state) => {
    return state.comment;
  });

  const getPostitemAPI = async () => {
    const result = await getPostitem(id);
    setitem(result.data);
  };

  useEffect(() => {
    getPostitemAPI();
  }, []);

  useEffect(() => {
    dispatch(viewComments(id));
  }, [dispatch]);

  <StyledMain>
  {/* video는 단순 비디오 1개 정보 가져와서 보여주는 거라 생략 */}
  {JSON.stringify(item, null, 5)}
  <AddComment code={item !== null ? item.auctionNo : null} />
  {comments.map((comment) => (
    <Comment key={comment.commentCode} comment={comment} />
  ))}
</StyledMain>
};
export default Watch;
