import React from 'react';
import { Link } from 'react-router-dom';

//image
import music from '../../img/music.jpg';
import traditional from '../../img/traditional.jpg';
import sport from '../../img/sport.jpg';
import dance from '../../img/dance.jpeg';
import comedy from '../../img/comedy.jpg';
import seminar from '../../img/seminar.jpg';

const CategoryList = () => {
  const category = [
    {
      id: 1,
      category: 'Music',
      photo: music
    },
    {
      id: 2,
      category: 'Sport',
      photo: sport
    },
    {
      id: 3,
      category: 'Traditional',
      photo: traditional
    },
    {
      id: 4,
      category: 'Seminar',
      photo: dance
    },
    {
      id: 5,
      category: 'Comedy',
      photo: comedy
    },
    {
      id: 6,
      category: 'Dance',
      photo: seminar
    }
  ];
  const content = category.map(list => {
    return (
      <div className="col-4 mt-3" key={list.id}>
        <div className="card">
          <img className="img" src={list.photo} alt="Event Images" />
          {/* eslint-disable-next-line */}
          <Link to={`/events/category=${list.category}`} className="stretched-link"></Link>
        </div>
      </div>
    );
  });

  return (
    <div className="category-list">
      <div className="row d-flex justify-content-evenly align-items-center">{content}</div>
    </div>
  );
};

export default CategoryList;
