type question = {
  _id: string;
  username: string;
  question: string;
  topic: string[];
  date: string;
  imagePublicIds: string[];
};

type answer = {
  _id: string;
  username: string;
  questionId: string;
  question: string;
  answer: string;
  date: Date;
  imagePublicIds: string[];
  upvotes: number;
};
