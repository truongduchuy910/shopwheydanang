import Link from "next/link";
import "./Project.css";
export default function Project() {
  return (
    <div>
      <section>
        <div class="container pt-5">
          <div class="intro mb-5">
            <h2 class="text-center font-weight-bold mb-5">Các dự án</h2>
            <div class="row">
              <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                <a class="project-box" href="/demo/blog">
                  <div class="project shadow circle-box mb-3">
                    <div class="project-content p-3 d-flex justify-content-center align-items-center">
                      <div class="text-center">
                        <h5>Blog cá nhân</h5>
                        <i>Xem chi tiết</i>
                      </div>
                    </div>
                    <img src="/project/blog.png" class="w-100 project-img" />
                    <img src="/project/blog.png" class="w-100 project-size" />
                  </div>
                </a>
                <a class="project-box" href="/demo/dichvuquangcao">
                  <div class="project shadow circle-box mb-3">
                    <div class="project-content p-3 d-flex justify-content-center align-items-center">
                      <div class="text-center">
                        <h5>Dịch vụ quảng cáo</h5>
                        <i>Xem chi tiết</i>
                      </div>
                    </div>
                    <img
                      src="/project/dichvuquangcao.png"
                      class="w-100 project-img"
                    />
                    <img
                      src="/project/dichvuquangcao.png"
                      class="w-100 project-size"
                    />
                  </div>
                </a>
                <a class="project-box" href="/demo/freelancer">
                  <div class="project shadow circle-box mb-3">
                    <div class="project-content p-3 d-flex justify-content-center align-items-center">
                      <div class="text-center">
                        <h5>Freelancer</h5>
                        <i>Xem chi tiết</i>
                      </div>
                    </div>
                    <img
                      src="/project/freelancer.png"
                      class="w-100 project-img"
                    />
                    <img
                      src="/project/freelancer.png"
                      class="w-100 project-size"
                    />
                  </div>
                </a>
              </div>
              <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                <a class="project-box" href="/demo/gioithieudichvu">
                  <div class="project shadow circle-box mb-3">
                    <div class="project-content p-3 d-flex justify-content-center align-items-center">
                      <div class="text-center">
                        <h5>Giới thiệu dịch vụ</h5>
                        <i>Xem chi tiết</i>
                      </div>
                    </div>
                    <img
                      src="/project/gioithieudichvu.png"
                      class="w-100 project-img"
                    />
                    <img
                      src="/project/gioithieudichvu.png"
                      class="w-100 project-size"
                    />
                  </div>
                </a>
                <a class="project-box" href="/demo/gioithieuphanmem">
                  <div class="project shadow circle-box mb-3">
                    <div class="project-content p-3 d-flex justify-content-center align-items-center">
                      <div class="text-center">
                        <h5>Giới thiệu phần mềm</h5>
                        <i>Xem chi tiết</i>
                      </div>
                    </div>
                    <img
                      src="/project/gioithieuphanmem.png"
                      class="w-100 project-img"
                    />
                    <img
                      src="/project/gioithieuphanmem.png"
                      class="w-100 project-size"
                    />
                  </div>
                </a>
                <a class="project-box" href="/demo/kientructhietke">
                  <div class="project shadow circle-box mb-3">
                    <div class="project-content p-3 d-flex justify-content-center align-items-center">
                      <div class="text-center">
                        <h5>Kiến trúc thiết kế</h5>
                        <i>Xem chi tiết</i>
                      </div>
                    </div>
                    <img
                      src="/project/kientructhietke.png"
                      class="w-100 project-img"
                    />
                    <img
                      src="/project/kientructhietke.png"
                      class="w-100 project-size"
                    />
                  </div>
                </a>
              </div>
              <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                <a class="project-box" href="/demo/landingpage">
                  <div class="project shadow circle-box mb-3">
                    <div class="project-content p-3 d-flex justify-content-center align-items-center">
                      <div class="text-center">
                        <h5>Landing Page</h5>
                        <i>Xem chi tiết</i>
                      </div>
                    </div>
                    <img
                      src="/project/landingpage.png"
                      class="w-100 project-img"
                    />
                    <img
                      src="/project/landingpage.png"
                      class="w-100 project-size"
                    />
                  </div>
                </a>
                <a class="project-box" href="/demo/nhomnhac">
                  <div class="project shadow circle-box mb-3">
                    <div class="project-content p-3 d-flex justify-content-center align-items-center">
                      <div class="text-center">
                        <h5>Nhóm nhạc</h5>
                        <i>Xem chi tiết</i>
                      </div>
                    </div>
                    <img
                      src="/project/nhomnhac.png"
                      class="w-100 project-img"
                    />
                    <img
                      src="/project/nhomnhac.png"
                      class="w-100 project-size"
                    />
                  </div>
                </a>
                <a class="project-box" href="/demo/quangbadoanhnghiep">
                  <div class="project shadow circle-box mb-3">
                    <div class="project-content p-3 d-flex justify-content-center align-items-center">
                      <div class="text-center">
                        <h5>Quảng bá doanh nghiệp</h5>
                        <i>Xem chi tiết</i>
                      </div>
                    </div>
                    <img
                      src="/project/quangbadoanhnghiep.png"
                      class="w-100 project-img"
                    />
                    <img
                      src="/project/quangbadoanhnghiep.png"
                      class="w-100 project-size"
                    />
                  </div>
                </a>
              </div>
              <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                <a class="project-box" href="/demo/quangcaophanmem">
                  <div class="project shadow circle-box mb-3">
                    <div class="project-content p-3 d-flex justify-content-center align-items-center">
                      <div class="text-center">
                        <h5>Quảng cáo phần mềm</h5>
                        <i>Xem chi tiết</i>
                      </div>
                    </div>
                    <img
                      src="/project/quangcaophanmem.png"
                      class="w-100 project-img"
                    />
                    <img
                      src="/project/quangcaophanmem.png"
                      class="w-100 project-size"
                    />
                  </div>
                </a>
                <a class="project-box" href="/demo/thuonghieucanhan">
                  <div class="project shadow circle-box mb-3">
                    <div class="project-content p-3 d-flex justify-content-center align-items-center">
                      <div class="text-center">
                        <h5>Thương hiệu cá nhân</h5>
                        <i>Xem chi tiết</i>
                      </div>
                    </div>
                    <img
                      src="/project/thuonghieucanhan.png"
                      class="w-100 project-img"
                    />
                    <img
                      src="/project/thuonghieucanhan.png"
                      class="w-100 project-size"
                    />
                  </div>
                </a>
                <a class="project-box" href="/demo/thuongmaidientu">
                  <div class="project shadow circle-box mb-3">
                    <div class="project-content p-3 d-flex justify-content-center align-items-center">
                      <div class="text-center">
                        <h5>Thương mại điện tử</h5>
                        <i>Xem chi tiết</i>
                      </div>
                    </div>
                    <img
                      src="/project/thuongmaidientu.png"
                      class="w-100 project-img"
                    />
                    <img
                      src="/project/thuongmaidientu.png"
                      class="w-100 project-size"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div class="row justify-content-center row-eq-height features"></div>
        </div>
      </section>
    </div>
  );
}
