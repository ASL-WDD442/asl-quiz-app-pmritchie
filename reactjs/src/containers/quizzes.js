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

    deleteQuiz = async (id) => {
      await API.delete(`/quizzes/${id}`);
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
      const quiz = await API.get(`/quizzes/${id}`);
      const questions = await API.get(`/questions/?quizId=${id}`);
      this.setState({ quiz, questions });
    }

    getQuizQuestions = async (id) => {
      const choices = [];
      const questions = await API.get(`/questions/?quizId=${id}`);
      if (questions) {
        questions.map(async (question) => {
          const getChoices = await API.get(`choices/?questionId=${question.id}`);
          getChoices.forEach((choice) => {
            const item = {
              id: choice.id, value: choice.value, type: choice.type, questionId: choice.questionId,
            };
            choices.push(item);
          });
        });
      }
      this.setState({ questions, choices });
    }


    saveQuiz = async (quiz) => {
      if (quiz.id) {
        return API.put(`/quizzes/${quiz.id}`, quiz);
      }
      return API.post('/quizzes', quiz);
    }

    render() {
      const {
        userQuizzes, publicQuizzes, questions, choices, quiz,
      } = this.state;
      console.log(choices, questions);
      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          quiz={quiz}
          questions={questions}
          choices={choices}
          userQuizzes={userQuizzes}
          publicQuizzes={publicQuizzes}
          deleteQuiz={this.deleteQuiz}
          saveQuiz={this.saveQuiz}
          getOneQuiz={this.getOneQuiz}
          getQuizQuestions={this.getQuizQuestions}
          getUserQuizzes={this.getUserQuizzes}
          getPublicQuizzes={this.getPublicQuizzes}
        />
      );
    }
  };
}
