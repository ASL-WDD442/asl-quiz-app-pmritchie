import React from 'react';
import API from '../API';

export default function container(Component) {
  return class ChoicesContainer extends React.Component {
    // the default state
    state= {
      choice: {},
    }

    getChoice = async (id) => {
      const choice = await API.get(`/choices/?choiceId=${id}`);
      console.log(choice);
      this.setState({ choice });
    }

    saveChoice = async (choice) => {
      if (choice.id) {
        return API.put(`/choices/${choice.id}`, choice);
      }

      return API.post('/choices', choice);
    }

    deleteChoice = async (id) => {
      await API.delete(`/choices/${id}`);
    }


    render() {
      const { choice } = this.state;
      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          choice={choice}
          getChoice={this.getChoice}
          saveChoice={this.saveChoice}
          deleteChoice={this.deleteChoice}
        />
      );
    }
  };
}
