import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api/addpost";

const Auctionpost = () => {
  const [auctionPost, setAuctionPost] = useState(null);
  const { auctionNo } = useParams();

  useEffect(() => {
    const fetchAuctionPost = async () => {
      try {
        const response = await getPost(auctionNo);
        setAuctionPost(response.data);
      } catch (error) {
        console.error("게시글 정보를 불러오는 중 오류 발생:", error);
      }
    };

    if (auctionNo) {
      fetchAuctionPost();
    }
  }, [auctionNo]);

  return (
    <div>
      <h1>Auction Post</h1>
      {auctionPost ? (
        <div>
          <h2>{auctionPost.auctionTitle}</h2>
          <p>상품 설명: {auctionPost.itemDesc}</p>
          <p>현재 가격: {auctionPost.currentPrice}원</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Auctionpost;
