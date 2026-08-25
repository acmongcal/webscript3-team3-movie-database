import { Button, ButtonGroup } from "react-bootstrap";
import { min_date, max_date } from "../global/globals";
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
            e,
            `&sort_by=popularity.desc&with_release_type=1|2|3&primary_release_date.gte=${min_date}&primary_release_date.lte=${max_date}`, 1
          )
        }
        active = {currentFilter==1?true:false}
      >
        Now Playing
      </Button>
      <Button  variant="dark" 
        onClick={(e) => handleFilter(e, "&sort_by=popularity.desc",2)}
        active = {currentFilter==2?true:false}
      >
        Popular
      </Button>
      <Button variant="dark"
        onClick={(e) => handleFilter(e, "&sort_by=primary_release_date.desc",3)}
        active = {currentFilter==3?true:false}
      >
        Upcoming
        
      </Button>
      <Button variant="dark"
        onClick={(e) =>
          handleFilter(e, "&sort_by=vote_average.desc&vote_count.gte=200",4)
        }
        active = {currentFilter==4?true:false}
      >
        Top Rated
      </Button>
    </ButtonGroup>
  );
}

export default HomeFilterNavigation;
