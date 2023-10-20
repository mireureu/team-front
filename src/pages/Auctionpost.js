import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api/addpost";

const Auctionpost = () => {
  const [auctionPost, setAuctionPost] = useState(null);
  const { auctionNo } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const nextImage = () => {
    if (
      auctionPost?.imageList &&
      currentImageIndex < auctionPost.imageList.length - 1
    ) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const previousImage = () => {
    if (auctionPost?.imageList && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div>
      <h1>Auction Post</h1>
      {auctionPost ? (
        <div>
          <h2>{auctionPost.auctionTitle}</h2>
          <p>상품 설명: {auctionPost.itemDesc}</p>
          <p>현재 가격: {auctionPost.currentPrice}원</p>
          <div>
            {auctionPost.imageList && auctionPost.imageList.length > 0 && (
              <div>
                <img
                  src={auctionPost.imageList[currentImageIndex]}
                  alt={`Image ${currentImageIndex + 1}`}
                  style={{ maxWidth: "100%" }}
                />
                <button onClick={previousImage}>이전 이미지</button>
                <button onClick={nextImage}>다음 이미지</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Auctionpost;
