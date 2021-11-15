import NavMain from "../component/navbar.js";
import Footer from "../component/footer.js";
import Personal from "../comp-profile/personal.js";
import History from "../comp-profile/history.js";
import { Container } from "react-bootstrap";

import { useQuery } from "react-query";
import { API } from "../config/api.js";

function Profile() {
  let api = API();

  const title = "Profil";
  document.title = "Dewe Tour | " + title;

  const { data: history } = useQuery("historyChace", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
        "Content-Type": "application/json",
      },
    };

    const response = await api.get("/history", config);

    return response.data;
  });

  return (
    <>
      <NavMain />
      <Personal />
      <Container>
        <h3>
          <b>History Trip</b>
        </h3>
      </Container>
      {history?.map((item, index) => (
        <History item={item} key={index} />
      ))}
      <Footer />
    </>
  );
}

export default Profile;
