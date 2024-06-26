import React from "react";

const ContactInfo = ({
  address,
  description,
  email,
  phone,
  title,
  working,
  workingSunday,
}) => {
  const workingDay = working?.split(" ")?.slice(0, 1)?.toString();
  const workingTime = working?.split(" ")?.slice(1)?.join(" ");
  const subWorkingSunday = workingSunday?.split(" ")?.slice(0, 1)?.toString();
  const workingSundayTime = workingSunday?.split(" ")?.slice(1)?.join(" ");

  return (
    <div className="col-lg-6 mb-2 mb-lg-0">
      <h2 className="title mb-1">{title}</h2>
      <p className="mb-3">{description}</p>
      <div className="row">
        <div className="col-sm-7">
          <div className="contact-info">
            <h3>The Office</h3>
            <ul className="contact-list">
              <li>
                <i className="icon-map-marker" /> {address}
              </li>
              <li>
                <i className="icon-phone" />
                <a href="tel:#">{phone}</a>
              </li>
              <li>
                <i className="icon-envelope" />
                <a href="mailto:#">{email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-5">
          <div className="contact-info">
            <h3>The Office</h3>
            <ul className="contact-list">
              <li>
                <i className="icon-clock-o" />
                <span className="text-dark">{workingDay}</span>
                <br />
                {workingTime}
              </li>
              <li>
                <i className="icon-calendar" />
                <span className="text-dark">{subWorkingSunday}</span>
                <br />
                {workingSundayTime}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
