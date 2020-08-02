import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCryptoDataFromAPI from '../actions';
import '../styles/cryptoTable.css';

class CryptoTable extends Component {
  componentDidMount() {
    const { fetchCryptoData } = this.props;

    fetchCryptoData();
  }

  render() {
    const { data, isFetching, error } = this.props;

    if (isFetching) return <p>Carregando...</p>;

    if (error) return <p>Erro na conexão com a API. Verifique sua conexão.</p>;

    return (
      <table className="rtable">
        <thead>
          <tr>
            <th>CryptoCoin</th>
            {
              Object.values(data).map((value) => (
                Object.keys(value).map((key) => (
                  !['id', 'isFrozen'].includes(key)
                  && <th key={key}>{key}</th>
                ))
              ))[0]
            }
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            key.startsWith('USDT')
            && (
              <tr>
                <td key={key}>{key.substring(5)}</td>
                {Object.entries(value).map(([elKey, elValue]) => (
                  !['id', 'isFrozen'].includes(elKey)
                  && <td>{elValue}</td>
                ))}
              </tr>
            )
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ data, isFetching, error }) => ({ data, isFetching, error });

const mapDispatchToProps = (dispatch) => (
  { fetchCryptoData: () => dispatch(getCryptoDataFromAPI()) }
);

CryptoTable.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchCryptoData: PropTypes.func.isRequired,
  error: PropTypes.string,
};

CryptoTable.defaultProps = {
  error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(CryptoTable);
