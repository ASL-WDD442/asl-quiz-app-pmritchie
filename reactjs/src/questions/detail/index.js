/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import Link from '../../link';
import styles from '../styles.module.css';
import QuestionsContainer from './container';


class QuestionDetail extends React.Component {
  // when component mounts bring in the quiz info

  componentDidMount() {
    const { getQuestion, match: { params: { id } } } = this.props;
    getQuestion(id);
  }

  delete = async () => {
    const { deleteQuestion, question: { id } } = this.props;
    await deleteQuestion(id);
  }

  deleteChoice = async (id) => {
    const { deleteChoice } = this.props;
    await deleteChoice(id);
  }

  render() {
    const { question, choices, match: { params: { id } } } = this.props;
    return (
      <React.Fragment>
        <h1 className={styles.heading}>{question.title}</h1>
        <Link url={`/admin/questions/edit/${question.id}`} title="Edit" icon="fa-edit" />
        <span onClick={this.delete} role="presentation">
          <Link url={`/admin/quizzes/${question.quizId}`} title="Delete" icon="fa-trash" />
        </span>
        <ul className={styles.list}>
          {choices.map(choice => (
            <li className={styles.question__item} key={choice.id}>
              <span className={styles.list__item__title}>{choice.value}</span>
              <Link url={`/admin/choices/edit/${choice.id}`} title="Edit" icon="fa-edit" />
              <span onClick={() => this.deleteChoice(choice.id)} role="presentation">
                <Link url={`/admin/questions/${id}`} title="Delete" icon="fa-trash" />
              </span>
            </li>
          ))}
        </ul>
        <Link url={`/admin/choices/new/${question.id}`} title="Add Choice" icon="fa-plus" className="primary__link__button" />
      </React.Fragment>

    );
  }
}

QuestionDetail.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    quizId: PropTypes.string,
  }),
  choices: PropTypes.arrayOf(PropTypes.object),
  getQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  deleteChoice: PropTypes.func.isRequired,
  match: RRPropTypes.match.isRequired,
};

QuestionDetail.defaultProps = {
  question: {},
  choices: [],
};

export default QuestionsContainer(QuestionDetail);
