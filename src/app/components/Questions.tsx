"use client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { baseUrl } from "@/utils/baseUrl";
import { BsThreeDotsVertical } from "react-icons/bs";
import Error from "./Errors/Error";
import axios from "axios";
import { MyQueContext } from "@/helpers/useMyQueContext";
import Skeleton from "./Loaders/Skeleton";

export default function Questions({
  questions,
  loading,
  error,
}: {
  questions: Array<question>;
  loading: boolean;
  error: string;
}) {
  const { getMyQuestions, isMyQue, setLoading, setError } =
    useContext(MyQueContext);
  const [showMore, setShowMore] = useState("");
  const router = useRouter();

  const deleteQuestion = async (qid: string) => {
    if (confirm("Are you sure? You are deleting this answer.")) {
      setLoading(true);
      const response = await axios.post(`${baseUrl}questions/deletequestion`, {
        qid,
      });
      if (response.data.message == "Question deleted") {
        getMyQuestions();
      } else {
        setLoading(false);
        setError(response.data.error);
      }
    }
  };

  return (
    <>
      {error && <Error error={error} />}
      <div className={`p-0 border-t-2 border-[#fff1] select-text`}>
        {!loading ? (
          questions.length < 1 ? (
            <div className="text-center pt-10 md:pt-4 p-4">No results.</div>
          ) : (
            questions.map((q: question) => {
              return (
                <div
                  key={q?._id}
                  className={`p-[32px_16px] space-y-4 border-b-2 border-[#fff1] ${
                    !isMyQue && "cursor-pointer"
                  } hover:bg-[#0e0e0e] duration-300 relative`}
                  onClick={() =>
                    !isMyQue && router.push(`/home/question/${q?._id}`)
                  }
                >
                  <div className="text-xs flex justify-between">
                    <div>
                      {q?.username}
                      <span className="text-f8"> is asking,</span>
                    </div>
                    <div>
                      {new Date(q?.date).toLocaleDateString() +
                        " - " +
                        new Date(q?.date).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-lg font-bold whitespace-pre-line">
                    {q?.question}
                  </div>
                  <div className="text-xs text-f8 flex flex-wrap gap-1">
                    {q?.topic.map((t: string) => {
                      return <div key={t}>{t}</div>;
                    })}
                  </div>
                  {isMyQue && (
                    <>
                      <div className="absolute right-2 bottom-2">
                        <BsThreeDotsVertical
                          className="cursor-pointer"
                          onClick={() => setShowMore(q?._id)}
                        />
                      </div>
                      <div
                        className={`bg-black text-sm absolute bottom-2 right-6 cursor-pointer ${
                          showMore === q?._id ? "block" : "hidden"
                        }`}
                        onMouseLeave={() => setShowMore("")}
                      >
                        <div
                          className="p-[8px_16px] hover:bg-2 duration-300"
                          onClick={() =>
                            router.push(`/home/question/${q?._id}`)
                          }
                        >
                          View Question
                        </div>
                        <div
                          className="p-[8px_16px] hover:bg-[#f00] duration-300 text-[#f00] hover:text-white"
                          onClick={() => deleteQuestion(q._id)}
                        >
                          Delete
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )
        ) : (
          <Skeleton />
        )}
      </div>
    </>
  );
}
