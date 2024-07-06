"use client";
import { useEffect, useState } from "react";
import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";
import Questions from "@/app/components/Questions";
import { MyQueContext } from "@/helpers/useMyQueContext";

export default function Topic({ params }: { params: { username: string } }) {
  const [myQuestions, setMyQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getMyQuestions() {
    const username = params.username;
    const res = await axios.post(`${baseUrl}questions/filterbyuser`, {
      username,
    });
    setLoading(false);
    if (res.data.message == "My questions found") {
      setMyQuestions(res.data.myQuestions);
    } else {
      setError("Something went wrong.");
      setTimeout(() => setError(""), 3000);
    }
  }

  useEffect(() => {
    setLoading(true);
    getMyQuestions();
  }, []);

  return (
    <div className="md:ml-[25vw] lg:ml-[20vw]">
      <div className="pt-10 md:pt-4 p-4 font-bold">My Questions</div>
      <MyQueContext.Provider
        value={{ getMyQuestions, isMyQue: true, setLoading, setError }}
      >
        <Questions questions={myQuestions} loading={loading} error={error} />
      </MyQueContext.Provider>
    </div>
  );
}
