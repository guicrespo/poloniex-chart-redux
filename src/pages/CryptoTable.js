import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getCryptoDataFromAPI from '../actions';
import '../styles/cryptoTable.css';

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
              <Link to={`/${key.substring(5).toLowerCase()}`}>{key.substring(5)}</Link>
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

  render() {
    const { data, isFetching, error } = this.props;
    const { pageNumber, previousButtonEnabled, nextButtonEnabled } = this.state;

    if (isFetching) return <p>Carregando...</p>;

    if (error) return <p>Erro na conexão com a API. Verifique sua conexão.</p>;

    return (
      <section className="main-table">
        <table className="rtable">
          {CryptoTable.renderTableHead(data)}
          {this.renderTableBody(data)}
        </table>
        <section className="table-buttons">
          <button
            type="button"
            onClick={this.handlePreviousPage}
            disabled={!previousButtonEnabled}
          >
            Anterior
          </button>
          <p>{pageNumber}</p>
          <button
            type="button"
            onClick={this.handleNextPage}
            disabled={!nextButtonEnabled}
          >
            Próxima
          </button>
        </section>
      </section>
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
