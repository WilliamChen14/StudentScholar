import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";




function HeaderComponent() {
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  let items = ["Home", "Classes", "Files", "Profile"];

  const getMessage = () => {
    return items.length === 0 && <p>No items Found</p>;
  };

  const handleClick = (event) => console.log(event);

  const getHref = (item) => {
    let tempHref = "/".concat(item);
    if (tempHref === "/Home") {
      return "/";
    }
    return tempHref;
  };




  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto float-right">
              {items.map((item, index) => (
                <Nav.Link
                  href={getHref(item)}
                  className="p-2 "
                  key={item}
                  onClick={handleClick}
                >
                  {item}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default HeaderComponent;
