// import Carousel from 'react-bootstrap/Carousel';
// import images from '../src/components/1.png';
import styled from "styled-components";
// import { getAuctionBoard } from "./api/auctionBoard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWrench } from "@fortawesome/free-solid-svg-icons";


const Main = styled.div`
  display: grid;
  margin: 30px;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 80px 550px 150px;
  grid-template-areas:
    "g-left g-banner g-right" 
    "g-left g-newitem g-right"
    "g-lower g-lower g-lower";
  gap: 20px;
`;

const Banner = styled.div`
  grid-area: g-banner;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 217, 250);
  width: 80%;
  margin: 0 auto;
`;

const Left = styled.div`
  grid-area: g-left;
  border: 1px solid black;
`;

const NewItem = styled.div`
  grid-area: g-newitem;
  width: 100%;
  height: 50vh;
`;

const Right = styled.div`
  grid-area: g-right;
  border: 1px solid black;
`;

const Lower = styled.div`
  grid-area: g-lower;
  border: 1px solid black;
`;


const News = styled.div`
  /* border: 1px solid black; */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-content: space-between;
  gap: 10px;
  margin: 0 auto;
  max-width: 1000px;

  .new-box {
    width: 200px;
    height: 250px;
    background-color: rgba(234, 234, 234);
    border: 1px solid black;
    border-radius: 5%;
    transition: 0.5s;
    position: relative;
    z-index: 1;
    /* background-image: none; */

    .new-font {
      
      position: absolute;
      width: 80%;
      left: 10%;
      height: auto;
      text-align: center;
      bottom: 0;
      line-height: 1;
      

      h5 {

      }

      p {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 5px;
        height: 30px;
        border: 1px solid black;
        border-radius: 10px;
      }
    }
  }

  .new-box:hover {
    transform: scale(1.5);
    
    transform-origin: center;
    z-index: 2;
  }
`;



// const Middle = styled.div`

// `;


const Home=()=> {

  // const auctionBoardAPI = async () => {
  //   const result = await getAuctionBoard();
  // }

  return (
    <Main className='div-container'>
      
      <Left className='div-item'>

      </Left>
      
      <Banner>
        <h1>[ 주간 핫! 베스트 상품 ]</h1>
        {/* <h1>[ 주간 New 경매! ]</h1> */}
      </Banner>

      <NewItem className='div-item'>

        <News className='new-container'>
          <div className='new-box'>
            <div className='new-font'>
              <h5>게시글 제목</h5>
              <p>
                마감시간 :<span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
          <div className='new-box'>
            <div className='new-font'>
              <h5>게시글 제목</h5>
              <p>
                마감시간 :<span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
          <div className='new-box'>
            <div className='new-font'>
              <h5>게시글 제목</h5>
              <p>
                마감시간 :<span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
          <div className='new-box'>
            <div className='new-font'>
              <h5>게시글 제목</h5>
              <p>
                마감시간 :<span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
          <div className='new-box'>
            <div className='new-font'>
              <h5>게시글 제목</h5>
              <p>
                마감시간 :<span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
          <div className='new-box'>
            <div className='new-font'>
              <h5>게시글 제목</h5>
              <p>
                마감시간 :<span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
          <div className='new-box'>
            <div className='new-font'>
              <h5>게시글 제목</h5>
              <p>
                마감시간 :<span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
          <div className='new-box'>
            <div className='new-font'>
              <h5>게시글 제목</h5>
              <p>
                마감시간 : <span>30:05:20</span>
              </p>
              <p>
                현재가 : <span>30,000</span>원
              </p>
            </div>
          </div>
        </News>

        {/* <Carousel>
          <Carousel.Item interval={5000}>
            <img src={images} text="First slide"/>
            <Carousel.Caption>
              <h3>광고 1</h3>
              <p>사고 싶~ 쥐~</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img src={images} text="Second slide"/>
            <Carousel.Caption>
              <h3>광고 2</h3>
              <p>갖고 싶~ 쥐~</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img src={images} text="Third slide"/>
            <Carousel.Caption>
              <h3>광고 3</h3>
              <p>
                못사~ 쥐~
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img src={images} text="Second slide"/>
            <Carousel.Caption>
              <h3>광고 4</h3>
              <p>약오 르~ 쥐~</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img src={images} text="Second slide"/>
            <Carousel.Caption>
              <h3>광고 5</h3>
              <p>꼴 받~ 쥐~</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel> */}
      </NewItem>

      <Right className='div-item'>

      </Right>

      <Lower className="div-item">

      </Lower>
    </Main>
  );  
}

export default Home;