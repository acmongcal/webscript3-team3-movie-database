import { Button, ButtonGroup } from "react-bootstrap";
import {nowPlayingEndpoint, popularEndpoint, upcomingEndpoint,topRatedEndpoint } from "../global/globals";
import { useState } from "react";
function HomeFilterNavigation({ setFilter }) {
  const [currentFilter, setCurrentFilter] = useState(1);
  const handleFilter = (e, filter, filterNum) => {
    e.preventDefault();
    setFilter(filter);
    setCurrentFilter(filterNum);
  };
  return (
    <ButtonGroup >
      <Button variant="dark"
        onClick={(e) =>
          handleFilter(
            e,nowPlayingEndpoint, 1
          )
        }
        active = {currentFilter==1?true:false}
      >
        Now Playing
      </Button>
      <Button  variant="dark" 
        onClick={(e) => handleFilter(e, popularEndpoint,2)}
        active = {currentFilter==2?true:false}
      >
        Popular
      </Button>
      <Button variant="dark"
        onClick={(e) => handleFilter(e,upcomingEndpoint,3)}
        active = {currentFilter==3?true:false}
      >
        Upcoming
        
      </Button>
      <Button variant="dark"
        onClick={(e) =>
          handleFilter(e, topRatedEndpoint,4)
        }
        active = {currentFilter==4?true:false}
      >
        Top Rated
      </Button>
    </ButtonGroup>
  );
}

export default HomeFilterNavigation;
