import { useParams } from "react-router-dom";

import NavMain from "../component/navbar.js";
import Footer from "../component/footer.js";
import Descriptions from "../com-detail/detailTrip.js";

import { useQuery } from "react-query";
import { API } from "../config/api.js";

function Detail() {
  let { id } = useParams();
  let api = API();

  const title = "Detail";
  document.title = "Dewe Tour | " + title;

  const { data: trip } = useQuery("payChace", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };

    const response = await api.get("/trip/" + id, config);

    return response.data;
  });

  return (
    <>
      <NavMain />
      {trip?.map((item, index) => (
        <Descriptions item={item} key={index} />
      ))}
      <Footer />
    </>
  );
}

export default Detail;
