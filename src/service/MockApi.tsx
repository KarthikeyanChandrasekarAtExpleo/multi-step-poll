import { questionAndAnswerModel } from "../models/SectionModel";

const getPollContent = (): Promise<Response> => {
  return fetch("https://m6d03.wiremockapi.cloud/sections");
};

const submitPollContent = (
  body: questionAndAnswerModel[]
): Promise<Response> => {
  return fetch("https://m6d03.wiremockapi.cloud/pollResponses", {
    method: "post",
    headers: {
      Accept: "application-json",
      "content-type": "application-json",
    },
    body: JSON.stringify(body),
  });
};
export { getPollContent, submitPollContent };
