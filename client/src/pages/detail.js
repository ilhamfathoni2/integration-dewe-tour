import { useParams } from "react-router-dom";

import NavMain from "../component/navbar";
import Footer from "../component/footer";
import Descriptions from "../com-detail/detailTrip";

import { useQuery } from "react-query";
import { API } from "../config/api";

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
