import React, { useContext, useEffect, useState } from 'react';
import PayrollTable from '../../../components/tables/payroll/PayrollTable';
import { AlertContext } from '../../../context/AlertContext';
import axios from 'axios';
import { BACKENDURL } from '../../../helper/Urls';
import { useParams } from 'react-router-dom';

const GeneratePayrollDetail = () => {
  // const fnames = [
  //   'Abrham',
  //   'Halkano',
  //   'Markos',
  //   'Abebe',
  //   'Telahun',
  //   'Aserat',
  //   'Sleshi',
  // ];
  // const lnames = ['Tesfa', 'Mekonene', 'Aseffa', 'Mulu', 'Maru', 'Feleke'];
  // const mnames = ['Bekele', 'Dawit', 'Haile', 'Melaku', 'Telahun', 'Amare'];

  // const cities = [
  //   {
  //     name: 'Addis Ababa',
  //     subCities: [
  //       {
  //         name: 'Kirkos',
  //         weredas: ['Wereda 1', 'Wereda 2'],
  //       },
  //       {
  //         name: 'Lideta',
  //         weredas: ['Wereda 3', 'Wereda 4'],
  //       },
  //       {
  //         name: 'Bole',
  //         weredas: ['Wereda 5', 'Wereda 6'],
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Gonder',
  //     subCities: [
  //       {
  //         name: 'Aynalem',
  //         weredas: ['Wereda 7', 'Wereda 8'],
  //       },
  //       {
  //         name: 'Agena',
  //         weredas: ['Wereda 9', 'Wereda 10'],
  //       },
  //       {
  //         name: 'Gore',
  //         weredas: ['Wereda 11', 'Wereda 12'],
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Sidama',
  //     subCities: [
  //       {
  //         name: 'Hawassa',
  //         weredas: ['Wereda 13', 'Wereda 14'],
  //       },
  //       {
  //         name: 'Bensa',
  //         weredas: ['Wereda 15', 'Wereda 16'],
  //       },
  //     ],
  //   },
  // ];

  // const branchs = [
  //   {
  //     name: 'Addis Ababa Arada',
  //     department: [
  //       {
  //         name: 'IT',
  //         position: ['Software', 'IT'],
  //       },
  //       {
  //         name: 'Security',
  //         position: ['security', 'Shift Leader'],
  //       },
  //       {
  //         name: 'Marketing',
  //         position: ['Sales', 'Manager'],
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Addis Ababa Saris',
  //     department: [
  //       {
  //         name: 'Security',
  //         position: ['security', 'shift leader'],
  //       },
  //     ],
  //   },
  // ];

  // const generateRandomEmployee = () => {
  //   // Pick a random city
  // const randomCityIndex = Math.floor(Math.random() * cities.length);
  // const randomCity = cities[randomCityIndex];

  // // Pick a random subcity from the city 
  // const randomSubcityIndex = Math.floor(Math.random() * randomCity.subCities.length);
  // const randomSubcity = randomCity.subCities[randomSubcityIndex];

  // // Pick a random wereda from the subcity
  // const randomWeredaIndex = Math.floor(Math.random() * randomSubcity.weredas.length);  
  // const randomWereda = randomSubcity.weredas[randomWeredaIndex];


  //  // Pick a random city
  //  const randomBranchIndex = Math.floor(Math.random() * branchs.length);
  //  const randomBranch = branchs[randomBranchIndex];
 
  //  // Pick a random subcity from the city 
  //  const randomDepIndex = Math.floor(Math.random() * randomBranch.department.length);
  //  const randomDep = randomBranch.department[randomDepIndex];
 
  //  // Pick a random wereda from the subcity
  //  const randomPositionIndex = Math.floor(Math.random() * randomDep.position.length);  
  //  const randomPosition = randomDep.position[randomPositionIndex];

  //   return {
  //     key: Math.random ().toString (),
  //     IDNO: `EMP00${Math.floor (Math.random () * 100)}`,
  //     name: fnames[Math.floor (Math.random () * fnames.length)] +' '+ mnames[Math.floor (Math.random () * mnames.length)] +' '+ lnames[Math.floor (Math.random () * lnames.length)],
  //     branch: randomBranch.name,
  //     department: randomDep.name,
  //     position: randomPosition,
  //     site:randomBranch.name,
  //     city: randomCity.name,
  //     subCity: randomSubcity.name,
  //     wereda: randomWereda,
  //     basicSalary: Math.floor (Math.random () * 10000),
  //     earnings: {
  //       taxable: Math.floor (Math.random () * 1000),
  //       nonTaxable: Math.floor (Math.random () * 200),
  //       total: Math.floor (Math.random () * 1200),
  //     },
  //     grossSalary: Math.floor (Math.random () * 20000),
  //     deductions: {
  //       incomeTax: Math.floor (Math.random () * 1000),
  //       PF7: Math.floor (Math.random () * 700),
  //       PF11: Math.floor (Math.random () * 1100),
  //       loan: Math.floor (Math.random () * 500),
  //       penalty: Math.floor (Math.random () * 200),
  //       total: Math.floor (Math.random () * 3500),
  //     },
  //     netSalary: Math.floor (Math.random () * 15000),
  //   };
  // };
  // const employees = Array (35).fill (0).map (generateRandomEmployee);

  const {openNotification} = useContext(AlertContext);
  const [payrollData,setPayrollData]=useState([])
  const [loading,setLoading]=useState(false)
  const params=useParams()

  const getPayrollData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/payroll/generate/list?id=${params.id}`);
      setLoading (false);
      setPayrollData(res.data.list)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  useEffect(()=>{
    getPayrollData()
  },[])

  return <div><PayrollTable loading={loading} reload={getPayrollData} payrollData={payrollData} /></div>;
};

export default GeneratePayrollDetail;
