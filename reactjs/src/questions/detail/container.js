import { connect } from 'react-redux';
import { getQuestion, deleteQuestion } from '../../store/question/actions';
import {
  getQuestionChoices, deleteChoice,
} from '../../store/choice/actions';

function mapStateToProps(state, props) {
  // get the id from the route params
  const { match: { params: { id } } } = props;
  const {
    questions: {
      byId: {
        // find the key with the id from the route and pull out the question
        [id]: question,
      },
    },
    choices: {
      byQuestionId: {
        // set arry of choices per question
        [id]: quizChoices = [],
      },
      byId,
    },

  } = state;

  const choices = quizChoices.map(choiceId => byId[choiceId]);
  return { question, choices };
}

// set the actions we need in this component
const mapDispatchToProps = {
  getQuestion, deleteQuestion, getQuestionChoices, deleteChoice,
};
export default connect(mapStateToProps, mapDispatchToProps);
