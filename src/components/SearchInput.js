import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterByName } from '../actions';

class SearchInput extends Component {
  render() {
    const { data, filterCoinsByName } = this.props;
    return (
      <section className="filters">
        <input
          type="text"
          onChange={({ target: { value } }) => filterCoinsByName(data, value.toUpperCase())}
          placeholder="Digite um nome"
        />
      </section>
    );
  }
}

const mapStateToProps = ({ data }) => ({ data });

const mapDispatchToProps = (dispatch) => ({
  filterCoinsByName: (data, name) => dispatch(filterByName(data, name)),
});

SearchInput.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  filterCoinsByName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
