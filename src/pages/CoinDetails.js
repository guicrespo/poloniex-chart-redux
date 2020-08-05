import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formatCoinName } from '../utils';
import { getCurrencies } from '../actions';
import '../styles/coinDetails.css';

class CoinDetails extends Component {
  constructor(props) {
    super(props);

    const { location: { pathname } } = this.props;

    this.state = {
      coin: pathname.substring(1),
    };
  }

  componentDidMount() {
    const { getAllCurrencies } = this.props;
    getAllCurrencies();
  }

  render() {
    const { coin } = this.state;
    const { currencies } = this.props;
    return (
      <section>
        <h2>{formatCoinName(coin)}</h2>
        <h3>Histórico de Negociações</h3>
        <section className="selector-tradre-history">
          <span className="selector-label">Selecione uma criptomoeda para ver o histórico de negociações entre as duas:</span>
          <select name="coin">
            <option value="" label="Selecionar" />
            {currencies && currencies.map((key) => (
              <option value={key} key={key}>{key}</option>
            ))}
          </select>
          <button
            type="button"
            className="button-trade-history"
            // onClick={}
          >
            Exibir
          </button>
        </section>
      </section>
    );
  }
}

const mapStateToProps = ({ currencies }) => ({ currencies });

const mapDispatchToProps = (dispatch) => ({
  getAllCurrencies: () => dispatch(getCurrencies()),
});

CoinDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  getAllCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinDetails);
