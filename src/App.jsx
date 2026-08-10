import { useState } from 'react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'date', 'title', 'author'

  const publications = [
    {
      title: "Patterns of Specialty Tobacco Retail Locations and Visitor Counts in the United States",
      authors: "Austin Landini, Christopher Lowenstein, and Michael F. Pesko",
      status: "Published in Tobacco Control",
      date: "08/03/2026",
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
      date: "07/01/2026",
      abstract: "An evaluation of policy standards and methodological tracking regarding modern tobacco and substance use controls.",
      repoLink: "https://github.com/Social-Impact-Lab-SIL/SIL-Data-Repository",
      pubLink: "https://doi.org/10.1111/add.70531",
      contact: "ltonti@missouri.edu"
    },
    {
      title: "Standardising the measurement of cigar tax rates in the USA, 2010–2024",
      authors: "Guthrie Scoblic, Rachel Y L Fung, Abigail S Friedman, and Michael F. Pesko",
      status: "Published in Tobacco Control",
      date: "07/08/2026",
      abstract: "An empirical examination of cigar tax standardisation frameworks, pricing behavior, and cross-market substitution effects.",
      repoLink: "https://github.com/Social-Impact-Lab-SIL/CigarTaxStandardisation",
      pubLink: "https://doi.org/10.1136/tc-2026-060077",
      contact: "rachelfung@missouri.edu"
    }
  ];

  // Filter publications based on search term and status
  const filteredPubs = publications.filter(pub => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || pub.status.toLowerCase().includes(statusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  // Sort publications based on current sort selection
  const sortedPubs = [...filteredPubs].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date); // Most recent first
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'author') {
      // Extract last name of the first author for sorting
      const getFirstAuthorLastName = (authorStr) => {
        const firstAuthor = authorStr.split(',')[0].trim();
        const parts = firstAuthor.split(' ');
        return parts[parts.length - 1];
      };
      return getFirstAuthorLastName(a.authors).localeCompare(getFirstAuthorLastName(b.authors));
    }
    return 0; // Default array order
  });

  // Fixed slot order: Publication (col 1), GitHub Repo (col 2), Data Repo (col 3).
  const buttonSlots = [
    { key: 'pubLink', label: 'Publication', variant: 'primary' },
    { key: 'repoLink', label: 'GitHub Repo', variant: 'secondary' },
    { key: 'dataRepoLink', label: 'Data Repo', variant: 'secondary' }
  ];

  const buttonBaseStyle = {
    padding: '8px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    textDecoration: 'none',
    fontWeight: '500',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
    display: 'block'
  };

  const primaryStyle = {
    ...buttonBaseStyle,
    background: 'var(--accent)',
    color: '#fff'
  };

  const secondaryStyle = {
    ...buttonBaseStyle,
    background: 'var(--code-bg)',
    color: 'var(--text-h)',
    border: '1px solid var(--border)'
  };

  return (
    <div style={{ padding: '40px 24px', textAlign: 'left', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
        <h1>Research & Manuscript Archive</h1>
        <p style={{ color: 'var(--text)', marginTop: '8px', fontSize: '16px' }}>
          Explore code repositories, data documentation, and interactive dashboards for completed and ongoing research by the Social Impact Lab.
        </p>
      </div>

      {/* Search, Filter, and Sort Controls */}
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
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
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
          <option value="default">Sort by:</option>
          <option value="date">Sort by: Date</option>
          <option value="title">Sort by: Title</option>
          <option value="author">Sort by: First Author</option>
        </select>
      </div>

      {/* Publications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {sortedPubs.length > 0 ? (
          sortedPubs.map((pub, index) => (
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

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
                <p style={{ fontSize: '14px', margin: 0 }}>
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
                {pub.date && (
                  <p style={{ fontSize: '14px', margin: 0, color: 'var(--text)' }}>
                    <strong>Date:</strong> {pub.date}
                  </p>
                )}
              </div>

              <p style={{ fontSize: '15px', marginBottom: '16px', background: 'var(--code-bg)', padding: '12px', borderRadius: '6px' }}>
                {pub.abstract}
              </p>

              {/* Footer: contact on the left, button grid pinned on the right */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                borderTop: '1px solid var(--border)',
                paddingTop: '16px'
              }}>

                {/* Left Side: Contact Information */}
                <span style={{ fontSize: '14px', color: 'var(--text)' }}>
                  Contact: <a href={`mailto:${pub.contact}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>{pub.contact}</a>
                </span>

                {/* Right Side: 3 fixed-width slots */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(110px, 150px))',
                  gap: '10px'
                }}>
                  {buttonSlots.map(slot => {
                    const url = pub[slot.key];
                    if (url) {
                      return (
                        <a
                          key={slot.key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={slot.variant === 'primary' ? primaryStyle : secondaryStyle}
                        >
                          {slot.label}
                        </a>
                      );
                    }
                    return (
                      <div
                        key={slot.key}
                        aria-hidden="true"
                        style={{ ...buttonBaseStyle, visibility: 'hidden', pointerEvents: 'none' }}
                      >
                        {slot.label}
                      </div>
                    );
                  })}
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