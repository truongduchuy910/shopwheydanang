import "./Review.css";
export default function Review() {
  return (
    <div>
      <section className="features-boxed bg-white">
        <div className="container">
          <div className="intro">
            <h2 className="text-center p-0">
              Quy trình làm việc chuyên nghiệp
            </h2>
          </div>
          <div className="row justify-content-center features">
            <div className="col-sm-6 col-md-5 col-lg-4 item">
              <div className="row">
                <div className="col-4 col-sm-12 col-md-12">
                  <div className="bg-light border rounded-circle shadow-sm w-100 p-4 mx-auto mb-3 review-icon">
                    <img className="w-100 review-icon" src="img/process-layer1.png" />
                  </div>
                </div>
                <div className="col-8 col-sm-12 col-md-12">
                  <div className="m-0">
                    <h3 className="text-left text-md-center name">
                      <strong>Tìm hiểu yêu cầu</strong>
                      <br />
                    </h3>
                    <p className="text-left text-md-center description">
                      Trong quá trình này, chúng tôi làm việc với bạn để tìm
                      hiểu những yêu cầu về giao diện và chức năng chính của
                      trang web.
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-5 col-lg-4 item">
              <div className="row">
                <div className="col-4 col-sm-12 col-md-12">
                  <div className="bg-light border rounded-circle shadow-sm w-100 p-4 mx-auto mb-3 review-icon">
                    <img className="w-100 review-icon" src="img/process-layer2.png" />
                  </div>
                </div>
                <div className="col-8 col-sm-12 col-md-12">
                  <div className="m-0">
                    <h3 className="text-left text-md-center name">
                      <strong>Thiết kế giao diện</strong>
                      <br />
                    </h3>
                    <p className="text-left text-md-center description">
                      Chúng tôi tạo ra thiết kế thông qua những gì thu được từ
                      trước bằng cách sử dụng các xu hướng UI / UX tốt nhất.
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-5 col-lg-4 item">
              <div className="row">
                <div className="col-4 col-sm-12 col-md-12">
                  <div className="bg-light border rounded-circle shadow-sm w-100 p-4 mx-auto mb-3 review-icon">
                    <img className="w-100 review-icon" src="img/process-layer1.png" />
                  </div>
                </div>
                <div className="col-8 col-sm-12 col-md-12">
                  <div className="m-0">
                    <h3 className="text-left text-md-center name">
                      <strong>Xây dựng trang web</strong>
                      <br />
                    </h3>
                    <p className="text-left text-md-center description">
                      Chúng tôi bắt đầu lập trình trang web dựa trên bản thiết
                      kế giao diện và hoàn thiện nó sau khi bạn hài lòng.
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
