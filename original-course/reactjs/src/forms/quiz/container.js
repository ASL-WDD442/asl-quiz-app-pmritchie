import { connect } from 'react-redux';
import { getQuiz, addQuiz } from '../../store/quiz/actions';

function mapStateToProps(state, props) {
  // get the id from the route params
  const { match: { params: { id } } } = props;
  const {
    quizzes: {
      byId: {
        // find the key with the id from the route and pull out the decision
        [id]: quiz,
      },
    },
  } = state;

  return { quiz };
}

// set the actions we need in this component
const mapDispatchToProps = { getQuiz, addQuiz };
export default connect(mapStateToProps, mapDispatchToProps);
