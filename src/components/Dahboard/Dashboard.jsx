import React, { useEffect, useState } from 'react';
import { Card, Navbar, Form, Button } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Dashboard.css';
import { getGrievancesAPI, deleteGrievanceAPI } from '../../services/allAPI';
import { useNavigate } from 'react-router-dom';





const Dashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [filteredGrievances, setFilteredGrievances] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();


  const handleNavigate = () => {
    navigate('/'); 
  };

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await getGrievancesAPI();
        if (response.data && response.data.data && response.data.data.length > 0) {
          setGrievances(response.data.data);
          setFilteredGrievances(response.data.data);
        } else {
          setGrievances([]);
          setFilteredGrievances([]);
        }
      } catch (error) {
        console.error('Error fetching grievances:', error);
      }
    };

    fetchGrievances();
  }, []);

  useEffect(() => {
    const results = grievances.filter(grievance =>
      grievance.fullAddress.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredGrievances(results);
  }, [search, grievances]);

  const handleDelete = async (id) => {
    try {
      await deleteGrievanceAPI(id);
      setGrievances(grievances.filter(grievance => grievance._id !== id));
      setFilteredGrievances(filteredGrievances.filter(grievance => grievance._id !== id));
    } catch (error) {
      console.error('Error deleting grievance:', error);
    }
  };

  return (
    <>
      <Navbar style={{ backgroundColor: 'black' }} expand="lg">
        <Navbar.Brand >
        <div className="btn mt-2" style={{backgroundColor:'white',marginLeft:'80px'}} onClick={handleNavigate}>Logout</div>
        </Navbar.Brand>
        <div className="ml-auto d-flex align-items-center mt-3">
          <div className="search-container">
            <Form.Control
              type="text"
              placeholder="Search by location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="button-container">
            <Button variant="outline-light">
              <i className="fa fa-search"></i>
            </Button>
          </div>
        </div>
      </Navbar>

      <div className="main-div">
        <div className="card-container">
          {filteredGrievances.length > 0 ? (
            filteredGrievances.map(grievance => (
              <Card className="grievance-card" key={grievance._id}>
                <Card.Body style={{ padding: '30px' }}>
                  <div className="card-details">
                    <Card.Text>Full Name: {grievance.firstName} {grievance.lastName}</Card.Text>
                    <Card.Text>Address: {grievance.fullAddress}</Card.Text>
                    <Card.Text>Complaint: {grievance.complaint}</Card.Text>
                    <Card.Text>Pin Code: {grievance.pincode}</Card.Text>
                    <Card.Text>Date: {new Date(grievance.grievanceDate).toLocaleDateString()}</Card.Text>
                    <Card.Text>Mobile number: {grievance.mobileNumber}</Card.Text>
                  </div>
                  <div className="card-actions">
                    <input type="checkbox" className="card-checkbox" />
                    <i
                      className="fa fa-trash card-trash-icon"
                      onClick={() => handleDelete(grievance._id)}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No grievances found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
