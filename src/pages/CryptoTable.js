import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCryptoDataFromAPI } from '../actions';
import '../styles/cryptoTable.css';
import SearchInput from '../components/SearchInput';

class CryptoTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      pageNumber: 1,
      previousButtonEnabled: false,
      nextButtonEnabled: true,
    };

    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
  }

  static renderTableHead(data) {
    return (
      <thead>
        <tr className="table-head-row">
          <th className="table-head-cell">Criptomoedas</th>
          {
            Object.values(data).map((value) => (
              Object.keys(value).map((key) => (
                !['id', 'isFrozen'].includes(key)
                && <th key={key} className="table-head-cell">{key}</th>
              ))
            ))[0]
          }
        </tr>
      </thead>
    );
  }

  componentDidMount() {
    const { fetchCryptoData } = this.props;

    fetchCryptoData();
  }

  handlePreviousPage() {
    const { pageNumber, page } = this.state;
    this.setState({ pageNumber: pageNumber - 1, page: page - 10 });
    if (pageNumber <= 2) {
      this.setState({ previousButtonEnabled: false });
    }
    this.setState({ nextButtonEnabled: true });
  }

  handleNextPage() {
    const { data } = this.props;
    const { pageNumber, page } = this.state;
    if (page >= Object.values(data).length - 10) {
      return this.setState({ nextButtonEnabled: false });
    }
    return this.setState({
      previousButtonEnabled: true,
      pageNumber: pageNumber + 1,
      page: page + 10,
    });
  }

  renderTableBody(data) {
    const { page } = this.state;
    return (
      <tbody>
        {Object.entries(data).slice(page, page + 10).map(([key, value]) => (
          <tr>
            <td key={key}>
              <Link to={`/${key.toLowerCase()}`}>{key}</Link>
            </td>
            {Object.entries(value).map(([elKey, elValue]) => (
              !['id', 'isFrozen'].includes(elKey)
              && <td>{elValue}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  renderPageButtons() {
    const { pageNumber, previousButtonEnabled, nextButtonEnabled } = this.state;
    return (
      <section className="table-buttons">
        <button
          type="button"
          onClick={this.handlePreviousPage}
          disabled={!previousButtonEnabled}
        >
          ❮
        </button>
        <p className="page-number">{pageNumber}</p>
        <button
          type="button"
          onClick={this.handleNextPage}
          disabled={!nextButtonEnabled}
        >
          ❯
        </button>
      </section>
    );
  }

  render() {
    const { data, filteredData, isFetching, error } = this.props;
    const cryptoData = Object.getOwnPropertyNames(filteredData).length > 0 ? filteredData : data;

    if (isFetching) return <div className="spinner" data-testid="loading" />;
    if (error) return <p>Erro na conexão com a API. Verifique sua conexão.</p>;
    return (
      <section className="main-table">
        <section>
          <SearchInput />
          <caption className="table-caption">
            Os valores exibidos estão em USDT
            <span
              className="table-caption tooltip tooltip-top"
              data-tooltip="USDT é sigla do USDT Tether, um token digital estável e atrelado
              ao dólar americano (USD), ou seja, 1 USDT é equivalente a 1 USD."
            >
              O que é USDT?
            </span>
          </caption>
          <table className="rtable">
            {CryptoTable.renderTableHead(cryptoData)}
            {this.renderTableBody(cryptoData)}
          </table>
        </section>
        {this.renderPageButtons()}
      </section>
    );
  }
}

const mapStateToProps = ({ data, filteredData, isFetching, error }) => (
  { data, filteredData, isFetching, error }
);

const mapDispatchToProps = (dispatch) => (
  { fetchCryptoData: () => dispatch(getCryptoDataFromAPI()) }
);

CryptoTable.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  filteredData: PropTypes.instanceOf(Object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchCryptoData: PropTypes.func.isRequired,
  error: PropTypes.string,
};

CryptoTable.defaultProps = {
  error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(CryptoTable);
