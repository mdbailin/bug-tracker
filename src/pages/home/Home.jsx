import React from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import "./home.scss";
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import Table from '../../components/table/Table';

const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="user"/>
                    <Widget type="project"/>
                    <Widget type="ticket"/>
                </div>
                <div className="charts">
                    <Featured />
                    <Chart title="Tickets by Month" aspect={2/1}/> 
                </div>
                <div className="listContainer">
                    <div className="listTitle">Latest Tickets</div>
                    <Table />
                </div>
            </div>
        </div>
    )
}

export default Home