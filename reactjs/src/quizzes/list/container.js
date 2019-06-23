import { connect } from 'react-redux';
import { getUserQuizzes } from '../../store/quiz/actions';

function mapStateToProps(state) {
  const { quizzes: { userQuizzes } } = state;
  return { userQuizzes };
}

const mapDispatchToProps = { getUserQuizzes };
export default connect(mapStateToProps, mapDispatchToProps);
