import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const NoticeCard = ({ date, time, location, agenda, companyName,subject }) => {
  return (
    <div
      style={{ minWidth: '49%', padding: "20px",boxShadow:'0 0 1px gray' ,borderRadius:'10px'}}
    >
      <Text>
        Dear Team,
        <br />
        We hope this message finds you well. This is to inform you that our
        upcoming {subject} meeting is scheduled as follows:
      </Text>
      <br />
      <ul>
        <li>
          <strong>Date:</strong> {date || "To be announced"}
        </li>
        <li>
          <strong>Time:</strong> {time || "To be announced"}
        </li>
        <li>
          <strong>Location:</strong> {location || "To be announced"}
        </li>
      </ul>
      <Text>
        The meeting will focus on: {agenda || "Important updates and discussions"}.
        Your punctuality and active participation are highly encouraged to make
        the session productive.
        <br />
        <br />
        Best Regards,
        <br />
        {companyName || "Your Company"}
      </Text>
    </div>
  );
};

export default NoticeCard;
