import React from 'react';
import Nav from './components/NavBar';  
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
          <header>
            <Nav />
          </header>
          {children}       
          <footer className="footer">
            <p>All interpretation rights are reserved by TP09.</p>
          </footer>
      </body>
    </html>

  );
}
