import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import Summary from "./Summary";

const mockSetIsSummary = jest.fn();
const mockSubmitSummary = jest.fn();

const mockSummary = [
  {
    question: "How was your week overall?",
    answer: "Good",
  },
];
describe("Summary component", () => {
  test("renders all the summary", async () => {
    const { getByText } = render(
      <Summary
        summary={mockSummary}
        setSummary={mockSetIsSummary}
        submitSummary={mockSubmitSummary}
      />
    );

    await act(async () => {
      await userEvent.click(screen.getByText("Submit Response"));
    });
    expect(mockSubmitSummary).toHaveBeenCalled();
    expect(getByText("Q1 : How was your week overall?")).toBeInTheDocument();
    expect(getByText("Submit Response")).toBeInTheDocument();
  });
});
