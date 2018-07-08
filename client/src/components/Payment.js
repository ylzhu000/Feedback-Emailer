import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    debugger;

    return (
      <StripeCheckout
        name="Emaily"
        description="$5 to realod 5 email credits"
        amount={500} //cents
        token={ token => this.props.handleToken(token) }
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        currency="USD"
      />
    );
  }
}


export default connect(null, actions)(Payments);
