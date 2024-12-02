import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Spin } from "antd";
import { MdDashboard, MdWork, MdOutlineDateRange } from "react-icons/md";
import {
  FaClipboardList,
  FaUserShield,
  FaUserCheck,
  FaProjectDiagram,
  FaBuilding,
  FaUsers,
  FaToolbox,
} from "react-icons/fa";
import { BACKENDURL } from "../helper/Urls";
import { FaNoteSticky } from "react-icons/fa6";
import NoticeCard from "../components/forms/dashboard/NoticeCard";

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(null);
  const [vacancyCount, setVacancyCount] = useState(null);
  const [projectCount, setProjectCount] = useState(null);
  const [assetCount, setAssetCount] = useState(null);
  const [branchCount, setBranchcount] = useState(null);
  const [departmentCount, setDepartmentCount] = useState(null);
  const [companyCount, setCompanyCount] = useState(null);
  const [positionCount, setPositionCount] = useState(null);

  // Fetch the counts from APIs (replace with your actual API calls)
  useEffect(() => {
    // Fetch employee count
    fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setEmployeeCount(data.employeeCount))
      .catch(() => setEmployeeCount(0));

    // Fetch vacancy count
    fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setVacancyCount(data.vacancyCount))
      .catch(() => setVacancyCount(0));

    // Fetch project count
    fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setProjectCount(data.projectCount))
      .catch(() => setProjectCount(0));

    fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setBranchcount(data.branchCount))
      .catch(() => setBranchcount(0));

    fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setDepartmentCount(data.departmentCount))
      .catch(() => setDepartmentCount(0));

    fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setCompanyCount(data.companyCount))
      .catch(() => setCompanyCount(0));

    fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setPositionCount(data.positionCount))
      .catch(() => setPositionCount(0));

    // Fetch asset count
    fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setAssetCount(data.assetCount))
      .catch(() => setAssetCount(0));
  }, []);

  const cardData = [
    {
      title: "Employee",
      icon: <FaUsers size={40} color={"rgb(0,140,255)"} />,
      link: "/employee/list",
      count: employeeCount,
    },
    {
      title: "Vacancy",
      icon: <MdWork size={40} color={"rgb(0,140,255)"} />,
      link: "/vacancy/list",
      count: vacancyCount,
    },
    {
      title: "Company",
      icon: <FaBuilding size={40} color={"rgb(0,140,255)"} />,
      link: "/project/company",
      count: companyCount,
    },
    {
      title: "Projects",
      icon: <FaProjectDiagram size={40} color={"rgb(0,140,255)"} />,
      link: "/project/list",
      count: projectCount,
    },
    {
      title: "Branch",
      icon: <MdOutlineDateRange size={40} color={"rgb(0,140,255)"} />,
      link: "/organzation/branch",
      count: branchCount,
    },
    {
      title: "Departemnt",
      icon: <FaClipboardList size={40} color={"rgb(0,140,255)"} />,
      link: "/organzation/department",
      count: departmentCount,
    },
    {
      title: "Position",
      icon: <FaUserCheck size={40} color={"rgb(0,140,255)"} />,
      link: "/organzation/position",
      count: positionCount,
    },
    {
      title: "Users",
      icon: <FaUserShield size={40} color={"rgb(0,140,255)"} />,
      link: "/users/list",
      count: null,
    },
    {
      title: "Asset",
      icon: <FaToolbox size={40} color={"rgb(0,140,255)"} />,
      link: "/asset/inventorypage",
      count: assetCount,
    },
    {
      title: "Blacklist",
      icon: <FaUserShield size={40} color={"red"} />,
      link: "/blacklist/list",
      count: employeeCount,
    },
  ];

  const meetingData = [
    {
      id: 1,
      date: "12/05/2017",
      subject:'የዘርፍ ምርታማነትን እና የስትራቴጂ እቅዶችን ማበርከት',
      time: "3:00 ከሰዓት",
      location: "ኮንፈረንስ ክፍል ኤ",
      agenda: "የዘርፍ ምርታማነትን እና የስትራቴጂ እቅዶችን ማበርከት",
      companyName: "ቴክ ኢኖቬተርስ ሊሚትድ"
    },
    {
      id: 2,
      date: "12/05/2017",
      time: "10:00 ከሰዓት",
      subject:'የዘርፍ ምርታማነትን እና የስትራቴጂ እቅዶችን ማበርከት',
      location: "ዋናው ክፍል",
      agenda: "የዓመታዊ የገንዘብ ገምጋም እና ቅንብሮች",
      companyName: "ቪዥን ኮርፕ"
    },
    {
      id: 3,
      date: "December 7, 2024",
      time: "1:00 PM",
      location: "Virtual (Zoom)",
      subject:'Executive-level strategic discussions',
      agenda: "Team alignment and new project onboarding",
      companyName: "Remote Solutions Inc.",
    },
    {
      id: 4,
      date: "December 8, 2024",
      time: "4:00 PM",
      location: "Training Room",
      subject:'Executive-level strategic discussions',
      agenda: "Skill development workshop overview",
      companyName: "SkillUp Enterprises",
    },
    {
      id: 5,
      date: "December 9, 2024",
      time: "9:00 AM",
      location: "Executive Boardroom",
      subject:'Executive-level strategic discussions',
      agenda: "Executive-level strategic discussions",
      companyName: "Leadership Edge Co.",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {cardData.map((card, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Link to={card.link}>
              <Card
                hoverable
                style={{ borderRadius: "10px", textAlign: "center" }}
              >
                <div>{card.icon}</div>
                <h3>{card.title}</h3>
                {card.count !== null ? (
                  <p>
                    {card.count}{" "}
                    {card.title === "Employee" ? "Employees" : "Items"}
                  </p>
                ) : (
                  <Spin /> // Show spinner if data is still loading
                )}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Card
        style={{ marginTop: "10px" }}
        title={
          <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <FaNoteSticky /> <span>Notice</span>
          </span>
        }
      >
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:'auto auto',
            gap:'10px'
          }}
        >
          {meetingData.map((meeting) => (
            <NoticeCard
              key={meeting.id}
              subject={meeting.subject}
              date={meeting.date}
              time={meeting.time}
              location={meeting.location}
              agenda={meeting.agenda}
              companyName={meeting.companyName}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
