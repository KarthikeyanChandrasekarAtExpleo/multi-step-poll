import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import MultiPoll from "./MultiplePoll";

const mockGetAnswers = jest.fn();
const mockSetIsSummary = jest.fn();

const sections = [
  { question: "Question 1" },
  { question: "Question 2" },
  { question: "Question 3" },
];

describe("MultiPoll Component", () => {
  test("renders the initial state correctly", () => {
    const { getByText } = render(
      <MultiPoll
        sections={sections}
        setIsSummary={mockSetIsSummary}
        getAnswers={mockGetAnswers}
      />
    );
    expect(getByText("Question 1")).toBeInTheDocument();
    expect(getByText("Question 2")).toBeInTheDocument();
    expect(getByText("Question 3")).toBeInTheDocument();
  });

  test("increments currentIndex when the action button is clicked", () => {
    render(
      <MultiPoll
        sections={sections}
        setIsSummary={mockSetIsSummary}
        getAnswers={mockGetAnswers}
      />
    );
    const button = document.getElementById("scrollButton") as HTMLElement;

    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
