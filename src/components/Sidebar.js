import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Sidebar = () => {
  const auctionData = JSON.parse(localStorage.getItem("auction"));
  const [auctionPosts, setAuctionPosts] = useState([]);

  useEffect(() => {
    const list = [];
    if (document.cookie) {
      const cookies = document.cookie.split("; ").map((el) => el.split("="));

      const auctionCookies = cookies.filter((cookie) =>
        cookie[0].startsWith("auctionPost")
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
    <div>
      {/* {auctionPosts &&
        auctionPosts.map((post, index) => (
          <div key={index}>
            <h1>{post.auctionTitle}</h1>
            <img
              src={"/upload/" + post.auctionImg.split(",", 1)}
              alt={post.auctionTitle}
            />
            {console.log(post.auctionImg)}
          </div>
        ))} */}
    </div>
  );
};

export default Sidebar;
