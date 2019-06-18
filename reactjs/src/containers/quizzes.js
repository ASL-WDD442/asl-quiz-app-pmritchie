import React from 'react';
import API from '../API';

export default function container(Component) {
  return class QuizzesContainer extends React.Component {
    // the default state
    state = {
      userQuizzes: [],
      publicQuizzes: [],
      questions: [],
      choices: [],
      quiz: {},
    }

    getPublicQuizzes = async () => {
      const publicQuizzes = await API.get('/quizzes/public');
      this.setState({ publicQuizzes });
    }

    getUserQuizzes = async () => {
      const userQuizzes = await API.get('/quizzes');
      this.setState({ userQuizzes });
    }

    getOneQuiz = async (id) => {
      const quizArray = await API.get(`/quizzes/?id=${id}`);
      const quiz = { id: quizArray[0].id, name: quizArray[0].name };
      const questions = await API.get(`/questions/?quizId=${id}`);
      this.setState({ quiz, questions });
    }

    getQuizQuestions = async (id) => {
      const choices = [];
      const questions = await API.get(`/questions/?quizId=${id}`);
      questions.map(async (question) => {
        const getChoices = await API.get(`choices/?questionId=${question.id}`);
        choices.push(getChoices);
      });
      this.setState({ questions, choices });
    }

    render() {
      const {
        userQuizzes, publicQuizzes, questions, choices, quiz,
      } = this.state;
      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          quiz={quiz}
          questions={questions}
          choices={choices}
          userQuizzes={userQuizzes}
          publicQuizzes={publicQuizzes}
          getOneQuiz={this.getOneQuiz}
          getQuizQuestions={this.getQuizQuestions}
          getUserQuizzes={this.getUserQuizzes}
          getPublicQuizzes={this.getPublicQuizzes}
        />
      );
    }
  };
}
