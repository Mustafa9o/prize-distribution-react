import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import './ViewLinks.css'

function ViewLinks() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const baseUrl = window.location.origin

  useEffect(() => {
    loadLinks()
  }, [])

  const loadLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('unique_links')
        .select('*')
        .order('name_english', { ascending: true })

      if (error) throw error
      setLinks(data || [])
    } catch (error) {
      console.error('Error loading links:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied!')
    })
  }

  const filteredLinks = links.filter(link =>
    link.name_english.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.emp_id.includes(searchTerm)
  )

  if (loading) return <div className="loading">Loading links...</div>

  return (
    <div className="view-links-container">
      <h1>📋 All Unique Links</h1>

      <div className="stats-bar">
        <div className="stat">
          <span className="stat-label">Total Links:</span>
          <span className="stat-value">{links.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Total Clicks:</span>
          <span className="stat-value">{links.reduce((sum, l) => sum + (l.clicks || 0), 0)}</span>
        </div>
      </div>

      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search by name, email, or employee ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="links-table">
        <table>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Unique Code</th>
              <th>Link</th>
              <th>Clicks</th>
              <th>Last Click</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLinks.map((link) => {
              const fullLink = `${baseUrl}/?code=${link.unique_code}`
              return (
                <tr key={link.id}>
                  <td>{link.emp_id}</td>
                  <td>{link.name_english}</td>
                  <td>{link.email}</td>
                  <td className="code-cell">{link.unique_code}</td>
                  <td className="link-cell" title={fullLink}>
                    {fullLink.substring(0, 40)}...
                  </td>
                  <td className="clicks-cell">{link.clicks || 0}</td>
                  <td>{link.last_click ? new Date(link.last_click).toLocaleDateString() : '-'}</td>
                  <td>
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(fullLink)}
                    >
                      📋 Copy
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {filteredLinks.length === 0 && (
        <div className="no-results">
          No links found matching your search.
        </div>
      )}
    </div>
  )
}

export default ViewLinks
