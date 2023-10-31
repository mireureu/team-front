import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Sidebar = () => {
  const auctionData = JSON.parse(localStorage.getItem("auction"));
  const auctionNo = auctionData.auctionNo;
  const [auctionPosts, setAuctionPosts] = useState([]);

  useEffect(() => {
    const list = [];
    const cookies = document.cookie.split(`; `).map((el) => el.split("="));

    for (let i = 0; i < cookies.length; i++) {
      const auctionPostInfo = Cookies.get(cookies[i][0]);
      list.push(JSON.parse(auctionPostInfo));
    }
    console.log(list);
    setAuctionPosts(list);
  }, []);

  return (
    <div>
      {auctionPosts.map((post, index) => (
        <div key={index}>
          <h1>{post.auctionTitle}</h1>
          <img src={"/upload/"+post.auctionImg.split(",",1)} alt={post.auctionTitle} /> 
          {console.log(post.auctionImg)}   
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
