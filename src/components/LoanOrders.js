import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLoanOrders } from '../actions';

class LoanOrders extends Component {
  constructor(props) {
    super(props);

    const { location: { pathname } } = this.props;

    this.state = {
      coin: pathname.slice(pathname.length - 3).toUpperCase(),
    };
  }

  componentDidMount() {
    const { coin } = this.state;
    const { getCoinLoanOrders } = this.props;
    getCoinLoanOrders(coin);
  }

  render() {
    const { loanOrders, isFetching, error } = this.props;

    if (isFetching || !loanOrders.offers) {
      return <div className="spinner" data-testid="loading" />;
    }

    if (error) return <p>Erro na conexão com a API. Verifique sua conexão.</p>;

    const offersAvgAmount = loanOrders.offers
      .reduce((acc, cur, _i, arr) => (acc + Number(cur.amount)) / arr.length, 0);
    const offersAvgRate = loanOrders.offers
      .reduce((acc, cur, _i, arr) => (acc + Number(cur.rate)) / arr.length, 0);

    return (
      <section>
        <ul>
          Oferta:
          <li>
            Taxa de juros média (por dia):&nbsp;
            {offersAvgRate}
            %
          </li>
          <li>
            Número total de unidades disponíveis (média):&nbsp;
            {offersAvgAmount}
          </li>
        </ul>
      </section>
    );
  }
}

const mapStateToProps = ({ loanOrders, isFetching }) => ({ loanOrders, isFetching });

const mapDispatchToProps = (dispatch) => ({
  getCoinLoanOrders: (coin) => dispatch(getLoanOrders(coin)),
});

LoanOrders.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  getCoinLoanOrders: PropTypes.func.isRequired,
  loanOrders: PropTypes.instanceOf(Object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

LoanOrders.defaultProps = {
  error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoanOrders));
