import { connect } from 'react-redux';
import { getPublicQuizzes } from '../../store/quiz/actions';

function mapStateToProps(state) {
  const { quizzes: { publicQuizzes } } = state;
  return { publicQuizzes };
}

const mapDispatchToProps = { getPublicQuizzes };
export default connect(mapStateToProps, mapDispatchToProps);
