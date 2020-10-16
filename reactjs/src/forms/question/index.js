/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import QuestionContainer from '../../containers/questions';


class QuestionForm extends React.Component {
  state = {
    title: undefined,
  }

  componentDidMount() {
    const { getQuestion, match: { params: { id } } } = this.props;
    if (id) getQuestion(id);
  }

  handleInputChange = (event) => {
    // pull the name of the input and value of input out of the event object
    const { target: { name, value } } = event;
    // update the state to a key of the name of the input and value of the value of the input
    // ex: type: 'incorrect'
    this.setState({
      [name]: value,
    });
  }

  save = async (event) => {
    // don't actually submit the form through the browser
    event.preventDefault();
    const {
      question: { id }, saveQuestion, history, match: { params: { quizId } },
    } = this.props;
    const { title } = this.state;
    await saveQuestion({ id, quizId, title });

    if (quizId) { history.push(`/admin/quizzes/${quizId}`); } else { history.push(`/admin/questions/${id}`); }
  }

  delete = async () => {
    const { deleteQuestion, question: { id } } = this.props;
    await deleteQuestion(id);
  }

  render() {
    const {
      question: {
        id,
        title: defaultValue = '',
      },
    } = this.props;
    const {
      // get the value from the state and if it doesn't exist use the prop
      title = defaultValue,
    } = this.state;

    return (
      <React.Fragment>
        <h1 className={styles.heading}>{id ? 'Edit question' : 'New question'}</h1>
        <form method="POST" className={styles.form} onSubmit={this.save}>
          <label className={styles.form__label} htmlFor="title">
            <span>Question Title</span>
            <input
              type="text"
              name="title"
              value={title}
              className={styles.form__input}
              id="title"
              onChange={this.handleInputChange}
            />
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
  }),
  saveQuestion: PropTypes.func.isRequired,
  getQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  match: RRPropTypes.match.isRequired,
};

QuestionForm.defaultProps = {
  question: {},
};

export default QuestionContainer(QuestionForm);
