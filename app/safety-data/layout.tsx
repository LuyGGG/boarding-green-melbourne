import React from 'react';
import Nav from '../components/NavBar';

export default function SafetyDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}
