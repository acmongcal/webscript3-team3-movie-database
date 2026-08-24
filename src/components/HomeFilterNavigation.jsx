import { Button, ButtonGroup } from "react-bootstrap";
import { min_date, max_date } from "../global/globals";
function HomeFilterNavigation({ setFilter }) {
  const handleFilter = (e, filter) => {
    e.preventDefault();
    setFilter(filter);
  };
  return (
    <ButtonGroup>
      <Button
        onClick={(e) =>
          handleFilter(
            e,
            `&sort_by=popularity.desc&with_release_type=1|2|3&primary_release_date.gte=${min_date}&primary_release_date.lte=${max_date}`,
          )
        }
      >
        Now Playing
      </Button>
      <Button onClick={(e) => handleFilter(e, "&sort_by=popularity.desc")}>
        Popular
      </Button>
      <Button
        onClick={(e) => handleFilter(e, "&sort_by=primary_release_date.desc")}
      >
        Upcoming
      </Button>
      <Button
        onClick={(e) =>
          handleFilter(e, "&sort_by=vote_average.desc&vote_count.gte=200")
        }
      >
        Top Rated
      </Button>
    </ButtonGroup>
  );
}

export default HomeFilterNavigation;
