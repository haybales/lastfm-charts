import React from 'react';
import SearchForm from './SearchForm';

const Header = (props) => {
  return(
    <div className="header">
      <div className="container">
        <h1>Last.Fm data</h1>
        <SearchForm onSearch={props.onSearch}/>
        <div className="clear"></div>
      </div>
    </div>
  );
}

export default Header;
