export interface PollContentModel {
  sections: PollSectionModel[];
  setIsSummary: (value: boolean) => void;
  getAnswers: (value: questionAndAnswerModel[]) => void;
}

export interface questionAndAnswerModel {
  question: string;
  answer: string;
}

export interface PollSectionModel {
  question: string;
}
