
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styles from './app.module.css';
import Header from './header';
import Login from './login';
import List from './quizzes/list';
import Landing from './quizzes/landing';
import Quiz from './quizzes/quiz';
import QuestionForm from './forms/question';
import QuizDetail from './quizzes/detail';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.body}>
          <Route path="/" component={Header} />
          <main className={styles.main__container}>
            <Route path="/" exact component={Landing} />
            <Route path="/login" exact component={Login} />
            <Route path="/quiz/:id" exact component={Quiz} />
            <Route path="/admin/quizzes" exact component={List} />
            <Route path="/admin/quizzes/:id" exact component={QuizDetail} />
            <Route path="/admin/questions/new/:quizId" exact component={QuestionForm} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
