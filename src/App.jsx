import { useState } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    nameArabic: '',
    nameEnglish: '',
    phoneNumber: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [successName, setSuccessName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: supabaseError } = await supabase
        .from('winners')
        .insert([
          {
            name_arabic: formData.nameArabic,
            name_english: formData.nameEnglish,
            phone_number: formData.phoneNumber
          }
        ])

      if (supabaseError) throw supabaseError

      setSuccessName(formData.nameEnglish)
      setShowSuccess(true)
      setFormData({ nameArabic: '', nameEnglish: '', phoneNumber: '' })
    } catch (err) {
      setError(err.message || 'حدث خطأ - An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setShowSuccess(false)
    setSuccessName('')
  }

  return (
    <div className="container">
      <div className="form-container">
        <div className="header">
          <div className="logo-container">
            <img src="/logo.png" alt="Ratio Coffee" className="logo" />
          </div>
          <h1>مبروك - Congratulations!</h1>
          <p className="subtitle">أدخل بياناتك - Enter Your Details</p>
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>الاسم بالعربي - Name in Arabic</label>
            <input
              type="text"
              name="nameArabic"
              dir="rtl"
              required
              placeholder="أدخل اسمك بالعربي"
              value={formData.nameArabic}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>الاسم بالإنجليزي - Name in English</label>
            <input
              type="text"
              name="nameEnglish"
              dir="ltr"
              required
              placeholder="Enter your name in English"
              value={formData.nameEnglish}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>رقم الجوال - Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              dir="ltr"
              required
              placeholder="05xxxxxxxx"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'جاري الإرسال...' : 'إرسال - Submit'}
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="success-modal">
          <div className="success-content">
            <div className="confetti">🎉🎊🎉</div>
            <h2>مبروك!</h2>
            <h2>Congratulations!</h2>
            <p className="winner-name">{successName}</p>
            <p>سيتم التواصل معك لاستلام الجائزة</p>
            <p>We will contact you to receive the prize</p>
            <button className="close-btn" onClick={closeModal}>موافق - OK</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
