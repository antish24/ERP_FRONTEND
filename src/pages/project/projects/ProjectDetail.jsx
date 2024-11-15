import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Descriptions, Button} from 'antd';
import axios from 'axios';
import {BACKENDURL} from '../../../helper/Urls';
import EmployeeProjectTable
  from '../../../components/tables/project/EmployeeProjectTable';
import AssignEmployee from '../../../components/forms/project/AssignEmployee';
import ModalForm from '../../../modal/Modal';
import {AlertContext} from '../../../context/AlertContext';
import {FormatDay} from '../../../helper/FormateDay';

const ProjectDetail = () => {
  const {id} = useParams (); // Get project ID from the URL params
  const [projectEmployee, setProjectEmployee] = useState ([]);
  const [project, setProject] = useState ([]);
  const [loading, setLoading] = useState (false);
  const [loadingEmployee, setLoadingEmployee] = useState (false);
  const {openNotification} = useContext (AlertContext);

  const fetchProjectEmployee = async () => {
    setLoadingEmployee (true);
    try {
      const projectResponse = await axios.get (
        `${BACKENDURL}/project/employees?project=${id}`
      );
      setProjectEmployee (projectResponse.data.employees);
      setLoadingEmployee (false);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoadingEmployee (false);
    }
  };

  const fetchProjectDetail = async () => {
    setLoading (true);
    try {
      const projectResponse = await axios.get (`${BACKENDURL}/project/${id}`);
      setProject (projectResponse.data.project);
      setLoading (false);
    } catch (error) {
      setLoading (false);
    }
  };

  useEffect (
    () => {
      fetchProjectDetail ();
    },
    [id]
  );

  useEffect (() => {
    fetchProjectEmployee ();
  }, []);

  const [modalOpen, setModalOpen] = useState (false);

  return (
    <div>
      <div style={{height: '50px', display: 'flex', gap: '10px'}}>
        <Button type="primary" onClick={() => setModalOpen (true)}>
          Assign Employee
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={'Assign Employee From'}
          content={
            <AssignEmployee
              projectId={id}
              reload={() => fetchProjectEmployee ()}
              openModalFun={e => setModalOpen (e)}
            />
          }
        />
      </div>
      <div>
        <EmployeeProjectTable
          userData={projectEmployee}
          reload={() => fetchProjectEmployee ()}
          loading={loadingEmployee}
        />
      </div>
      {project &&
        <Descriptions title="Project Details" bordered>
          <Descriptions.Item label="Site Name">
            {project.site}
          </Descriptions.Item>
          <Descriptions.Item label="Company">
            {project.company?.name}
          </Descriptions.Item>
          <Descriptions.Item label="From">
            {FormatDay (project.startDate)}
          </Descriptions.Item>
          <Descriptions.Item label="To">
            {FormatDay (project.endDate)}
          </Descriptions.Item>
          <Descriptions.Item label="OT Price Rate">
            {project.price}
          </Descriptions.Item>
          <Descriptions.Item label="Number of Employees">
            {project.noSecurity}
          </Descriptions.Item>
          <Descriptions.Item label="Attachments">
            {project.attachments
              ? <a
                  target="_blank"
                  href={`${BACKENDURL}/uploads/new/${project.attachments}`}
                >
                  View
                </a>
              : 'No attachments'}
          </Descriptions.Item>
        </Descriptions>}
    </div>
  );
};

export default ProjectDetail;
