import { useState } from 'react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const publications = [
    {
      title: "Patterns of Specialty Tobacco Retail Locations and Visitor Counts in the United States",
      authors: "Austin Landini, Christopher Lowenstein, and Michael F. Pesko",
      status: "Published in Tobacco Control",
      abstract: "An analysis of spatial spillovers, demographic transitions, and retail cluster patterns surrounding specialty tobacco locations across the United States.",
      repoLink: "https://github.com/Social-Impact-Lab-SIL/SpecialtyTobaccoDatabase",
      dataRepoLink: "https://github.com/Social-Impact-Lab-SIL/SIL-Data-Repository/tree/main/Specialty-Tobacco",
      pubLink: "https://doi.org/10.1136/tc-2026-060085",
      contact: "clowenstein@missouri.edu"
    },
    {
      title: "Novel product, familiar challenges: Navigating uncertainty in oral nicotine pouch regulation",
      authors: "Lauren Tonti and Michael F. Pesko",
      status: "Published in Addiction",
      abstract: "An evaluation of policy standards and methodological tracking regarding modern tobacco and substance use controls.",
      repoLink: "https://github.com/Social-Impact-Lab-SIL/SIL-Data-Repository",
      pubLink: "https://doi.org/10.1111/add.70531",
      contact: "ltonti@missouri.edu"
    },
    {
      title: "Standardising the measurement of cigar tax rates in the USA, 2010–2024",
      authors: "Guthrie Scoblic, Rachel Y L Fung, Abigail S Friedman, and Michael F. Pesko",
      status: "Published in Tobacco Control",
      abstract: "An empirical examination of cigar tax standardisation frameworks, pricing behavior, and cross-market substitution effects.",
      repoLink: "https://github.com/Social-Impact-Lab-SIL/CigarTaxStandardisation",
      pubLink: "https://doi.org/10.1136/tc-2026-060077",
      contact: "rachelfung@missouri.edu"
    }
  ];

  const filteredPubs = publications.filter(pub => {
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = 
      statusFilter === 'All' || pub.status.toLowerCase().includes(statusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: '40px 24px', textAlign: 'left', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
        <h1>Research & Manuscript Archive</h1>
        <p style={{ color: 'var(--text)', marginTop: '8px', fontSize: '16px' }}>
          Explore code repositories, data documentation, and interactive dashboards for completed and ongoing research by the Social Impact Lab.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Search by title or author..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1',
            minWidth: '240px',
            padding: '12px 16px',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            background: 'var(--bg)',
            color: 'var(--text-h)',
            fontSize: '15px',
            outline: 'none'
          }}
        />
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '12px 16px',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            background: 'var(--bg)',
            color: 'var(--text-h)',
            fontSize: '15px',
            outline: 'none'
          }}
        >
          <option value="All">All Statuses</option>
          <option value="Forthcoming">Forthcoming / Published</option>
          <option value="Under Review">Under Review</option>
        </select>
      </div>

      {/* Publications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {filteredPubs.length > 0 ? (
          filteredPubs.map((pub, index) => (
            <div 
              key={index} 
              style={{
                background: 'var(--bg)',
                padding: '24px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <h2>{pub.title}</h2>
              
              <p style={{ fontSize: '15px', marginBottom: '8px', color: 'var(--text-h)' }}>
                <strong>Authors:</strong> {pub.authors}
              </p>
              
              <p style={{ fontSize: '14px', marginBottom: '12px' }}>
                <strong>Status:</strong>{' '}
                <span style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  background: 'var(--accent-bg)',
                  color: 'var(--accent)',
                  borderRadius: '4px',
                  border: '1px solid var(--accent-border)',
                  fontSize: '13px',
                  fontWeight: '500',
                  marginLeft: '4px'
                }}>
                  {pub.status}
                </span>
              </p>

              <p style={{ fontSize: '15px', marginBottom: '16px', background: 'var(--code-bg)', padding: '12px', borderRadius: '6px' }}>
                {pub.abstract}
              </p>

              {/* Strict Two-Column Grid for Card Footer Layout */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr auto', 
                alignItems: 'center', 
                gap: '16px', 
                borderTop: '1px solid var(--border)', 
                paddingTop: '16px',
                flexWrap: 'wrap'
              }}>
                
                {/* Left Side: Contact Information */}
                <span style={{ fontSize: '14px', color: 'var(--text)' }}>
                  Contact: <a href={`mailto:${pub.contact}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>{pub.contact}</a>
                </span>

                {/* Right Side: Strictly Locked 3-Column Button Grid Container */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '480px', maxWidth: '100%' }}>
                  
                  {/* Slot 1: View Publication */}
                  <div style={{ display: 'flex' }}>
                    {pub.pubLink ? (
                      <a 
                        href={pub.pubLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{
                          padding: '8px 10px',
                          background: 'var(--accent)',
                          color: '#fff',
                          borderRadius: '6px',
                          fontSize: '12px',
                          textDecoration: 'none',
                          fontWeight: '500',
                          textAlign: 'center',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      >
                        Publication
                      </a>
                    ) : null}
                  </div>

                  {/* Slot 2: GitHub Repository */}
                  <div style={{ display: 'flex' }}>
                    {pub.repoLink ? (
                      <a 
                        href={pub.repoLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{
                          padding: '8px 10px',
                          background: 'var(--code-bg)',
                          color: 'var(--text-h)',
                          borderRadius: '6px',
                          fontSize: '12px',
                          textDecoration: 'none',
                          border: '1px solid var(--border)',
                          fontWeight: '500',
                          textAlign: 'center',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      >
                        GitHub Repo
                      </a>
                    ) : null}
                  </div>

                  {/* Slot 3: Data Repository */}
                  <div style={{ display: 'flex' }}>
                    {pub.dataRepoLink ? (
                      <a 
                        href={pub.dataRepoLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{
                          padding: '8px 10px',
                          background: 'var(--code-bg)',
                          color: 'var(--text-h)',
                          borderRadius: '6px',
                          fontSize: '12px',
                          textDecoration: 'none',
                          border: '1px solid var(--border)',
                          fontWeight: '500',
                          textAlign: 'center',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      >
                        Data Repo
                      </a>
                    ) : (
                      <div 
                        aria-hidden="true"
                        style={{
                          padding: '8px 10px',
                          visibility: 'hidden',
                          pointerEvents: 'none',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      >
                        Data Repo
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '48px', border: '1px solid var(--border)', borderRadius: '8px' }}>
            <p style={{ color: 'var(--text)' }}>No matching publications found.</p>
          </div>
        )}
      </div>
    </div>
  );
}