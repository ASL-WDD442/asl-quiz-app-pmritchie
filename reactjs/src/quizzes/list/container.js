import { connect } from 'react-redux';
import { getUserQuizzes } from '../../store/quiz/actions';

function mapStateToProps(state) {
  const { quizzes: { userQuizzes, byId } } = state;
  const mappdedQuizzes = userQuizzes.map(id => byId[id]);
  return { userQuizzes: mappdedQuizzes };
}

const mapDispatchToProps = { getUserQuizzes };
export default connect(mapStateToProps, mapDispatchToProps);
