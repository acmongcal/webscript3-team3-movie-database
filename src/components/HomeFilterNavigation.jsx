import { Button, ButtonGroup } from "react-bootstrap";
import {
  nowPlayingEndpoint,
  popularEndpoint,
  upcomingEndpoint,
  topRatedEndpoint,
} from "../global/globals";
import { useState } from "react";
import { Pagination } from "react-bootstrap";

function HomeFilterNavigation({
  setFilter,
  setPageNumber,
  totalPages,
  currentPageNumber,
}) {
  const [currentFilter, setCurrentFilter] = useState(1);
  const handleFilter = (e, filter, filterNum) => {
    e.preventDefault();
    setFilter(filter);
    setCurrentFilter(filterNum);
    setPageNumber(1);
  };
  const handlePageNavigation = (e, navigation) => {
    e.preventDefault();
    if (navigation === "next") {
      if (currentPageNumber != totalPages) {
        setPageNumber(currentPageNumber + 1);
      }
    } else if (navigation === "prev") {
      if (currentPageNumber > 1) {
        setPageNumber(currentPageNumber - 1);
      }
    }
  };
  return (
    <nav className="movie-filter">
      <ButtonGroup>
        <Button
          variant="dark"
          onClick={(e) => handleFilter(e, nowPlayingEndpoint, 1)}
          active={currentFilter == 1 ? true : false}
        >
          Now Playing
        </Button>
        <Button
          variant="dark"
          onClick={(e) => handleFilter(e, popularEndpoint, 2)}
          active={currentFilter == 2 ? true : false}
        >
          Popular
        </Button>
        <Button
          variant="dark"
          onClick={(e) => handleFilter(e, upcomingEndpoint, 3)}
          active={currentFilter == 3 ? true : false}
        >
          Upcoming
        </Button>
        <Button
          variant="dark"
          onClick={(e) => handleFilter(e, topRatedEndpoint, 4)}
          active={currentFilter == 4 ? true : false}
        >
          Top Rated
        </Button>
      </ButtonGroup>
      {totalPages > 1 && (
        <Pagination data-bs-theme="dark">
          <Pagination.Prev
            disabled={currentPageNumber === 1 ? true : false}
            onClick={(e) => handlePageNavigation(e, "prev")}
          />
          <Pagination.Item disabled>
            {currentPageNumber} / {totalPages}
          </Pagination.Item>
          <Pagination.Next
            disabled={currentPageNumber === totalPages ? true : false}
            onClick={(e) => handlePageNavigation(e, "next")}
          />
        </Pagination>
      )}
    </nav>
  );
}

export default HomeFilterNavigation;
