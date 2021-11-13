import NavMain from "../component/navbar";
import Footer from "../component/footer";
import Personal from "../comp-profile/personal";
import History from "../comp-profile/history";
import { Container } from "react-bootstrap";

import { useQuery } from "react-query";
import { API } from "../config/api";

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
    console.log(response);

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
