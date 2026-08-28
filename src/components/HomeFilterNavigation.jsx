import { Button, ButtonGroup } from "react-bootstrap";
import {
  nowPlayingEndpoint,
  popularEndpoint,
  upcomingEndpoint,
  topRatedEndpoint,
} from "../global/globals";
import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import useIsMobile from "../hooks/useIsMobile";
function HomeFilterNavigation({
  setFilter,
  setPageNumber,
  totalPages,
  currentPageNumber,
}) {
  const isMobile = useIsMobile();
  const [isExcerpt, setIsExcerpt] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("Now Playing");
  const handleFilter = (e, filter, filterName) => {
    e.preventDefault();
    setFilter(filter);
    setCurrentFilter(filterName);
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
  useEffect(() => {
    if (!isMobile) {
      setIsExcerpt(false);
    } else {
      setIsExcerpt(true);
    }
  }, [isMobile]);
  return (
    <nav className="movie-filter">
      {isExcerpt ? (
        <Dropdown>
          <Dropdown.Toggle variant="dark">{currentFilter}</Dropdown.Toggle>

          <Dropdown.Menu variant="dark">
            <Dropdown.Item
              active={currentFilter == "Now Playing" ? true : false}
              onClick={(e) =>
                handleFilter(e, nowPlayingEndpoint, "Now Playing")
              }
            >
              Now Playing
            </Dropdown.Item>
            <Dropdown.Item
              active={currentFilter == "Popular" ? true : false}
              onClick={(e) => handleFilter(e, popularEndpoint, "Popular")}
            >
              Popular
            </Dropdown.Item>
            <Dropdown.Item
              active={currentFilter == "Upcoming" ? true : false}
              onClick={(e) => handleFilter(e, upcomingEndpoint, "Upcoming")}
            >
              Upcoming
            </Dropdown.Item>
            <Dropdown.Item
              active={currentFilter == "Top Rated" ? true : false}
              onClick={(e) => handleFilter(e, topRatedEndpoint, "Top Rated")}
            >
              Top Rated
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <ButtonGroup>
          <Button
            variant="dark"
            onClick={(e) => handleFilter(e, nowPlayingEndpoint, "Now Playing")}
            active={currentFilter == "Now Playing" ? true : false}
          >
            Now Playing
          </Button>
          <Button
            variant="dark"
            onClick={(e) => handleFilter(e, popularEndpoint, "Popular")}
            active={currentFilter == "Popular" ? true : false}
          >
            Popular
          </Button>
          <Button
            variant="dark"
            onClick={(e) => handleFilter(e, upcomingEndpoint, "Upcoming")}
            active={currentFilter == "Upcoming" ? true : false}
          >
            Upcoming
          </Button>
          <Button
            variant="dark"
            onClick={(e) => handleFilter(e, topRatedEndpoint, "Top Rated")}
            active={currentFilter == "Top Rated" ? true : false}
          >
            Top Rated
          </Button>
        </ButtonGroup>
      )}
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
