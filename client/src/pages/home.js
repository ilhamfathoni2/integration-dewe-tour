import NavMain from "../component/navbar";
import Footer from "../component/footer";
import Hero from "../comp-home/hero";
import CardMain from "../comp-home/card-hero";
import Product from "../product/product";

function HomePage() {
  return (
    <>
      <NavMain />
      <Hero />
      <CardMain />
      <Product />
      <Footer />
    </>
  );
}

export default HomePage;
