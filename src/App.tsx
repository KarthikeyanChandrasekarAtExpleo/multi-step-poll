import { useEffect, useState } from "react";
import "./App.css";
import MultiPoll from "./components/MultiPoll/MultiplePoll";
import Summary from "./components/Summary/Summary";
import {
  PollContentModel,
  questionAndAnswerModel,
} from "./models/SectionModel";
import { getPollContent, submitPollContent } from "./service/MockApi";
import { Alert, Fade, Snackbar } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

function App() {
  const [polls, setPolls] = useState<PollContentModel>();

  const [isSummary, setIsSummary] = useState(false);

  const [answers, setAnswers] = useState<questionAndAnswerModel[]>([]);

  const [snackState, setSnackState] = useState<{
    open: boolean;
    message: string;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    message: "Success",
    Transition: Fade,
  });

  const getPolls = async () => {
    try {
      const result = await getPollContent();
      const data = await result.json();
      setPolls(data?.data ?? { sections: [] });
    } catch (error) {
      return new Error(`${error}`);
    }
  };

  useEffect(() => {
    document.title = "Poll";
    getPolls();
  }, []);

  const updateSummaryFlag = (value: boolean) => {
    setIsSummary(value);
  };

  const handleAnswers = (value: questionAndAnswerModel[]) => {
    setAnswers(value);
  };

  const handleSubmit = async () => {
    try {
      const response: Response = await submitPollContent(answers);
      if (!response.ok) console.log(`POST failed with ${response.status}`);
      setSnackState({ open: true, message: "success", Transition: Fade });
      setIsSummary(false);
    } catch (error) {
      setSnackState({ open: true, message: `${error}`, Transition: Fade });
      throw new Error(`${error}`);
    }
  };

  const handleSnackClose = () => {
    setSnackState({
      ...snackState,
      open: false,
    });
  };

  return (
    <>
      {polls && !isSummary && (
        <MultiPoll
          sections={polls.sections}
          setIsSummary={updateSummaryFlag}
          getAnswers={handleAnswers}
        />
      )}
      {isSummary && (
        <Summary
          summary={answers}
          setSummary={updateSummaryFlag}
          submitSummary={handleSubmit}
        />
      )}
      <Snackbar
        open={snackState.open}
        onClose={handleSnackClose}
        TransitionComponent={snackState.Transition}
        message={snackState.message}
        key={snackState.Transition.name}
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackState.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
