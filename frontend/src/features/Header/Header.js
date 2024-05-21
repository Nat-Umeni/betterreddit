import React, { useState, useEffect } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import './Header.css';
import { FaReddit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../store/redditSlice';
import { Link } from 'react-router-dom';


const Header = (props) => {
  const [searchTermLocal, setSearchTermLocal] = useState('');
  const searchTerm = useSelector((state) => state.reddit.searchTerm);
  const dispatch = useDispatch();

  const onSearchTermChange = (e) => {
    setSearchTermLocal(e.target.value);
  };

  useEffect(() => {
    setSearchTermLocal(searchTerm);
  }, [searchTerm]);

  const onSearchTermSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchTermLocal));
  };
//FaReddit gives the blue reddit Icon rather than loading it straight up.
//HiOutlineSearch is a search image component for the same reason as above, will change to font awesome later
  return (
    <header>
      <div className="logo">
      
        <FaReddit className="logo-icon" />
        <p>
          Better<span>Reddit</span>
        </p>
      </div>
      <form className="search" onSubmit={onSearchTermSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchTermLocal}
          onChange={onSearchTermChange}
          aria-label="Search posts"
        />
        <button type="submit" onClick={onSearchTermSubmit} aria-label="Search">
          <HiOutlineSearch />
        </button>
        <Link id="Link" to="/login">Login in here</Link>
        <span>{props.currentUser ? props.currentUser : ''}</span>

      </form>
    </header>
  );
};

export default Header;
