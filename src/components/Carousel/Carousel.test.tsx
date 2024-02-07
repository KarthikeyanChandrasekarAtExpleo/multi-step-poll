import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Carousel from "./Carousel";

describe("Carousel Component", () => {
  test("renders with the correct question and applies styles based on the index", () => {
    const question = "Test Question";
    const index = 1;

    const { getByText } = render(
      <Carousel question={question} index={index} />
    );

    expect(getByText(question)).toBeInTheDocument();

    const carouselContent = document.getElementById("carousel-content");
    expect(carouselContent).toHaveStyle(
      `transform: translateY(-${index * 100}%)`
    );
  });
});
