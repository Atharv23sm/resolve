"use client";
import { useEffect, useState } from "react";
import { baseUrl } from "@/utils/baseUrl";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import ButtonLoading from "@/app/components/Loaders/ButtonLoading";
import Error from "@/app/components/Errors/Error";
import axios from "axios";

export default function Question({ params }: { params: { username: any } }) {
  const [myAnswers, setMyAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showMore, setShowMore] = useState(0);
  const router = useRouter();

  async function getMyAnswers() {
    const username = params.username;
    const res = await axios.post(`${baseUrl}questions/answerbyuser`, {
      username,
    });
    setLoading(false);
    if (res.data.message == "My Answers found") {
      setMyAnswers(res.data.myAnswers);
    } else {
      setError("Something went wrong.");
      setTimeout(() => setError(""), 3000);
    }
  }

  const deleteAnswer = async (aid: string, questionId: string) => {
    setLoading(true);
    const response = await axios.post(`${baseUrl}questions/deleteanswer`, {
      aid, questionId
    });
    if (response.data.message == "Answer deleted") {
      getMyAnswers();
    } else {
      setLoading(false);
      setError(response.data.error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getMyAnswers();
  }, []);

  return (
    <div className={`md:ml-[25vw] lg:ml-[20vw]`}>
      <div className={`pt-10 md:pt-4 p-4 border-b border-f2`}>
        My Answers
      </div>
      {error && <Error error={error} />}
      {!loading ? (
        <div className="border-b border-f2">
          {myAnswers.map((a: any) => {
            return (
              <div
                key={a?._id}
                className="p-[32px_16px] space-y-4 border-t border-f2 relative overflow-hidden hover:bg-[#0e0e0e]"
              >
                <div className="text-xs flex justify-between">
                  <div>Answering to,</div>
                  <div>
                    {new Date(a?.date).toLocaleDateString() +
                      " - " +
                      new Date(a?.date).toLocaleTimeString()}
                  </div>
                </div>
                <div className="font-bold text-sm">{a?.question}</div>
                <div className="whitespace-pre-line italic">{a?.answer}</div>
                <div className="absolute right-2 bottom-2">
                  <BsThreeDotsVertical
                    className="cursor-pointer"
                    onClick={() => setShowMore(a?._id)}
                  />
                </div>
                <div
                  className={`bg-black text-sm absolute bottom-2 right-6 cursor-pointer opacity-0 ${
                    showMore === a?._id && "opacity-100"
                  }`}
                  onMouseLeave={() => setShowMore(0)}
                >
                  <div
                    className="p-[8px_16px] hover:bg-2 duration-300"
                    onClick={() =>
                      router.push(`/home/question/${a?.questionId}`)
                    }
                  >
                    View Question
                  </div>
                  <div
                    className="p-[8px_16px] hover:bg-[#f00] duration-300 text-[#f00] hover:text-white"
                    onClick={() => deleteAnswer(a._id, a.questionId)}
                  >
                    Delete
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <ButtonLoading />
      )}
    </div>
  );
}
