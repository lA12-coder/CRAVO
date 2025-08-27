import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { image } from "@/assets/image/img";
import "./Carousel.css";

class FoodCarousel extends Component {
  render() {
    return (
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <Carousel
            infiniteLoop={true}
            showThumbs={false}
            autoPlay={true}
            showIndicators={true}
            showStatus={false}
            showArrows={true}
            interval={4000}
            transitionTime={800}
            stopOnHover={true}
            swipeable={true}
            emulateTouch={true}
            className="stunning-carousel"
          >
            {image.map((imgsrc, index) => (
              <div key={index} className="carousel-slide">
                <div className="image-container">
                  <img
                    src={imgsrc}
                    alt={`Delicious food ${index + 1}`}
                    className="carousel-image"
                  />
                </div>
              </div>
            ))}
          </Carousel>

          <div className="image-overlay">
            <div className="overlay-content">
              <h2 className="carousel-title">
                The Fastest Delivery In The City
              </h2>
              <p className="carousel-subtitle">
                Experience the finest culinary delights
              </p>
              <button className="explore-btn">Order Now</button>
            </div>
          </div>

          <div className="carousel-features">
            <div className="feature">
              <div className="feature-icon">🍽️</div>
              <span>Fresh Ingredients</span>
            </div>
            <div className="feature">
              <div className="feature-icon">👨‍🍳</div>
              <span>Expert Chefs</span>
            </div>
            <div className="feature">
              <div className="feature-icon">⭐</div>
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FoodCarousel;
