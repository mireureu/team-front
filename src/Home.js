// import Carousel from 'react-bootstrap/Carousel';
// import images from '../src/components/1.png';
import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWrench } from "@fortawesome/free-solid-svg-icons";

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  grid-template-rows: auto 150px;
  grid-template-areas: 
    "g-left g-gonggo g-right"
    "g-lower g-lower g-lower";
`;

const Left = styled.div`
  grid-area: g-left;
`;

const GongGo = styled.div`
  grid-area: g-gonggo;
  width: 100%;
  height: 50vh;
  

`;

const Right = styled.div`
  grid-area: g-right;
`;

const Lower = styled.div`
  grid-area: g-lower;
`;


const Hot = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;

  .hot-box {
    width: 150px;
    height: 200px;
    background-color: rgba(172, 94, 192);
    border: 1px solid black;
    transition: 0.5s;
    position: relative;
    z-index: 1;
    background-image: null;

    .hot-font {
      position: absolute;
      width: 100%;
      height: 30%;
      text-align: center;
      bottom: 0;
      line-height: 1;
    }
  }

  .hot-box:hover {
    transform: scale(1.5);
    
    transform-origin: center;
    z-index: 2;
  }
`;



// const Middle = styled.div`

// `;


const Home=()=> {

  // const Hot = () => {
    
  // };

  return (
    <Main className='div-container'>
      
      <Left className='div-item'>

      </Left>
      
      <GongGo className='div-item'>

        <Hot className='hot-container'>
          <div className='hot-box'>
            <div className='hot-font'>
              <p>게시글 제목</p>
              <p>마감시간</p>
            </div>
          </div>
          <div className='hot-box'>
            <div className='hot-font'>
              <p>게시글 제목</p>
              <p>마감시간</p>
            </div>
          </div>
          <div className='hot-box'>
            <div className='hot-font'>
              <p>게시글 제목</p>
              <p>마감시간</p>
            </div>
          </div>
          <div className='hot-box'>
            <div className='hot-font'>
              <p>게시글 제목</p>
              <p>마감시간</p>
            </div>
          </div>
          <div className='hot-box'>
            <div className='hot-font'>
              <p>게시글 제목</p>
              <p>마감시간</p>
            </div>
          </div>
          <div className='hot-box'>
            <div className='hot-font'>
              <p>게시글 제목</p>
              <p>마감시간</p>
            </div>
          </div>
        </Hot>

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
      </GongGo>

      <Right className='div-item'>

      </Right>

      <Lower className="div-item">

      </Lower>
    </Main>
  );  
}

export default Home;