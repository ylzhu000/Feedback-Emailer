import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const reviewField = _.map(formFields, field => {
		return (
			<div key={field.name}>
				<label>{field.label}</label>
				<div>{formValues[field.name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please Confirm your entries</h5>
			{reviewField}
			<button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
				Back
			</button>
			<button className="green btn-flat right white-text" onClick={ () => submitSurvey(formValues, history)}>Sumbit
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
}

function mapStateToProps(state) {
	console.log(state);
	return {
		formValues: state.form.surveyForm.values
	};
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));