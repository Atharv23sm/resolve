"use client";
import { useEffect, useState } from "react";
import { baseUrl } from "@/utils/baseUrl";
import { useUserStore } from "@/store/user";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { MdQuestionAnswer } from "react-icons/md";
import { pusherClient } from "@/app/lib/pusher";
// import { BiDownvote, BiUpvote } from "react-icons/bi";
import axios from "axios";
import ButtonLoading from "@/app/components/Loaders/ButtonLoading";
import Error from "@/app/components/Errors/Error";
import Attachments from "@/app/components/Attachments";
import AddButton from "@/app/components/AddButton";
import UploadWidget from "@/app/components/UploadWidget";

export default function Question({ params }: { params: { questionId: any } }) {
  const [answer, setAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);
  const [showReplies, setShowReplies] = useState(4);
  const [question, setQuestion] = useState({
    username: "",
    question: "",
    topic: [],
    date: "",
    imagePublicIds: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let [imagePublicIds, setImagePublicIds] = useState([] as string[]);

  const { user, getUser } = useUserStore((state: any) => ({
    user: state.user,
    getUser: state.getUser,
  }));

  async function getQuestion(qId: any) {
    setLoading(true);
    const res = await axios.post(`${baseUrl}questions/getquestion`, { qId });
    setLoading(false);
    if (res.data.message == "Question found") {
      setQuestion(res.data.question);
    } else {
      setError("Something went wrong.");
      setTimeout(() => setError(""), 3000);
    }
  }

  async function getAllAnswers(qId: any) {
    const res = await axios.post(`${baseUrl}questions/getanswers`, { qId });
    setLoading(false);
    if (res.data.message == "Answers found") {
      setAllAnswers(res.data.allAnswers);
    } else {
      setError("Something went wrong.");
      setTimeout(() => setError(""), 3000);
    }
  }

  const addAnswer = async () => {
    const response = await axios.post(`${baseUrl}questions/addanswer`, {
      username: user.username,
      questionId: params.questionId,
      question: question.question,
      answer,
      imagePublicIds,
    });
    setLoading(false);
    if (!response.data.success) {
      setError("Something went wrong.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    await addAnswer();
    setAnswer("");
    setImagePublicIds([]);
    getAllAnswers(params.questionId);
  };

  // const vote = async (votetype: string) => {
  //   await axios.post(`${baseUrl}questions/vote`, { votetype });
  // };

  useEffect(() => {
    getUser();
    getQuestion(params.questionId);
    getAllAnswers(params.questionId);

    pusherClient.subscribe("AnsChannel");

    pusherClient.bind("onAnswerChange", (allAnswers: any) => {
      setAllAnswers(allAnswers);
    });

    return () => {
      pusherClient.unsubscribe("AnsChannel");
    };
  }, [params.questionId]);

  const allAnsLen = allAnswers.length;

  return (
    <div className={`md:ml-[25vw] lg:ml-[20vw] ${loading && "pt-10"}`}>
      {error && <Error error={error} />}
      {!loading ? (
        <>
          <div className={`p-[48px_16px_32px] md:py-8 space-y-4 bg-3`}>
            <div className="text-xs flex justify-between">
              <div>
                {question?.username}
                <span className="text-f8"> is asking,</span>
              </div>
              <div>
                {new Date(question?.date).toLocaleDateString() +
                  " - " +
                  new Date(question?.date).toLocaleTimeString()}
              </div>
            </div>
            <div className="text-lg font-bold whitespace-pre-line">
              {question?.question}
            </div>
            <Attachments att={question?.imagePublicIds} />
            <div className="text-xs text-f8 flex flex-wrap gap-1">
              {question?.topic.map((t: string) => {
                return <div key={t}>{t}</div>;
              })}
            </div>
          </div>

          <div className="flex gap-4 p-4 border-y border-f2 bg-2">
            <textarea
              rows={4}
              placeholder="share you answer"
              className="bg-black p-2 w-[100%] placeholder:text-sm"
              onChange={(e: any) => setAnswer(e.target.value)}
            />
            <div className="flex flex-col gap-4 justify-between items-center">
              <UploadWidget imagePublicIds={imagePublicIds}/>
              <AddButton
                loading={loading}
                ip={answer}
                handleClick={handleClick}
              />
            </div>
          </div>
          <div className="p-4 flex gap-2 items-center text-sm bg-2">
            <MdQuestionAnswer size={20} />
            {(showReplies >= allAnsLen ? allAnsLen : showReplies) +
              " / " +
              allAnsLen}
            {showReplies < allAnsLen ? (
              <GoTriangleDown
                className="cursor-pointer"
                size={20}
                onClick={() => setShowReplies(showReplies + 4)}
              />
            ) : (
              <GoTriangleUp
                className="cursor-pointer"
                size={20}
                onClick={() => setShowReplies(4)}
              />
            )}
          </div>
          <div>
            {allAnswers.slice(0, showReplies).map((a: any) => {
              return (
                <div
                  key={a?._id}
                  className="space-y-4 p-[32px_16px] border-t border-f2"
                >
                  <div className="text-xs flex justify-between">
                    <div>
                      {a?.username}
                      <span className="text-f8"> answered,</span>
                    </div>
                    <div>
                      {new Date(a?.date).toLocaleDateString() +
                        " - " +
                        new Date(a?.date).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="whitespace-pre-line italic">{a?.answer}</div>

                  <Attachments att={a?.imagePublicIds} />

                  {/* <div className="pt-4 flex gap-6 items-center">
                    <div className="flex gap-1 items-center">
                      <BiUpvote className="cursor-pointer" size={28} onClick={() => vote("up")} />{" "}
                      {a?.upvotes}
                    </div>
                    <div className="flex gap-1 items-center">
                      <BiDownvote className="cursor-pointer" size={28} onClick={() => vote("down")} />{" "}
                      {a?.downvotes}
                    </div>
                  </div> */}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <ButtonLoading />
      )}
    </div>
  );
}
