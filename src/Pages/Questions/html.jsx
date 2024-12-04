import React from "react";
import Layout from "../../components/global/layout";
import shared from "./shared";

const HTML = ({
  handleRadioChange,
  handleNext,
  handleBack,
  currentQuestion,
  form,
  currentIndex,
}) => {
  return (
    <Layout>
      <div className="shadow-box  w-full bg-white rounded-lg mt-6">
        <div className=" p-5 border-b flex items-center justify-between border-[#474e9c3b] ">
          <h3 className="text-[17px] font-[500] text-[#205dff]">
            Question {currentIndex + 1}
          </h3>
          <div className=" flex items-center">
            <progress
              className="w-[250px] h-[6px] rounded-full"
              id="file"
              value={currentIndex + 1} max={shared.questions.length}
            >
              {Math.floor(((currentIndex + 1) / shared.questions.length) * 100)}%
            </progress>
            <p className="ml-2">
            {currentIndex + 1}/{shared.questions.length}
            </p>
          </div>
        </div>
        <div className="p-5">
          <div>
            <h3 className="text-[15px] mb-3 text-[#353434] font-[500]">
              {currentQuestion.question}
            </h3>
          </div>
          {currentQuestion.options.map((option, idx) => (
            <div key={idx}>
              <input
                type="radio"
                value={option}
                checked={form[currentQuestion.question] === option}
                onChange={() =>
                  handleRadioChange(currentQuestion.question, option)
                }
                required
              />
              <label className="ml-3 text-[14px] font-[400] text-[#3c3a3a]">
                {option}
              </label>
            </div>
          ))}
          <div className="mt-3">
            {form[currentQuestion.question] === "Other" && (
              <>
            <p className="mb-1 text-[14px] font-[400] text-[#3c3a3a]">
              Write your answer
            </p>
              <input
                className="border rounded-lg h-10  px-2"
                type="text"
                label="Please specify"
                value={form[currentQuestion.question + "Other"] || ""}
                onChange={(e) =>
                  handleRadioChange(
                    currentQuestion.question + "Other",
                    e.target.value
                  )
                }
                required
              />
              </>
            )}
          </div>
          <div className="flex items-center justify-end mt-5">
            <button
              className="bg-[#dfdede] text-[15px] py-2 px-5 rounded-lg text-[#262626] mr-3"
              onClick={handleBack}
              disabled={currentIndex === 0}
            >
              Back
            </button>
            <button
              className="text-white bg-[#0065FF] px-5 py-2  rounded-lg hover:opacity-[90%] "
              onClick={handleNext}
              disabled={currentIndex === shared.questions.length - 1}
            >
              Next question
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HTML;
