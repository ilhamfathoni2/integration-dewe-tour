import "./bassic.css";
import leaf from "../src-assets/leaf.png";
import { Image } from "react-bootstrap";

function Footer() {
  return (
    <>
      <div className="d-flex justify-content-end">
        <Image src={leaf} className="leaf" />
      </div>
      <footer>
        <h6 className="text-footer">
          Copyright @ 2020 Dewe Tour - Ilham Fathoni - DWF26IF All Right
          reserved
        </h6>
      </footer>
    </>
  );
}

export default Footer;
