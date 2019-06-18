import React from 'react';
import API from '../API';

export default function container(Component) {
  return class QuestionsContainer extends React.Component {
    // the default state
    state = {
    }


    render() {
      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}

        />
      );
    }
  };
}
