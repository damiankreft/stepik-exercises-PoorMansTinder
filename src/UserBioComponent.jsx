import { useEffect, useState } from 'react';
import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';

async function bioApi() {
  return await fetch(new URL('https://randomuser.me/api/'));
}

const styles = {
  image: {
    float: 'left',
    marginTop: '5px',
  },
  divLocation: {
    backgroundColor: 'grey',
    marginTop: '5px',
    padding: '4px',
  },
  swipeButton: {
    width: '100%',
    height: '50px',
    borderRadius: '0',
  },
  divName: {
    backgroundColor: 'grey',
    padding: '4px',
  },
};

export default function UserBio() {
  const [bioData, setBioData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!refresh) {
      bioApi()
        .then((res) => res.json())
        .then((d) => setBioData(d.results))
        .then((d) => setRefresh(true));
    }
  }, [refresh]);

  if (!error && bioData.length > 0)
    return (
      <div className="bio-container">
        <div class="person">
          <div class="name" style={styles.divName}>
            <i>
              {bioData[0].name.title}{' '}
              <b>
                {' '}
                {bioData[0].name.first} {bioData[0].name.last}{' '}
              </b>
            </i>
          </div>
          <img src={bioData[0].picture.large} style={styles.image} />

          <div class="location" style={styles.divLocation}>
            <b>Location</b> <br />
            {bioData[0].location.state}, {bioData[0].location.country} <br />
            <b>Address</b> <br />
            {bioData[0].location.street.name},{' '}
            {bioData[0].location.street.number} <br />
            {bioData[0].location.postcode}, {bioData[0].location.city} <br />
          </div>
        </div>

        <Button onClick={() => setRefresh(false)} style={styles.swipeButton}>
          Swipe left
        </Button>
      </div>
    );
  else {
    if (error) {
      return (
        <div>
          {' '}
          <Badge bg="danger">Danger</Badge> Failed to load data.{' '}
        </div>
      );
    }
  }
}
