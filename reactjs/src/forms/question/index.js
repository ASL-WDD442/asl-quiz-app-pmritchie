/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';
import QuestionContainer from '../../containers/questions';


class QuestionForm extends React.Component {
  handleInputChange = (event) => {
    // pull the name of the input and value of input out of the event object
    const { target: { title, value } } = event;
    // update the state to a key of the name of the input and value of the value of the input
    // ex: type: 'private'
    this.setState({
      [title]: value,
    });
  }

  render() {
    const {
      question: { id, title, type },
    } = this.props;
    return (
      <React.Fragment>
        <h1 className={styles.heading}>{id ? 'Edit question' : 'New question'}</h1>
        <form method="POST" className={styles.form}>
          <label className={styles.form__label} htmlFor="title">
            <span>Quiz Name</span>
            <input
              type="text"
              name="title"
              value={title}
              className={styles.form__input}
              id="title"
              onChange={this.handleInputChange}
            />
          </label>

          <label className={styles.form__label__inline} htmlFor="public">
            <span>Quiz Type</span>
            <label className={styles.form__label__inline} htmlFor="public">
              <input
                type="radio"
                name="type"
                value="public"
                checked={type === 'public'}
                className={styles.form__input__radio}
                id="public"
                onChange={this.handleInputChange}
              />
              <span>Public</span>
            </label>
            <label className={styles.form__label__inline} htmlFor="private">
              <input
                type="radio"
                name="type"
                value="private"
                checked={type === 'private'}
                className={styles.form__input__radio}
                id="private"
                onChange={this.handleInputChange}
              />
              <span>Private</span>
            </label>
          </label>
          <button type="submit" className={styles.button}>Save</button>
        </form>
      </React.Fragment>

    );
  }
}

QuestionForm.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  }),
};

QuestionForm.defaultProps = {
  question: {},
};

export default QuestionContainer(QuestionForm);
