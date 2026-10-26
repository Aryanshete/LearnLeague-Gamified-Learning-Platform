import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Check,
  X
} from 'lucide-react';
import { mockAssessments } from '../mock/mockAssessments.js';
import { useApp } from '../context/AppContext.jsx';

export default function AssessmentPage() {
  const { id } = useParams();
  const assessment = mockAssessments[id] || mockAssessments['quiz-dsa-01'];
  const { submitQuiz, quizResults } = useApp();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(assessment.durationMinutes * 60);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(Boolean(quizResults[assessment.id]));
  const [summary, setSummary] = useState(quizResults[assessment.id] || null);

  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, timeLeft]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optId) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [currentIdx]: optId }));
  };

  const handleSubmit = () => {
    setShowConfirm(false);
    let correct = 0;
    assessment.questions.forEach((q, i) => {
      if (answers[i] === q.correctOptionId) correct++;
    });

    const total = assessment.questions.length;
    const scorePct = Math.round((correct / total) * 100);
    const res = submitQuiz(assessment.id, scorePct, correct, total);

    setIsSubmitted(true);
    setSummary({
      scorePercentage: scorePct,
      correctCount: correct,
      totalCount: total,
      passed: scorePct >= assessment.passingScorePercentage,
      xpEarned: res.xpEarned
    });
  };

  const currentQ = assessment.questions[currentIdx];
  const answeredTotal = Object.keys(answers).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="surface-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
            Milestone Evaluation
          </span>
          <h1 className="text-lg font-bold text-white font-heading mt-1">
            {assessment.title}
          </h1>
        </div>

        {!isSubmitted && (
          <div className="flex items-center gap-3 text-xs shrink-0">
            <div className="px-3 py-1.5 rounded-lg bg-[#141824] border border-white/[0.08] font-mono text-white flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
            <span className="text-slate-400 font-mono">
              {answeredTotal}/{assessment.questions.length} Answered
            </span>
          </div>
        )}
      </div>

      {isSubmitted && summary ? (
        /* RESULTS VIEW */
        <div className="surface-card p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-3 pb-6 border-b border-white/[0.08]">
            <div
              className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center font-bold text-lg ${
                summary.passed
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {summary.passed ? '✓' : '✗'}
            </div>

            <div>
              <h2 className="text-xl font-bold text-white font-heading">
                Assessment Score: {summary.scorePercentage}%
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {summary.correctCount} of {summary.totalCount} questions answered correctly.
                Points credited to technical profile: <strong className="text-indigo-400">+{summary.xpEarned} XP</strong>.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-2">
              <Link
                to="/readiness"
                className="btn-primary text-xs flex items-center gap-1.5"
              >
                <span>Inspect PRS Formula</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setAnswers({});
                  setCurrentIdx(0);
                  setTimeLeft(assessment.durationMinutes * 60);
                }}
                className="btn-secondary text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retake Assessment</span>
              </button>
            </div>
          </div>

          {/* Solutions & Explanations */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Question Solutions & Detailed Explanations
            </h3>

            <div className="space-y-3">
              {assessment.questions.map((q, i) => {
                const userAns = answers[i];
                const isCorrect = userAns === q.correctOptionId;

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl bg-[#141824] border border-white/[0.06] space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-white">
                        {i + 1}. {q.question}
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                          isCorrect
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                      {q.options.map((opt) => {
                        const isChosen = userAns === opt.id;
                        const isActual = q.correctOptionId === opt.id;

                        let style = 'bg-[#090b10] border-white/[0.04] text-slate-400';
                        if (isActual) style = 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300';
                        else if (isChosen && !isActual) style = 'bg-rose-950/40 border-rose-500/40 text-rose-300';

                        return (
                          <div
                            key={opt.id}
                            className={`p-2 rounded-lg border text-[11px] ${style}`}
                          >
                            <span className="font-mono uppercase font-bold mr-1.5">{opt.id}.</span>
                            <span>{opt.text}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 text-[11px] text-slate-400 leading-relaxed border-t border-white/[0.04]">
                      <strong className="text-slate-300">Explanation: </strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* QUIZ TAKING VIEW */
        <div className="space-y-4">
          {/* Question Palette */}
          <div className="surface-card p-3 flex items-center justify-between gap-2 text-xs">
            <span className="text-slate-400">Questions:</span>
            <div className="flex items-center gap-1.5">
              {assessment.questions.map((_, i) => {
                const answered = answers[i] !== undefined;
                const active = currentIdx === i;

                let cls = 'bg-[#141824] text-slate-400 border-white/[0.08]';
                if (answered) cls = 'bg-indigo-600 text-white border-indigo-500';
                if (active) cls += ' ring-2 ring-indigo-400';

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIdx(i)}
                    className={`w-7 h-7 rounded-md border font-mono text-xs flex items-center justify-center transition-all ${cls}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Card */}
          <div className="surface-card p-6 space-y-5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Question {currentIdx + 1} of {assessment.questions.length}</span>
              <span>Single Choice</span>
            </div>

            <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-2 pt-2">
              {currentQ.options.map((opt) => {
                const selected = answers[currentIdx] === opt.id;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition-colors text-xs sm:text-sm ${
                      selected
                        ? 'bg-indigo-950/50 border-indigo-500 text-white'
                        : 'bg-[#141824] border-white/[0.06] text-slate-300 hover:border-white/[0.15]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                        selected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {opt.id.toUpperCase()}
                    </div>
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((p) => p - 1)}
                className="btn-secondary text-xs disabled:opacity-40"
              >
                Previous
              </button>

              {currentIdx < assessment.questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIdx((p) => p + 1)}
                  className="btn-primary text-xs"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowConfirm(true)}
                  className="btn-primary text-xs bg-emerald-600 hover:bg-emerald-500"
                >
                  Submit Assessment
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#11141d] border border-white/[0.1] rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white font-heading">
              Submit Assessment?
            </h3>
            <p className="text-xs text-slate-400">
              You have answered {answeredTotal} of {assessment.questions.length} questions.
              Your score and PRS component will calculate immediately.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="btn-secondary text-xs"
              >
                Review
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn-primary text-xs"
              >
                Confirm & Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
