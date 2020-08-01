import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCryptoDataFromAPI from '../actions';

class CryptoTable extends Component {
  componentDidMount() {
    const { fetchCryptoData } = this.props;

    fetchCryptoData();
  }

  render() {
    const { data, isFetching } = this.props;

    if (isFetching) return <p>Carregando...</p>;

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {
              Object.values(data).map((value) => (
                Object.keys(value).map((key) => key !== 'id' && <th key={key}>{key}</th>)
              ))[0]
            }
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr>
              <td key={key}>{key}</td>
              {Object.entries(value).map(([elKey, elValue]) => elKey !== 'id' && <td>{elValue}</td>)}
            </tr>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CryptoTable);
