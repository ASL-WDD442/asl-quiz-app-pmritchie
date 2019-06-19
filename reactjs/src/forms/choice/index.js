/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import ChoiceContainer from '../../containers/choices';


class ChoiceForm extends React.Component {
  state = {
    value: undefined,
    type: undefined,
  }

  componentDidMount() {
    const { getChoice, match: { params: { id } } } = this.props;
    if (id) getChoice(id);
  }

  handleInputChange = (event) => {
    // pull the name of the input and value of input out of the event object
    const { target: { name, value } } = event;
    // update the state to a key of the name of the input and value of the value of the input
    // ex: type: 'incorrect'
    this.setState({
      [name]: value,
    });
  }

  save = async (event) => {
    // don't actually submit the form through the browser
    event.preventDefault();
    const {
      choice: { id }, saveChoice, history, location,
    } = this.props;
    const { value, type = 'correct' } = this.state;
    // get the query params from the url
    const queryParams = new URLSearchParams(location.search);

    // get the questionId from query params
    const questionId = queryParams.get('questionId');


    await saveChoice({
      id, questionId, value, type,
    });
    history.push(`/admin/questions/${questionId}`);
  }

  delete = async () => {
    const { deleteChoice, choice: { id } } = this.props;
    await deleteChoice(id);
  }

  render() {
    const {
      choice: {
        id,
        value: defaultValue = '',
        type: defaultType = 'correct',
      },
    } = this.props;
    const {
      // get the value from the state and if it doesn't exist use the prop
      value = defaultValue,
      type = defaultValue,
    } = this.state;

    return (
      <React.Fragment>
        <h1 className={styles.heading}>{id ? 'Edit question' : 'New question'}</h1>
        <form method="POST" className={styles.form} onSubmit={this.save}>
          <label className={styles.form__label} htmlFor="title">
            <span>Choice Value</span>
            <input
              type="text"
              name="title"
              value={value}
              className={styles.form__input}
              id="title"
              onChange={this.handleInputChange}
            />
          </label>
          <label className={styles.form__label__inline} htmlFor="type">
            <span>Quiz Type</span>
            <input
              type="radio"
              name="type"
              value="correct"
              checked={type === 'correct'}
              className={styles.form__input__radio}
              onChange={this.handleInputChange}
              id="correct"
            />
            <span>Correct</span>
            <input
              type="radio"
              name="type"
              value="incorrect"
              checked={type === 'incorrect'}
              className={styles.form__input__radio}
              onChange={this.handleInputChange}
              id="incorrect"
            />
            <span>Incorrect</span>
          </label>
          <button type="submit" className={styles.button}>Save</button>
        </form>
      </React.Fragment>

    );
  }
}

ChoiceForm.propTypes = {
  choice: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
  }),
  saveChoice: PropTypes.func.isRequired,
  getChoice: PropTypes.func.isRequired,
  deleteChoice: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  location: RRPropTypes.location.isRequired,
  match: RRPropTypes.match.isRequired,
};

ChoiceForm.defaultProps = {
  choice: {},
};

export default ChoiceContainer(ChoiceForm);
