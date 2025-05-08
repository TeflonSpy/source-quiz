import React from 'react';
import { useQuiz } from './QuizContext';

const ExamSelector: React.FC = () => {
  const { setExam } = useQuiz();

  return (
    <>
      {/* <div className="header">
        <h1>Please Select Exam</h1>
      </div> */}
      <div className="sections">
        <section className="fundamental">
          <h2>Fundamental</h2>
          <div className="cards">
            <div className="card az-900" onClick={() => setExam('AZ-900')}>
              <span>AZ-900</span>
              <small>Azure Fundamentals</small>
            </div>
            <div className="card ai-900" onClick={() => setExam('AI-900')}>
              <span>AI-900</span>
              <small>Azure AI Fundamentals</small>
            </div>
            <div className="card dp-900" onClick={() => setExam('DP-900')}>
              <span>DP-900</span>
              <small>Azure Data Fundamentals</small>
            </div>
          </div>
        </section>
        <section className="professional">
          <h2>Professional</h2>
          <div className="cards">
            <div className="card az-104" onClick={() => setExam('AZ-104')}>
              <span>AZ-104</span>
              <small>Azure Administrator</small>
            </div>
            <div className="card az-204" onClick={() => setExam('AZ-204')}>
              <span>AZ-204</span>
              <small>Azure Developer</small>
            </div>
          </div>
        </section>
        <section className="expert">
          <h2>Expert</h2>
          <div className="cards">
            <div className="card az-305" onClick={() => setExam('AZ-305')}>
              <span>AZ-305</span>
              <small>Azure Architect</small>
            </div>
            <div className="card az-400" onClick={() => setExam('AZ-400')}>
              <span>AZ-400</span>
              <small>Azure DevOps Engineer</small>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ExamSelector;