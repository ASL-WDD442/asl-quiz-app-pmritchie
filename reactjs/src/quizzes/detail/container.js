import { connect } from 'react-redux';
import { getQuiz, deleteQuiz } from '../../store/quiz/actions';

function mapStateToProps(state, props) {
  // get the id from the route params
  const { match: { params: { id } } } = props;
  const {
    quizzes: {
      byId: {
        // find the key with the id from the route and pull out the quiz
        [id]: quiz,
      },
    },
    questions: {
      byQuizId: {
        // set arry of questions per quiz
        [id]: quizQuestions = [],
      },
      byId,
    },

  } = state;
  const questions = quizQuestions.map(questionId => byId[questionId]);
  return { quiz, questions };
}

// set the actions we need in this component
const mapDispatchToProps = { getQuiz, deleteQuiz };
export default connect(mapStateToProps, mapDispatchToProps);
