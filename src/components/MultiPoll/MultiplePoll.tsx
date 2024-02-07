import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { Reaction } from "../../models/Reaction-enum";
import {
  PollContentModel,
  questionAndAnswerModel,
} from "../../models/SectionModel";
import Carousel from "../Carousel/Carousel";
import "./MultiplePoll.css";

const MultiPoll = ({
  sections,
  setIsSummary,
  getAnswers,
}: PollContentModel) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<questionAndAnswerModel[]>([]);

  const handleButtonClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleActionAndNavigate = (action: number) => {
    const obj = {
      question: sections[currentIndex].question,
      answer: Reaction[action],
    };

    setAnswers((answer) => [...answer, obj]);
    setCurrentIndex(currentIndex + 1);
    if (currentIndex === sections.length - 1) {
      getAnswers([...answers, obj]);
      setIsSummary(true);
    }
  };

  return (
    <div className="flex-container">
      <div className="scroll-container">
        <div
          style={{
            display: "inline",
          }}
        >
          {sections?.map((section, i) => {
            return (
              <Carousel
                index={currentIndex}
                key={i}
                question={section.question}
              />
            );
          })}
        </div>
        <div className="carousel-buttons">
          {sections?.map((section, index) => {
            return (
              <button
                id="scrollButton"
                className={
                  "indicator " + (index === currentIndex ? "active" : "")
                }
                onClick={() => handleButtonClick(index)}
                key={index}
              ></button>
            );
          })}
        </div>
      </div>
      <div className="action-container">
        <div className="action-container-buttons">
          <div className="thumbs-up">
            <Tooltip title="Good" placement="left">
              <IconButton
                onClick={() => handleActionAndNavigate(1)}
                aria-label="good"
              >
                <ThumbUpIcon
                  fontSize="large"
                  sx={{ color: "#54fe69", fontSize: 60 }}
                />
              </IconButton>
            </Tooltip>
          </div>

          <div className="smile-sad">
            <Tooltip title="Moderate" placement="top">
              <IconButton
                onClick={() => handleActionAndNavigate(2)}
                aria-label="Moderate"
              >
                <SentimentDissatisfiedIcon
                  fontSize="large"
                  sx={{ color: "#fec854", fontSize: 60 }}
                />
              </IconButton>
            </Tooltip>
          </div>
          <div className="thumbs-down">
            <Tooltip title="Poor" placement="right">
              <IconButton
                className=""
                onClick={() => handleActionAndNavigate(3)}
                aria-label="ThumbDown"
              >
                <ThumbDownIcon
                  fontSize="large"
                  sx={{ color: "#fe5467", fontSize: 60 }}
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiPoll;
