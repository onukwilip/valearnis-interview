import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Icon, Radio } from "semantic-ui-react";
import Glassmorphism from "../components/Glassmorphism";
import css from "../styles/quiz/Quiz.module.scss";
import questions from "../questions.json";

const Questions = ({
  question,
  length,
  setCurrentQuestion,
  endQuiz,
  setAnswers,
}) => {
  const [answer, setAnswer] = useState(null);
  const [disableNext, setDisableNext] = useState(true);
  const [disablePrev, setDisablePrev] = useState(true);

  const answerQuestion = (e, value, isCorrect) => {
    setAnswer(value);
    const newAnswer = {
      _id: question._id,
      question: question.question,
      isCorrect: isCorrect,
    };
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question._id]: { ...newAnswer },
    }));
    setDisableNext(false);
  };

  const onNextClick = () => {
    if (question._id < length - 1) {
      setCurrentQuestion((curr) => curr + 1);
    } else {
      endQuiz();
    }
  };

  const onPrevClick = () => {
    if (question._id === 0) {
      setDisablePrev(true);
      return;
    }
    setCurrentQuestion((curr) => curr - 1);
  };

  useEffect(() => {
    setDisableNext(true);
    setAnswer(null);
    if (question._id > 0) setDisablePrev(false);
    if (question._id === 0) setDisablePrev(true);
  }, [question]);

  return (
    <Glassmorphism className={css.questions}>
      <div className={css.question}>
        Q{question?._id + 1}/{length}: {question.question}?
      </div>
      <Divider />
      <div className={css.options}>
        {question.options.map((option, i) => (
          <Form.Field key={i}>
            <Radio
              name="options"
              value={i}
              checked={answer === i}
              onChange={(e, { value }) => {
                answerQuestion(e, value, option.isCorrect);
              }}
              slider
              color="white"
            />
            <em>{option.text}</em>
          </Form.Field>
        ))}
      </div>
      <Divider />
      <div className={css.actions}>
        <Button animated onClick={onPrevClick} disabled={disablePrev}>
          <Button.Content visible>Previous</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow left" />
          </Button.Content>
        </Button>
        <Button animated disabled={disableNext} onClick={onNextClick}>
          <Button.Content visible>Next</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
      </div>
    </Glassmorphism>
  );
};

const Finished = ({ result, length, restartQuiz }) => {
  const [parsedResults, setParsedResults] = useState([]);

  useEffect(() => {
    for (const key in result) {
      setParsedResults((prev) => [...prev, result[key]]);
    }
  }, [result]);

  return (
    <Glassmorphism className={css.finished}>
      <em>Quiz finished</em>
      <Divider />
      <div className={css.result}>
        <em>
          <b>Questions passed:</b>{" "}
          {
            parsedResults.filter((eachResult) => eachResult.isCorrect === true)
              .length
          }
          /{length}
        </em>
        <em>
          <b>Questions failed:</b>{" "}
          {
            parsedResults.filter((eachResult) => eachResult.isCorrect === false)
              .length
          }
          /{length}
        </em>
        <em>
          <b>Total average:</b>{" "}
          {(
            (parsedResults.filter((eachResult) => eachResult.isCorrect === true)
              .length /
              length) *
            100
          ).toFixed(1)}
          %
        </em>
      </div>
      <Divider />
      <div className={css.actions}>
        <Button animated="vertical" onClick={restartQuiz}>
          <Button.Content visible>Restart</Button.Content>
          <Button.Content hidden>
            <Icon name="redo" />
          </Button.Content>
        </Button>
      </div>
    </Glassmorphism>
  );
};

const StartQuiz = ({ startQuiz }) => {
  return (
    <Glassmorphism className={css["start-quiz"]}>
      <em>Welcome to GO Quiz</em>
      <Divider />
      <div className={css.information}>
        You are about to start the quiz. Click the start button below whenever
        you are ready.
      </div>
      <div className={css.actions}>
        <Button animated="vertical" onClick={startQuiz}>
          <Button.Content hidden>Start</Button.Content>
          <Button.Content visible>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
      </div>
    </Glassmorphism>
  );
};

const Quiz = () => {
  const [quizState, setQuizState] = useState("start");
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [answers, setAnswers] = useState({});

  const startQuiz = () => {
    setQuizState("ongoing");
    setCurrentQuestion(0);
  };

  const restartQuiz = () => {
    setQuizState("start");
    setAnswers({});
  };

  return (
    <div className={css.quiz}>
      {quizState === "start" ? (
        <>
          <StartQuiz startQuiz={startQuiz} />
        </>
      ) : quizState === "ongoing" ? (
        <>
          <Questions
            question={questions[currentQuestion]}
            length={questions.length}
            setCurrentQuestion={setCurrentQuestion}
            endQuiz={() => {
              setQuizState("finished");
            }}
            setAnswers={setAnswers}
          />
        </>
      ) : (
        <>
          <Finished
            result={answers}
            length={questions.length}
            restartQuiz={restartQuiz}
          />
        </>
      )}
    </div>
  );
};

export default Quiz;
