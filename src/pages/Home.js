
import styled from "styled-components";


const Main = styled.div`
  display: grid;
  grid-template-rows: 300px auto, 300px;
`;

const GongGo = styled.div`
  margin-top: 70px;
  width: 100%;
  height: 50vh;
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


  }

  .hot-box:hover {
    transform: scale(1.5);
    
    transform-origin: center;
  }
`;


// const Middle = styled.div`

// `;


const Home=()=> {

  // const Hot = () => {
    
  // };

  return (
    <Main className='div-container'>
      <GongGo className='div-item'>

        <Hot className='hot-container'>
          <div className='hot-box'>
            <div>
              <p>게시글 제목</p>
              <p>마감시간</p>
            </div>
          </div>
          <div className='hot-box'>B</div>
          <div className='hot-box'>C</div>
          <div className='hot-box'>D</div>
          <div className='hot-box'>E</div>
          <div className='hot-box'>F</div>
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

      <div className='div-item'>

      </div>

      <div className='div-item'>

      </div>
    </Main>
  );  
}

export default Home;