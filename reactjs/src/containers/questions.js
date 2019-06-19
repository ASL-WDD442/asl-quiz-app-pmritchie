import React from 'react';
import API from '../API';

export default function container(Component) {
  return class QuestionsContainer extends React.Component {
    // the default state
    state= {
      question: {},
      choices: [],
    }

    getQuestion = async (id) => {
      const question = await API.get(`/questions/${id}`);
      const choices = await API.get(`/choices/?questionId=${id}`);
      console.log(question);
      console.log(choices);
      this.setState({ question, choices });
    }

    saveQuestion = async (question) => {
      if (question.id) {
        return API.put(`/questions/${question.id}`, question);
      }

      return API.post('/questions', question);
    }

    deleteQuestion = async (id) => {
      await API.delete(`/questions/${id}`);
    }


    render() {
      const { question, choices } = this.state;
      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          question={question}
          choices={choices}
          getQuestion={this.getQuestion}
          saveQuestion={this.saveQuestion}
          deleteQuestion={this.deleteQuestion}
        />
      );
    }
  };
}
