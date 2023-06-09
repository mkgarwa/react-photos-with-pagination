import {Nav, Navbar, Container} from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="/">Photos</Navbar.Brand>
          </Container>
        </Navbar>
    );
}

export default Header;