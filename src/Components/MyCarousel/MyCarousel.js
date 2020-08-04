import React, { useState } from "react";
import Carousel from "react-simply-carousel";
import oneJpeg from './wwcarousel/1.jpeg';
import twoJpeg from './wwcarousel/2.jpeg';
import threeJpeg from './wwcarousel/3.jpeg';
import fourJpeg from './wwcarousel/4.jpeg';
import fiveJpeg from './wwcarousel/5.jpeg';
import sixJpeg from './wwcarousel/6.jpeg';
import sevenJpeg from './wwcarousel/7.jpeg';
import eightJpeg from './wwcarousel/8.jpeg';

function MyCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const picArr = [
    oneJpeg, twoJpeg, threeJpeg, fourJpeg, fiveJpeg, sixJpeg, sevenJpeg, eightJpeg ]

  return (
    <div>
      <Carousel
        containerProps={{
          style: {
            width: "100%",
            justifyContent: "space-between"
          }
        }}
        activeSlideIndex={activeSlide}
        activeSlideProps={{
          style: {
            background: "blue"
          }
        }}
        onRequestChange={setActiveSlide}
        forwardBtnProps={{
          children: ">",
          style: {
            width: 80,
            height: 40,
            minWidth: 60,
            alignSelf: "center"
          }
        }}
        backwardBtnProps={{
          children: "<",
          style: {
            width: 80,
            height: 40,
            minWidth: 60,
            alignSelf: "center"
          }
        }}
        itemsToShow={1}
        speed={400}
      >
        {picArr.map((item, index) => (
          <div
            style={{
              background: "red",
              width: 720,
              height: 405,
              textAlign: "center",
              lineHeight: "240px",
              boxSizing: "border-box"
            }}
            key={index}
          >
            <img src={item} alt='default wallpapers' style={{
              width: 720,
              height: 405,

            }} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default MyCarousel;