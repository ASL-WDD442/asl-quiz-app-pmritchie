import { connect } from 'react-redux';
import { getQuestion, saveQuestion } from '../../store/question/actions';

function mapStateToProps(state, props) {
  const { match: { params: { id } } } = props;
  const {
    questions: {
      byId: {
        [id]: question,
      },
    },
  } = state;
  return { question };
}

const mapDispatchToProps = { getQuestion, saveQuestion };
export default connect(mapStateToProps, mapDispatchToProps);
