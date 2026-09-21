import { useState, useEffect } from 'react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'date', 'title', 'author'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#sil-nav-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const publications = [
    // Peer-Reviewed Publications
    {
      title: "Patterns of Specialty Tobacco Retail Locations and Visitor Counts in the United States",
      authors: "Austin Landini, Christopher Lowenstein, and Michael F. Pesko",
      status: "Published in Tobacco Control",
      date: "08/03/2026",
      abstract: "An analysis of specialty tobacco retailer locations, visitor counts and demographic correlates in the United States.",
      repoLink: "https://github.com/Social-Impact-Lab-SIL/SpecialtyTobaccoDatabase",
      dataRepoLink: "https://social-impact-lab-sil.github.io/SIL-Data-Repository/Population-Exposure-Standardized-Tobacco/",
      pubLink: "https://doi.org/10.1136/tc-2026-060085",
      pubMedLink: "https://pubmed.ncbi.nlm.nih.gov/42552112/",
      contact: "clowenstein@missouri.edu"
    },
    {
      title: "Novel product, familiar challenges: Navigating uncertainty in oral nicotine pouch regulation",
      authors: "Lauren Tonti and Michael F. Pesko",
      status: "Published in Addiction",
      date: "07/01/2026",
      abstract: "An evaluation of policy standards and methodological tracking regarding modern tobacco and substance use controls.",
      pubLink: "https://doi.org/10.1111/add.70531",
      pubMedLink: "https://pubmed.ncbi.nlm.nih.gov/", 
      contact: "ltonti@missouri.edu"
    },
    {
      title: "Standardising the measurement of cigar tax rates in the USA, 2010–2024",
      authors: "Guthrie Scoblic, Rachel Y L Fung, Abigail S Friedman, and Michael F. Pesko",
      status: "Published in Tobacco Control",
      date: "07/08/2026",
      abstract: "An empirical examination of cigar tax standardisation frameworks, pricing behavior, and cross-market substitution effects.",
      repoLink: "https://github.com/Social-Impact-Lab-SIL/CigarTaxStandardisation",
      dataRepoLink: "https://social-impact-lab-sil.github.io/SIL-Data-Repository/Population-Exposure-Standardized-Tobacco/",   
      pubLink: "https://doi.org/10.1136/tc-2026-060077",
      pubMedLink: "https://pubmed.ncbi.nlm.nih.gov/42425894/",
      contact: "rachelfung@missouri.edu"
    },
    {
      title: "Longitudinal Growth of Mandated Hearing Aid Benefits in the US",
      authors: "Michelle L. Arnold, Lauren Tonti, Serena Phillips, Stacie P. Kershner, Brandy Lipton, Brianna Heslin, Benjamin Ukert, Austin Landini and Michael F. Pesko",
      status: "Accepted in JAMA-Otolaryngology",
      date: "Forthcoming",
      abstract: "We identify mandated hearing aid coverage under private insurance, Medicaid, and federal direct-service programs and to compare coverage for US youth, adults, and older adults by coverage plan and economic indicators",
      repoLink: "https://github.com/Social-Impact-Lab-SIL/Longitudinal-Hearing-Aid-Benefits", 
      dataRepoLink: "https://social-impact-lab-sil.github.io/SIL-Data-Repository/Hearing-Healthcare-Policy/", 
      contact: "ltonti@missouri.edu"
    },
    // Working Papers
    {
      title: "Cigarette Taxes and the Household Budget",
      authors: "Michael E. Darden, Reginald B. Hebert, Michael F. Pesko, and Samuel Sturm",
      status: "Working",
      abstract: "An empirical evaluation of how cigarette taxes impact household budgets across varying demographic groups.",
      pubLink: "https://www.nber.org/papers/w33746",
      contact: "michaeldarden@jhu.edu"
    },
    {
      title: "Pharmaceutical Drug Regulation and Mortality: Evidence from E-cigarettes",
      authors: "Michael Pesko and Christian Saenz",
      status: "Working",
      abstract: "An examination of how pharmaceutical drug regulations and e-cigarette availability influence mortality rates.",
      pubLink: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5108105",
      contact: "christian.saenz@yale.edu"
    },
    {
      title: "Automation and Diverging Health Risks",
      authors: "Ricardo B. Ang III, Giseong Kim, Soojin Kim, and Michael F. Pesko",
      status: "Working",
      abstract: "Analyzing how technological automation trends contribute to diverging health risks and behavioral outcomes.",
      pubLink: "https://ideas.repec.org/p/umc/wpaper/2508.html",
      contact: "rang@tulane.edu"
    },
    {
      title: "Early Cigarette Prohibition During War and Peace",
      authors: "Rachel Y. L. Fung, Lauren Hoehn-Velasco, and Michael F. Pesko",
      status: "Working",
      abstract: "Historical analysis of cigarette prohibitions implemented during wartime versus peacetime periods.",
      pubLink: "https://ideas.repec.org/p/umc/wpaper/2513.html",
      contact: "rachelfung@missouri.edu"
    },
    {
      title: "Restricting Sales of Flavored Nicotine Vaping Products: Effects on Cigarette and Nicotine Vaping Product Sales in Canada",
      authors: "Brad Davis, Abigail Friedman, and Michael F. Pesko",
      status: "Working",
      abstract: "Evaluating market responses and substitution patterns following provincial flavored nicotine vaping restrictions in Canada.",
      pubLink: "https://papers.ssrn.com",
      contact: "badhhh@missouri.edu"
    },
    {
      title: "Estimating the Effect of E-Cigarette Nicotine Limits on Cigarette and E-Cigarette Sales in Canada",
      authors: "Brad Davis, Abigail Friedman, and Michael F. Pesko",
      status: "Working",
      abstract: "Assessing the causal impact of federal e-cigarette nicotine concentration limits on tobacco product sales across Canada.",
      pubLink: "https://papers.ssrn.com",
      contact: "badhhh@missouri.edu"
    },
    {
      title: "The Effect of Paid Sick Leave on Healthcare Expenditures",
      authors: "Reginald Hebert, Kevin Callison, Michael Pesko, and Samuel Sturm",
      status: "Working",
      abstract: "Investigating how mandated or offered paid sick leave impacts overall healthcare utilization and expenditures.",
      pubLink: "https://papers.ssrn.com",
      contact: "reginald.hebert@yale.edu"
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

  const buttonSlots = [
    { 
      key: 'pubLinksStack', 
      isStack: true,
      slots: [
        { key: 'pubLink', label: 'DOI / Repo Link', variant: 'primary' },
        { key: 'pubMedLink', label: 'PubMed', variant: 'primary' }
      ]
    },
    { key: 'repoLink', label: 'GitHub Repo', variant: 'secondary', checkKey: 'repoLink' },
    { key: 'dataRepoLink', label: 'Data Repo', variant: 'secondary', checkKey: 'dataRepoLink' }
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
      
      {/* Click-to-Toggle Dropdown Navigation Menu */}
      <div id="sil-nav-container" style={{ marginBottom: '24px', position: 'relative', display: 'inline-block' }}>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{
            backgroundColor: 'var(--accent-bg, #f1f8ff)',
            color: 'var(--accent, #0366d6)',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '600',
            border: '1px solid var(--border, #c8e1ff)',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          📁 SIL Navigation {isDropdownOpen ? '▴' : '▾'}
        </button>
        {isDropdownOpen && (
          <div style={{
            position: 'absolute',
            left: 0,
            top: '100%',
            backgroundColor: 'var(--bg, #ffffff)',
            minWidth: '260px',
            boxShadow: '0 8px 24px rgba(149, 157, 165, 0.2)',
            border: '1px solid var(--border, #e1e4e8)',
            borderRadius: '6px',
            zIndex: 1000,
            marginTop: '4px',
            overflow: 'hidden',
            textAlign: 'left'
          }}>
            <a 
              href="https://github.com/Social-Impact-Lab-SIL" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setIsDropdownOpen(false)}
              style={{
                color: 'var(--text-h, #24292e)',
                padding: '10px 16px',
                textDecoration: 'none',
                display: 'block',
                fontSize: '14px',
                borderBottom: '1px solid var(--border, #eaecef)'
              }}
            >
              🏢 Social Impact Lab GitHub Org
            </a>
            <a 
              href="https://social-impact-lab-sil.github.io/SIL-Data-Repository/" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setIsDropdownOpen(false)}
              style={{
                color: 'var(--text-h, #24292e)',
                padding: '10px 16px',
                textDecoration: 'none',
                display: 'block',
                fontSize: '14px'
              }}
            >
              🏠 Data Repository Main Page
            </a>
          </div>
        )}
      </div>

      {/* Header */}
      <div style={{ marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
        <h1>Research & Manuscript Archive</h1>
        <p style={{ color: 'var(--text)', marginTop: '8px', fontSize: '16px' }}>
          Explore code repositories, data documentation, working papers, and interactive dashboards for completed and ongoing research by the Social Impact Lab.
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
          <option value="Published">Published</option>
          <option value="Working">Working</option>
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
                {pub.date && pub.status !== 'Working' && (
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

                {/* Right Side: 3 fixed-width slots grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(110px, 150px))',
                  gap: '10px',
                  alignItems: 'start'
                }}>
                  {buttonSlots.map((slot, sIdx) => {
                    if (slot.isStack) {
                      return (
                        <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {slot.slots.map(subSlot => {
                            const url = pub[subSlot.key];
                            if (url) {
                              return (
                                <a
                                  key={subSlot.key}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={subSlot.variant === 'primary' ? primaryStyle : secondaryStyle}
                                >
                                  {subSlot.label}
                                </a>
                              );
                            }
                            return (
                              <div
                                key={subSlot.key}
                                aria-hidden="true"
                                style={{ ...buttonBaseStyle, visibility: 'hidden', pointerEvents: 'none' }}
                              >
                                {subSlot.label}
                              </div>
                            );
                          })}
                        </div>
                      );
                    } else {
                      const targetKey = slot.checkKey || slot.key;
                      const url = pub[targetKey];
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
                    }
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