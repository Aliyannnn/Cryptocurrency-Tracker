import "./Banner.css";
import Carousel from "./Carousel";


function Banner() {
  return (
    <div className="banner">
      <div className="banner-overlay">
        <div className="banner-content">
          <div className="tagline">
            <h2 className="title">Crypto Tracker</h2>
            <p className="subtitle">
              Get all the info regarding your favorite crypto currency
            </p>
          </div>
          <div className="carousel-wrapper">
            <Carousel/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
