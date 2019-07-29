import { connect } from 'react-redux';
import {
  getChoice, addChoice,
} from '../../store/choice/actions';

function mapStateToProps(state, props) {
  const { match: { params: { id } } } = props;
  const {
    choices: {
      byId: {
        [id]: choice,
      },
    },
  } = state;
  return { choice };
}

const mapDispatchToProps = {
  getChoice, addChoice,
};
export default connect(mapStateToProps, mapDispatchToProps);
