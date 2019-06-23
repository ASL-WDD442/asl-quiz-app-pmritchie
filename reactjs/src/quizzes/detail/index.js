import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import Link from '../../link';
import styles from '../styles.module.css';
import QuizContainer from './container';

class QuizDetail extends React.Component {
  // when component mounts bring in the quiz info
  componentDidMount() {
    const { getQuiz, match: { params: { id } } } = this.props;
    getQuiz(id);
  }

  delete = async () => {
    const { deleteQuiz, quiz: { id } } = this.props;
    await deleteQuiz(id);
  }

  render() {
    const { quiz, questions } = this.props;
    return (
      <React.Fragment>
        <h1 className={styles.heading}>{quiz.name}</h1>
        <Link url={`/admin/quizzes/edit/${quiz.id}`} title="Edit" icon="fa-edit" className="secondary__link" />
        <span onClick={this.delete} role="presentation">
          <Link url="/admin/quizzes/" title="Delete" icon="fa-trash" />
        </span>
        <ul className={styles.list}>
          {questions.map(question => (
            <li className={styles.question__item} key={question.id}>
              <span className={styles.list__item__title}>{question.title}</span>
              <Link url={`/admin/questions/${question.id}`} title="View" icon="fa-eye" />
            </li>
          ))}
        </ul>
        <Link url={`/admin/questions/new/${quiz.id}`} title="Add Question" icon="fa-plus" className="primary__link__button" />
      </React.Fragment>

    );
  }
}

QuizDetail.propTypes = {
  quiz: PropTypes.shape({ name: PropTypes.string, id: PropTypes.string }),
  questions: PropTypes.arrayOf(PropTypes.object),
  getQuiz: PropTypes.func.isRequired,
  match: RRPropTypes.match.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
};

QuizDetail.defaultProps = {
  quiz: {},
  questions: [],
};

export default QuizContainer(QuizDetail);
