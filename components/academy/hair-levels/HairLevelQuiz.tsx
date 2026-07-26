import type { HairLevelQuizQuestion } from "@/lib/academy/hairLevels";

type HairLevelQuizProps = {
  questions: HairLevelQuizQuestion[];
  answers: Record<string, string>;
  isSubmitted: boolean;
  onAnswer: (
    questionId: string,
    option: string,
  ) => void;
  onSubmit: () => void;
  onReset: () => void;
};

export default function HairLevelQuiz({
  questions,
  answers,
  isSubmitted,
  onAnswer,
  onSubmit,
  onReset,
}: HairLevelQuizProps) {
  const answeredCount = questions.filter(
    (question) => Boolean(answers[question.id]),
  ).length;

  const score = questions.filter(
    (question) =>
      answers[question.id] ===
      question.correctOption,
  ).length;

  const canSubmit =
    answeredCount === questions.length;

  return (
    <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
        Knowledge check
      </p>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Hair Levels quiz
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
            Answer every question, then submit your
            responses to review the reasoning behind
            each answer.
          </p>
        </div>

        <p className="text-sm text-white/40">
          {answeredCount} of {questions.length} answered
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {questions.map((question, index) => {
          const selectedAnswer =
            answers[question.id];

          const isCorrect =
            selectedAnswer ===
            question.correctOption;

          return (
            <fieldset
              key={question.id}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <legend className="px-2 text-sm font-semibold text-white">
                {index + 1}. {question.prompt}
              </legend>

              <div className="mt-4 grid gap-3">
                {question.options.map((option) => {
                  const isSelected =
                    selectedAnswer === option;

                  return (
                    <label
                      key={option}
                      className={
                        isSelected
                          ? "flex cursor-pointer items-start gap-3 rounded-2xl border border-amber-300/40 bg-amber-300/10 p-4"
                          : "flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:border-white/20"
                      }
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={isSelected}
                        disabled={isSubmitted}
                        onChange={() =>
                          onAnswer(
                            question.id,
                            option,
                          )
                        }
                        className="mt-1"
                      />

                      <span className="text-sm leading-6 text-white/65">
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>

              {isSubmitted ? (
                <div
                  className={
                    isCorrect
                      ? "mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4"
                      : "mt-4 rounded-2xl border border-red-300/20 bg-red-300/10 p-4"
                  }
                >
                  <p className="text-sm font-semibold text-white">
                    {isCorrect
                      ? "Correct"
                      : `Correct answer: ${question.correctOption}`}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {question.explanation}
                  </p>
                </div>
              ) : null}
            </fieldset>
          );
        })}
      </div>

      {isSubmitted ? (
        <div className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-5">
          <p className="text-sm text-white/50">
            Final score
          </p>

          <p className="mt-1 text-3xl font-semibold text-white">
            {score} / {questions.length}
          </p>

          <p className="mt-3 text-sm leading-6 text-white/55">
            {score === questions.length
              ? "Excellent. You demonstrated a strong understanding of the professional level system."
              : "Review the explanations above, revisit the interactive chart, and try the quiz again when ready."}
          </p>

          <button
            type="button"
            onClick={onReset}
            className="mt-5 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:border-white/25 hover:text-white"
          >
            Retake quiz
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={!canSubmit}
          onClick={onSubmit}
          className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-amber-300 px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
        >
          Submit answers
        </button>
      )}
    </section>
  );
}