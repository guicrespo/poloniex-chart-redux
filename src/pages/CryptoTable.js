import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCryptoDataFromAPI } from '../actions';
import '../styles/cryptoTable.css';
import SearchInput from '../components/SearchInput';
import { formatTableHead, formatTableBody } from '../utils';

class CryptoTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      pageNumber: 1,
      previousButtonEnabled: false,
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
                !['id', 'isFrozen', 'quoteVolume'].includes(key)
                && <th key={key} className="table-head-cell">{formatTableHead(key)}</th>
              ))
            ))[0]
          }
        </tr>
      </thead>
    );
  }

  static renderTableCaption() {
    return (
      <p className="table-caption">
        Os preços exibidos estão em USDT
        <span
          className="table-caption tooltip tooltip-top"
          data-tooltip="USDT é sigla do USDT Tether, um token digital estável e atrelado
              ao dólar americano (USD), ou seja, 1 USDT é equivalente a 1 USD."
        >
          - O que é USDT?
        </span>
      </p>
    );
  }

  componentDidMount() {
    const { fetchCryptoData } = this.props;

    fetchCryptoData();
  }

  shouldComponentUpdate(nextProps) {
    const { name } = this.props;
    if (name !== nextProps.name) {
      this.setState({ page: 0, pageNumber: 1, previousButtonEnabled: false });
    }
    return true;
  }

  handlePreviousPage() {
    const { pageNumber, page } = this.state;
    this.setState({ pageNumber: pageNumber - 1, page: page - 10 });
    if (pageNumber <= 2) {
      this.setState({ previousButtonEnabled: false });
    }
  }

  handleNextPage() {
    const { pageNumber, page } = this.state;
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
              !['id', 'isFrozen', 'quoteVolume'].includes(elKey)
              && <td>{formatTableBody(elKey, elValue)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  renderPageButtons(cryptoData) {
    const { page, pageNumber, previousButtonEnabled } = this.state;
    return (
      <section className="table-buttons">
        <button
          type="button"
          onClick={this.handlePreviousPage}
          className="table-button"
          disabled={!previousButtonEnabled}
        >
          ❮
        </button>
        <p className="page-number">{pageNumber}</p>
        <button
          type="button"
          onClick={this.handleNextPage}
          className="table-button"
          disabled={page >= Object.values(cryptoData).length - 10}
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
        <SearchInput />
        {CryptoTable.renderTableCaption()}
        {!Object.keys(cryptoData).length
          ? <p>Moeda não encontrada. Tente novamente.</p>
          : (
            <table className="rtable">
              {CryptoTable.renderTableHead(cryptoData)}
              {this.renderTableBody(cryptoData)}
            </table>
          )}
        {this.renderPageButtons(cryptoData)}
      </section>

    );
  }
}

const mapStateToProps = ({ data, filteredData, isFetching, filters: { name }, error }) => (
  { data, filteredData, isFetching, name, error }
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
  name: PropTypes.string,
};

CryptoTable.defaultProps = {
  error: '',
  name: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(CryptoTable);
