/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../link';
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
              <Link url={`/admin/quizzes/${quiz.id}`} title="View" icon="fa-eye" />
            </li>
          ))}
        </ul>
        <Link url="/admin/quizzes/new" title="New Quiz" icon="fa-plus" className="secondary__link" />
      </React.Fragment>

    );
  }
}

QuizList.propTypes = {
  userQuizzes: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUserQuizzes: PropTypes.func.isRequired,
};

QuizList.defaultProps = {
};

export default QuizContainer(QuizList);
