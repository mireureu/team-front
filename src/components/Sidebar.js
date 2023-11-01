import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styled from "styled-components";


const Main = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px; /* 오른쪽에 붙일 div의 너비 */
  height: 100%; /* 화면의 높이와 같도록 설정 */
  background-color: #f0f0f0;
  overflow: auto; /* 스크롤이 생길 때 가려진 부분을 스크롤로 볼 수 있도록 함 */
`;


const Sidebar = () => {
  const auctionData = JSON.parse(localStorage.getItem("auction"));
  const [auctionPosts, setAuctionPosts] = useState([]);


  useEffect(() => {
    const list = [];
    if(document.cookie){       
    const cookies = document.cookie.split('; ').map((el) => el.split('='));

    const auctionCookies = cookies.filter((cookie) =>
      cookie[0].startsWith('auctionPost')
    );
    
    const recentAuctionCookies = auctionCookies.slice(
      Math.max(auctionCookies.length - 3, 0)
    ); 

    for (let i = 0; i < recentAuctionCookies.length; i++) {
      const auctionPostInfo = Cookies.get(recentAuctionCookies[i][0]);
      list.push(JSON.parse(auctionPostInfo));
    }
  } 
    setAuctionPosts(list);
  }, []);
    
  return (
    <Main>
      <div>
        {auctionPosts &&
          auctionPosts.map((post, index) => (
            <div key={index}>
              <h1>{post.auctionTitle}</h1>
              <img src={"/upload/" + post.auctionImg.split(",", 1)} alt={post.auctionTitle} />
              {console.log(post.auctionImg)}
            </div>
          ))}
      </div>
    </Main>
  );
};

export default Sidebar;