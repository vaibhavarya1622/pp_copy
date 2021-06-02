import React from 'react'
import Navbar from './Navbar/Navbar.component'
import HospitalList from './HospitalList/HospitalList'
import Footer from './Footer/Footer.component'
import HomePageComponent from './HomePageComponent/HomePageComponent'
const Home = () => {
    return (
        <div>
            <Navbar location='home' />
            {/* <HospitalList /> */}
            <HomePageComponent />
            <Footer />
        </div>
    )
}

export default Home
