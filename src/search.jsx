import { Container, Row, InputGroup, Form } from "react-bootstrap";

const SearchBar = (props) => {
  const { filterTable } = props;

  return (
    <Container>
      <Row className="justify-content-end mb-3">
        <div className="col-3 text-right p-0">
          <InputGroup>
            <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
            <Form.Control
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="basic-addon1"
              onChange={filterTable}
            />
          </InputGroup>
        </div>
      </Row>
    </Container>
  );
};

export default SearchBar;
