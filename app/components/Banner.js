import Link from "next/link";
import "./Banner.css";
export default function Banner() {
  return (
    <div>
      <section className="mb-4 banner">
        <div className="container">
          <div>
            <div className="row">
              <div className="col-12 col-sm-6 d-flex d-xl-flex align-items-center align-items-xl-center banner-height">
                <div>
                  <h1 className="display-4">
                    <strong>THIẾT KẾ WEBSITE CHUYÊN NGHIỆP</strong>
                    <br />
                  </h1>
                  <p>
                    <span className="font-weight-bold">Liên hệ ngay: </span>
                    <a
                      href="tel:0332813077"
                      className="btn btn-sm btn-outline-primary"
                    >
                      033 281 3077
                    </a>
                  </p>
                  <div className="banner-card shadow p-3">
                    <h3 className="font-weight -bolds">
                      CHÍNH SÁCH ĐẶC BIỆT ĐẾN 12.12
                    </h3>
                    <hr />
                    <p>MIỄN PHÍ THIẾT KẾ CHO 20 KHÁCH HÀNG ĐĂNG KÝ ĐẦU TIÊN</p>
                    <button className="btn btn-sm btn-outline-light btn-cirle p-2">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 d-sm-flex d-lg-flex align-items-sm-center align-items-lg-center py-3 img-banner">
                <img className="w-100" src="img/bg-header.png" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
