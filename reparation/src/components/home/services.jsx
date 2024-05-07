import React from 'react'
import '../../assets/css/services.css'
import img1 from "../../assets/img/services/1.jpg"
import img2 from "../../assets/img/services/2.jpg"
import img3 from "../../assets/img/services/3.jpeg"
import img4 from "../../assets/img/services/4.jpg"
import AOS from 'aos';

const Services = () => {
  React.useEffect(() => {
    AOS.init({
      duration : 2000
    });
  }, []);
  return (
    <section id="services" className="services">
      <div className="container" data-aos="fade-up">

        <div className="section-header">
          <h2>Nos Services</h2>
        </div>

        <div className="row gy-5">
          <div className="col-xl-3 col-md-6" data-aos="zoom-in" data-aos-delay="200">
            <div className="service-item">
              <div className="img">
                <img src={img1} className="img-fluid" alt="" />
              </div>
              <div className="details position-relative">
                <div className="icon">
                  <i className="bi bi-bar-chart-line"></i>
                </div>
                <h3>
                Réparation de Téléphones Portables
                </h3>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6" data-aos="zoom-in" data-aos-delay="300">
            <div className="service-item">
              <div className="img">
                <img src={img2} className="img-fluid" alt="" />
              </div>
              <div className="details position-relative">
                <div className="icon">
                  <i className="bi bi-broadcast"></i>
                </div>
                <h3>
                Réparation des Tablettes et ipads
                </h3>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6" data-aos="zoom-in" data-aos-delay="400">
            <div className="service-item">
              <div className="img">
                <img src={img3} className="img-fluid" alt="" />
              </div>
              <div className="details position-relative">
                <div className="icon">
                  <i className="bi bi-bounding-box-circles"></i>
                </div>
                <h3>
                Réparation d&apos;Ordinateurs Portables
                </h3>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6" data-aos="zoom-in" data-aos-delay="400">
            <div className="service-item">
              <div className="img">
                <img src={img4} className="img-fluid" alt="" />
              </div>
              <div className="details position-relative">
                <div className="icon">
                  <i className="bi bi-activity"></i>
                </div>
                <h3>
                Diagnostic et Dépannage Logiciel
                </h3>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )

}

export default Services;
