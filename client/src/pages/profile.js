import NavMain from "../component/navbar";
import Footer from "../component/footer";
import Personal from "../comp-profile/personal";
import PayWaiting from "../comp-pay/cPayWaiting";
import { Container } from "react-bootstrap";

function Profile() {
  return (
    <>
      <NavMain />
      <Personal />
      <Container>
        <h3>
          <b>History Trip</b>
        </h3>
      </Container>
      <PayWaiting />
      <Footer />
    </>
  );
}

export default Profile;
