import { Button, ButtonGroup } from "react-bootstrap";
import { min_date, max_date } from "../global/globals";
function HomeFilterNavigation({setFilter}) {

  return (
    <ButtonGroup>
      <Button
        onClick={() => setFilter(
          `&sort_by=popularity.desc&with_release_type=1|2|3&primary_release_date.gte=${min_date}&primary_release_date.lte=${max_date}`,
        )}
      >
        Now Playing
      </Button>
      <Button onClick={() => setFilter("&sort_by=popularity.desc")}>Popular</Button>
      <Button onClick={() => setFilter("&sort_by=primary_release_date.desc")}>Upcoming</Button>
      <Button onClick={() => setFilter("&sort_by=vote_average.desc&vote_count.gte=200")}>Top Rated</Button>
    </ButtonGroup>
  );
}

export default HomeFilterNavigation;
