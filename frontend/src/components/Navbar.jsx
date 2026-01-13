import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { CostsContext } from '../contexts/CostsContext.jsx';
const Navbar = () => {
    const { isAuthenticated, handleLogout } = React.useContext(CostsContext);

    return (
        <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '10px 20px', 
            backgroundColor: '#333', 
            color: 'white' 
        }}>
            <div>
                <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                    Cost Manager
                </Link>
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {/* קישורים שיופיעו תמיד או רק למחוברים - תלוי בהחלטה שלך */}
                { <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>}
                { <Link to="/report" style={{ color: 'white', textDecoration: 'none' }}>Reports</Link>}
                { <Link to="/statistics" style={{ color: 'white', textDecoration: 'none' }}>Statistics</Link>}

                {/* הצגת כפתור Login רק אם המשתמש *לא* מחובר */}
                {!isAuthenticated ? (
                    <Link to="/login" style={{ 
                        color: 'white', 
                        textDecoration: 'none',
                        border: '1px solid white',
                        padding: '5px 10px',
                        borderRadius: '4px'
                    }}>
                        Login
                    </Link>
                ) : (
                    /* הצגת כפתור Logout רק אם המשתמש מחובר */
                     <button
                        onClick={handleLogout} 
                        style={{ 
                            cursor: 'pointer', 
                            backgroundColor: '#f44336', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px',
                            padding: '6px 12px',
                            fontWeight: 'bold'
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;