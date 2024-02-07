import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  CardActions,
  CardHeader,
  IconButton,
  Tooltip,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { questionAndAnswerModel } from "../../models/SectionModel";

interface SummaryModel {
  summary: questionAndAnswerModel[];
  setSummary: (value: boolean) => void;
  submitSummary: () => void;
}
const Summary = ({ summary, setSummary, submitSummary }: SummaryModel) => {
  return (
    <div style={{ margin: "2rem" }}>
      <Card>
        <CardHeader
          sx={{ backgroundColor: "#6b54fe", color: "white" }}
          action={
            <Tooltip placement="left" title="Back to Poll">
              <IconButton onClick={() => setSummary(false)} aria-label="back">
                <ArrowBackIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Tooltip>
          }
          title="Summary"
          subheader=""
        />
        <CardContent>
          {summary.map((summary, index) => {
            return (
              <ul key={index} style={{ listStyle: "none" }}>
                <li>
                  <h3>
                    Q{index + 1} : {summary.question}
                  </h3>
                  <h3 style={{ color: "#08d75d" }}>A : {summary.answer}</h3>
                </li>
              </ul>
            );
          })}
        </CardContent>
        <CardActions>
          <Button id="submit-button" onClick={submitSummary} variant="outlined">
            Submit Response
          </Button>
        </CardActions>
      </Card>

      <div style={{ display: "flex" }}></div>
    </div>
  );
};

export default Summary;
