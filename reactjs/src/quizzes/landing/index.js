/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../link';
import styles from '../styles.module.css';
import QuizContainer from '../../containers/quizzes';


class Landing extends React.Component {
  componentDidMount() {
    const { getPublicQuizzes } = this.props;
    getPublicQuizzes();
  }

  render() {
    const { publicQuizzes } = this.props;
    return (
      <React.Fragment>
        <h1 className={styles.heading}>Check out these awesome quizzes!</h1>
        <h4>Can you beat these quizzes??</h4>
        <ul className={styles.list}>
          {publicQuizzes.map(quiz => (
            <li className={styles.list__item} key={quiz.id}>
              <span className={styles.list__item__title}>{quiz.name}</span>
              <Link url={`/quiz/${quiz.id}`} title="view">View</Link>
            </li>
          ))}
        </ul>
      </React.Fragment>

    );
  }
}

Landing.propTypes = {
  publicQuizzes: PropTypes.arrayOf(PropTypes.object),
  getPublicQuizzes: PropTypes.func.isRequired,
};

Landing.defaultProps = {
  publicQuizzes: [{ name: 'bob', id: 1 }, { name: 'george', id: 2 }],
};

export default QuizContainer(Landing);
