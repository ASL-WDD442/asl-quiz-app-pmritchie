import { connect } from 'react-redux';
import { getPublicQuizzes } from '../../store/quiz/actions';

function mapStateToProps(state) {
  const { quizzes: { publicQuizzes, byId } } = state;
  const mappedQuizzes = publicQuizzes.map(id => byId[id]);
  return { publicQuizzes: mappedQuizzes };
}

const mapDispatchToProps = { getPublicQuizzes };
export default connect(mapStateToProps, mapDispatchToProps);
