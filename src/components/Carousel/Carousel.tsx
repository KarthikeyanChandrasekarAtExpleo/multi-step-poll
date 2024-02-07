import { PollSectionModel } from "../../models/SectionModel";

interface CarouselContent extends PollSectionModel {
  index: number;
}
const Carousel = ({ question, index }: CarouselContent) => {
  const contentStyle = {
    height: "100%",
    display: "grid",
    placeContent: "center",
    color: "#fff",
    transform: `translateY(-${index * 100}%)`,
    transition: "all 1s ease",
  };
  return (
    <div id="carousel-content" style={contentStyle}>
      <div style={{ width: "200px" }}>
        <h1>{question}</h1>
      </div>
    </div>
  );
};

export default Carousel;
