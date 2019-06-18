/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../styles.module.css';
import QuizContainer from '../../containers/quizzes';


class QuizList extends React.Component {
  componentDidMount() {
    const { getUserQuizzes } = this.props;
    getUserQuizzes();
  }

  render() {
    const { userQuizzes } = this.props;
    return (
      <React.Fragment>
        <h1 className={styles.heading}>Here are your quizzes Squid!</h1>
        <h4>Here you can edit or delete your quizzes.</h4>
        <ul className={styles.list}>
          {userQuizzes.map(quiz => (
            <li className={styles.list__item} key={quiz.id}>
              <span className={styles.list__item__title}>{quiz.name}</span>
              <Link to={`/admin/quizzes/${quiz.id}`}>View</Link>
              <Link to={`admin/quizzes/delete/${quiz.id}`}>Delete</Link>
            </li>
          ))}
        </ul>
      </React.Fragment>

    );
  }
}

QuizList.propTypes = {
  userQuizzes: PropTypes.arrayOf(PropTypes.object),
  getUserQuizzes: PropTypes.func.isRequired,
};

QuizList.defaultProps = {
  userQuizzes: [{ name: 'bob', id: 1 }, { name: 'george', id: 2 }],
};

export default QuizContainer(QuizList);
