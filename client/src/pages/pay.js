import NavMain from "../component/navbar.js";
import Footer from "../component/footer.js";
import ComPay from "../comp-pay/cPay.js";

import { useQuery } from "react-query";
import { API } from "../config/api.js";

function Pay() {
  const title = "Payment";
  document.title = "Dewe Tour | " + title;

  let api = API();

  const { data: transaction } = useQuery("deatilCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };

    const response = await api.get("/transaction", config);

    return response.data;
  });

  return (
    <>
      <NavMain />
      {transaction?.map((item, index) => (
        <ComPay item={item} key={index} />
      ))}
      <Footer />
    </>
  );
}

export default Pay;
