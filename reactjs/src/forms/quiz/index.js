/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import QuizFormContainer from './container';


class QuizForm extends React.Component {
    state = {
      name: undefined,
      type: undefined,
    }

    componentDidMount() {
      // get the id from the route params
      const { getQuiz, match: { params: { id } } } = this.props;
      if (id) getQuiz(id);
    }

  handleInputChange = (event) => {
    // pull the name of the input and value of input out of the event object
    const { target: { name, value } } = event;
    // update the state to a key of the name of the input and value of the value of the input
    // ex: type: 'private'
    this.setState({
      [name]: value,
    });
  }

  save = async (event) => {
    // don't actually submit the form through the browser
    event.preventDefault();
    const { quiz: { id }, addQuiz, history } = this.props;
    console.log(id);
    const { name, type = 'public' } = this.state;
    const data = await addQuiz({ id, name, type });
    console.log(data);
    if (data.id !== undefined) history.push(`/admin/quizzes/${data.id}`);
    else history.push('/admin/quizzes');
  }

  render() {
    const {
      quiz: {
        id,
        // rename title prop to "defaultTitle"
        name: defaultTitle = '',
        // rename type prop to "defaultType"
        type: defaultType = 'public',
      },
    } = this.props;
    const {
      // get the title from the state and if it doesn't exist use the prop
      name = defaultTitle,
      // get the type from the state and if it doesn't exist use the prop
      type = defaultType,
    } = this.state;
    return (
      <React.Fragment>
        <h1 className={styles.heading}>{id ? 'Edit Quiz' : 'New quiz'}</h1>
        <form method="POST" className={styles.form} onSubmit={this.save}>
          <label className={styles.form__label} htmlFor="name">
            <span>Quiz Name</span>
            <input
              type="text"
              name="name"
              value={name}
              className={styles.form__input}
              onChange={this.handleInputChange}
              id="name"
            />
          </label>
          <label className={styles.form__label__inline} htmlFor="type">
            <span>Quiz Type</span>
            <input
              type="radio"
              name="type"
              value="public"
              checked={type === 'public'}
              className={styles.form__input__radio}
              onChange={this.handleInputChange}
              id="public"
            />
            <span>Public</span>
            <input
              type="radio"
              name="type"
              value="private"
              checked={type === 'private'}
              className={styles.form__input__radio}
              onChange={this.handleInputChange}
              id="private"
            />
            <span>Private</span>
          </label>
          <button type="submit" className={styles.button}>Save</button>
        </form>
      </React.Fragment>

    );
  }
}

QuizForm.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
  addQuiz: PropTypes.func.isRequired,
  getQuiz: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  match: RRPropTypes.match.isRequired,
};

QuizForm.defaultProps = {
  quiz: {},
};

export default QuizFormContainer(QuizForm);
