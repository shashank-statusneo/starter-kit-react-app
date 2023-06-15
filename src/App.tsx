import React, { useState } from 'react';
import logo from './logo.svg';
import styles from './App.module.css'; 
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import InventoryOptimizer from './pages/InventoryOptimizer';
import WareHouse from './pages/Warehouse';
import TopBar from './components/TopBar';
import SignIn from './pages/Home/signIn';
import SignUp from './pages/Home/signUp';
import Profile from './pages/Home/profile';
import UserSession from './services/auth';
import { TabContext } from '@mui/lab';
import {Container, Tabs, Tab} from '@mui/material'



const App = () => {

    const [currentTab, setCurrentTab] = useState('warehouse');

    const AppTabs = () => {


        const navigate = useNavigate()

        const mainMenuTabs: any = {
                warehouse: 'Warehouse',
                inventory: 'Inventory',
                network: 'Network',
                blending: 'Blending',
                pricing: 'Pricing',
        }
        
        return (
            <Container maxWidth="xl">
                <TabContext value={currentTab}>
                    <Tabs
                        variant="fullWidth"
                        style={{marginBottom: '10px'}}
                        selectionFollowsFocus
                        aria-label="Application Tabs"
                        value={currentTab}
                        onChange={(_, value) => {
                            setCurrentTab(value)
                            navigate(`/${value}`)
                        }}
                    >
                        {Object.keys(mainMenuTabs).map((value: any, index: any) => (
                            <Tab key={index} value={value} label={mainMenuTabs[value]} sx={{fontWeight: 'bold', fontSize: '1.5rem'}}/>
                        ))}
                    </Tabs>
                </TabContext>
            </Container>
        )
    }

    // @ts-ignore
      return (
        <BrowserRouter>
            <TopBar />
    
            {UserSession.isAuthenticated() ? 
                <>
                    <AppTabs/>
                </>
            : <></>
        }
            <Routes>
                <Route
                    // exact
                    path="/"
                    element= {UserSession.isAuthenticated() ? <></> : <SignIn/>}
                />

                <Route path="/warehouse" element={<WareHouse />}/>
                <Route path="/warehouse/:pageName" element={<WareHouse />}/>

                <Route path="/inventory" element={<InventoryOptimizer />}></Route>
                <Route path="/signin" element={<SignIn />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
