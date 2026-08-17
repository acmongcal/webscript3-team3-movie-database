import { Card, Button } from "react-bootstrap";
import { IMAGE_BASE_URL } from "../global/globals";

function HomeMovieSection({ movies }) {
  return (
    <div className="home-movie-grid">
      {movies.map((movie, i) => (
        <Card key={i} style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={IMAGE_BASE_URL + movie.backdrop_path}
            alt={movie.title}
          />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.overview}</Card.Text>
            <Button variant="primary">Details</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default HomeMovieSection;
