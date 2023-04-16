import Link from 'next/link'
import { useState } from 'react';

function Navigation() {
    
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link href="/" className='nav-link' style={{color:'#06ac57'}}>
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link href="/configuration" className='nav-link' style={{color:'#06ac57'}}>
                    Configuracion
                </Link>
            </li>
        </ul>
    );
}

export default Navigation;