import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import ProjectTable from '../../../components/tables/project/ProjectTable';
import NewProjectForm from '../../../components/forms/project/NewProjectForm';
import ModalForm from '../../../modal/Modal';
import { BACKENDURL } from '../../../helper/Urls';
import ImportCSV from '../../../helper/ImportCSV';

const ProjectsPage = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch project data
  const getProjectData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKENDURL}/project/all`); // Adjust URL if needed
      setProjectData(res.data.projects); // Adjust based on API response structure
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch project data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjectData();
  }, []);

  const [modalOpen, setModalOpen] = useState (false);
  const [modalContent, setModalContent] = useState ([]);
  const [modalTitle, setModalTitle] = useState ('');


  return (
    <div>
      <div style={{ height: '50px', display: 'flex', gap: '10px' }}>
        <Button type="primary" onClick={() => {setModalOpen (true);setModalContent(<NewProjectForm reload={getProjectData} openModalFun={setModalOpen} />);setModalTitle('New Project Form')}}>
        Add New Project
        </Button>
        <Button type='default' onClick={() => {setModalOpen (true);setModalContent(<ImportCSV route={'sites'} reload={getProjectData} openModalFun={setModalOpen} />);setModalTitle('Import Project Form')}}>
          Import Sites
        </Button>
        <Button type="default" onClick={getProjectData} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen(false)}
          title={modalTitle}
          content={modalContent}
        />
      </div>
      <ProjectTable loading={loading} datas={projectData} setProjectData={getProjectData} />
    </div>
  );
};

export default ProjectsPage;