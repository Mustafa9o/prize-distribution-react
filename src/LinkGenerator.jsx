import { useState } from 'react'
import { supabase } from './supabaseClient'
import './LinkGenerator.css'

function LinkGenerator() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const users = [
    { emp_id: '754', name_arabic: '', name_english: 'Abdulaziz Almulhim', email: 'abdulaziz.almulhim@ratio.sa' },
    { emp_id: '666', name_arabic: '', name_english: 'Abdulaziz Alqaroni', email: 'abdulaziz.alqaroni@ratio.sa' },
    { emp_id: '0', name_arabic: '', name_english: 'Abdulaziz Buqais', email: 'abdulaziz.buqais@ratio.sa' },
    { emp_id: '1000328', name_arabic: '', name_english: 'Abdulelah Alissa', email: 'abdulelah.alissa@ratio.sa' },
    { emp_id: '728', name_arabic: '', name_english: 'Abdullah Aliwa', email: 'abdullah.aliwa@ratio.sa' },
    { emp_id: '1000003', name_arabic: '', name_english: 'Abdullah Hisham', email: 'abdullah.hesham@ratio.sa' },
    { emp_id: '1000300', name_arabic: '', name_english: 'Abdulrhman Alahmed', email: 'abdulrhman.alahmed@ratio.sa' },
    { emp_id: '746', name_arabic: '', name_english: 'Fatima alsalih', email: 'accountant@ratio.sa' },
    { emp_id: '657', name_arabic: '', name_english: 'Njoud Alhussain', email: 'accountant2@ratio.sa' },
    { emp_id: '1000009', name_arabic: '', name_english: 'Mohammed Nabil', email: 'accounting@ratio.sa' },
    { emp_id: '781', name_arabic: '', name_english: 'Abdulaziz Amir', email: 'advisor@ratio.sa' },
    { emp_id: '502', name_arabic: '', name_english: 'Ahaad Alnajim', email: 'ahaad.alnajim@ratio.sa' },
    { emp_id: '622', name_arabic: '', name_english: 'Ahmed Almari', email: 'ahmed.almari@ratio.sa' },
    { emp_id: '622', name_arabic: '', name_english: 'Ahmed Almurai', email: 'ahmed.almurai@ratio.sa' },
    { emp_id: '99731', name_arabic: '', name_english: 'Ahmed Alturky', email: 'ahmed.alturky@ratio.sa' },
    { emp_id: '685', name_arabic: '', name_english: 'Ahmed Sami', email: 'ahmed.sami@ratio.sa' },
    { emp_id: '486', name_arabic: '', name_english: 'Ahmed Tarek', email: 'ahmed.tarek@ratio.sa' },
    { emp_id: '613', name_arabic: '', name_english: 'Aisha Alturki', email: 'aisha.alturki@ratio.sa' },
    { emp_id: '601', name_arabic: '', name_english: 'ahmed belhassan', email: 'alfateh@ratio.sa' },
    { emp_id: '555', name_arabic: '', name_english: 'Alhassan Ali', email: 'alhassan.ali@ratio.sa' },
    { emp_id: '753', name_arabic: '', name_english: 'Ali Albajhan', email: 'ali.albajhan@ratio.sa' },
    { emp_id: '442', name_arabic: '', name_english: 'Ali Muneizil', email: 'ali.muneizil@ratio.sa' },
    { emp_id: '605', name_arabic: '', name_english: 'Aljazi Alkhaldi', email: 'aljazi.alkhaldi@ratio.sa' },
    { emp_id: '494', name_arabic: '', name_english: 'saad aljasim', email: 'alkoot@ratio.sa' },
    { emp_id: '489', name_arabic: '', name_english: 'Ahmed aldouk', email: 'alnasim@ratio.sa' },
    { emp_id: '534', name_arabic: '', name_english: 'Amr Abdelfattah', email: 'amr.abdelfattah@ratio.sa' },
    { emp_id: '582', name_arabic: '', name_english: 'Anas Alfayez', email: 'anas.alfayez@ratio.sa' },
    { emp_id: '91570', name_arabic: '', name_english: 'Ashraf Abukharmh', email: 'ashraf.abukharmh@ratio.sa' },
    { emp_id: '1000359', name_arabic: '', name_english: 'abdulmalik alsawiq', email: 'assistant@ratio.sa' },
    { emp_id: '724', name_arabic: '', name_english: 'Bandar Albalam', email: 'bandar.albalam@ratio.sa' },
    { emp_id: '600', name_arabic: '', name_english: 'kamal makeen.bisha', email: 'bisha@ratio.sa' },
    { emp_id: '600', name_arabic: '', name_english: 'kamal makeen.bisha2', email: 'bsh.02@ratio.sa' },
    { emp_id: '600', name_arabic: '', name_english: 'kamal makeen.bisha3', email: 'bsh.03@ratio.sa' },
    { emp_id: '1000278', name_arabic: '', name_english: 'mohammed Almulhim.cco', email: 'cco@ratio.sa' },
    { emp_id: '1000323', name_arabic: '', name_english: 'Ceo', email: 'ceo@ratio.sa' },
    { emp_id: '', name_arabic: '', name_english: 'Ceo Team', email: 'ceo.team@ratio.sa' },
    { emp_id: '2342', name_arabic: '', name_english: 'ahmed Althani', email: 'cfo@ratio.sa' },
    { emp_id: '548', name_arabic: '', name_english: 'saud alsaead', email: 'costcontrol@ratio.sa' },
    { emp_id: '1000335', name_arabic: '', name_english: 'faima meshal', email: 'cs@ratio.sa' },
    { emp_id: '1000024', name_arabic: '', name_english: 'nora althani', email: 'customer.o@ratio.sa' },
    { emp_id: '1000328', name_arabic: '', name_english: 'abdulelah aleisa', email: 'e.area.manager@ratio.sa' },
    { emp_id: '755', name_arabic: '', name_english: 'hiba alsaiq', email: 'es1@ratio.sa' },
    { emp_id: '1000333', name_arabic: '', name_english: 'felwaha almulhim', email: 'f.licenses@ratio.sa' },
    { emp_id: '1000003', name_arabic: '', name_english: 'abdullah hesham', email: 'f.planing2@ratio.sa' },
    { emp_id: '770', name_arabic: '', name_english: 'Fadi Abdelkarim', email: 'fadi.abdelkarim@ratio.sa' },
    { emp_id: '599', name_arabic: '', name_english: 'Fahad Alhussain', email: 'fahad.alhussain@ratio.sa' },
    { emp_id: '492', name_arabic: '', name_english: 'Fatimah Alsoleih', email: 'fatimah.alsoleih@ratio.sa' },
    { emp_id: '1000357', name_arabic: '', name_english: 'Bayan Almulhim', email: 'food.quality@ratio.sa' },
    { emp_id: '1000339', name_arabic: '', name_english: 'hamaza derwish franchies', email: 'franchise@ratio.sa' },
    { emp_id: '1000326', name_arabic: '', name_english: 'reem ahmed', email: 'ga@ratio.sa' },
    { emp_id: '1000258', name_arabic: '', name_english: 'ahmed said', email: 'gm.roaster@ratio.sa' },
    { emp_id: '1000302', name_arabic: '', name_english: 'Gowhar Nabi', email: 'gowhar.nabi@ratio.sa' },
    { emp_id: '1000022', name_arabic: '', name_english: 'ahmed khalifa', email: 'gr@ratio.sa' },
    { emp_id: '563', name_arabic: '', name_english: 'Haifa Bogami', email: 'haifa.bogami@ratio.sa' },
    { emp_id: '479', name_arabic: '', name_english: 'freas alharbi', email: 'hail-1@ratio.sa' },
    { emp_id: '821', name_arabic: '', name_english: 'Hamad Alarfaj', email: 'hamad.alarfaj@ratio.sa' },
    { emp_id: '1000339', name_arabic: '', name_english: 'Hamza Darweesh', email: 'hamza.darweesh@ratio.sa' },
    { emp_id: '1000336', name_arabic: '', name_english: 'Hanady Alzemami', email: 'hanady.alzemami@ratio.sa' },
    { emp_id: '546', name_arabic: '', name_english: 'Hassan Almulhim', email: 'hassan.almulhim@ratio.sa' },
    { emp_id: '503', name_arabic: '', name_english: 'hassan haggy', email: 'hofuf@ratio.sa' },
    { emp_id: '1000375', name_arabic: '', name_english: 'reham alturki', email: 'hr@ratio.sa' },
    { emp_id: '491', name_arabic: '', name_english: 'ghada alsharani', email: 'hrspecialist@ratio.sa' },
    { emp_id: '503', name_arabic: '', name_english: 'Hsssan Alahmed', email: 'hsssan.alahmed@ratio.sa' },
    { emp_id: '15678', name_arabic: '', name_english: 'Ibrahim Almulhim', email: 'ibrahim.almulhim@ratio.sa' },
    { emp_id: '547', name_arabic: '', name_english: 'Ibrahim Almulhim Hr', email: 'ibrahim.almulhim@ratio.sa' },
    { emp_id: '683', name_arabic: '', name_english: 'Ibrahim Althani', email: 'ibrahim.althani@ratio.sa' },
    { emp_id: '730', name_arabic: '', name_english: 'Ibrahim Alzahrani', email: 'ibrahim.alzahrani@ratio.sa' },
    { emp_id: '487', name_arabic: '', name_english: 'Ibrahim Alzarah', email: 'ibrahim.alzarah@ratio.sa' },
    { emp_id: '524', name_arabic: '', name_english: 'Javesalam Ahmad', email: 'javesalam.ahmad@ratio.sa' },
    { emp_id: '758', name_arabic: '', name_english: 'Mohamed Elkhouly   Jdh 03', email: 'jdh.03@ratio.sa' },
    { emp_id: '758', name_arabic: '', name_english: 'Mohamed Elkhouly   Jdh 04', email: 'jdh.04@ratio.sa' },
    { emp_id: '758', name_arabic: '', name_english: 'Mohamed Elkhouly   Jdh 05', email: 'jdh.05@ratio.sa' },
    { emp_id: '586', name_arabic: '', name_english: 'Marwan Elmasri  Jub 02', email: 'jub.02@ratio.sa' },
    { emp_id: '600', name_arabic: '', name_english: 'Kamal Makeen', email: 'kamal.makeen@ratio.sa' },
    { emp_id: '500', name_arabic: '', name_english: 'nora aldosr kfu', email: 'kfu@ratio.sa' },
    { emp_id: '771', name_arabic: '', name_english: 'Khaled Alboushami', email: 'khaled.alboushami@ratio.sa' },
    { emp_id: '586', name_arabic: '', name_english: 'Marwan Elmasri  Khb 09', email: 'khb.09@ratio.sa' },
    { emp_id: '586', name_arabic: '', name_english: 'Marwan Elmasri  Khb 10', email: 'khb.10@ratio.sa' },
    { emp_id: '607', name_arabic: '', name_english: 'Latifa Alhalibi', email: 'latifa.alhalibi@ratio.sa' },
    { emp_id: '682', name_arabic: '', name_english: 'Latifah Alsulami', email: 'latifah.alsulami@ratio.sa' },
    { emp_id: '1000336', name_arabic: '', name_english: 'hanady alzemamy.legal', email: 'legal@ratio.sa' },
    { emp_id: '1000377', name_arabic: '', name_english: 'muneria alsimal', email: 'legal.specialist@ratio.sa' },
    { emp_id: '1000376', name_arabic: '', name_english: 'hesham hegazy', email: 'm.costcontrol@ratio.sa' },
    { emp_id: '559', name_arabic: '', name_english: 'Mahmoud Mokhtar', email: 'mahmoud.mokhtar@ratio.sa' },
    { emp_id: '667', name_arabic: '', name_english: 'Mariam Almulhim', email: 'mariam.almulhim@ratio.sa' },
    { emp_id: '586', name_arabic: '', name_english: 'Marwan Elmasri', email: 'marwan.elmasri@ratio.sa' },
    { emp_id: '1000337', name_arabic: '', name_english: 'Mashael Almulhim', email: 'mashael.almulhim@ratio.sa' },
    { emp_id: '637', name_arabic: '', name_english: 'Mohamed Abdo', email: 'mohamed.abdo@ratio.sa' },
    { emp_id: '758', name_arabic: '', name_english: 'Mohamed Elkhouly', email: 'mohamed.elkhouly@ratio.sa' },
    { emp_id: '780', name_arabic: '', name_english: 'Mohamed Ibrahim', email: 'mohamed.ibrahim@ratio.sa' },
    { emp_id: '541', name_arabic: '', name_english: 'Mohamed Mostafa Egypt', email: 'mohamed.mostafa@egypt.ratio.sa' },
    { emp_id: '541', name_arabic: '', name_english: 'Mohamed Mostafa', email: 'mohamed.mostafa@ratio.sa' },
    { emp_id: '1000009', name_arabic: '', name_english: 'Mohamed Nabil', email: 'mohamed.nabil@ratio.sa' },
    { emp_id: '686', name_arabic: '', name_english: 'Mohammed Alhubail', email: 'mohammed.alhubail@ratio.sa' },
    { emp_id: '1000278', name_arabic: '', name_english: 'Mohammed Almulhim', email: 'mohammed.almulhim@ratio.sa' },
    { emp_id: '747', name_arabic: '', name_english: 'Mohammed Ghazi', email: 'mohammed.ghazi@ratio.sa' },
    { emp_id: '772', name_arabic: '', name_english: 'Mohammed Taher', email: 'mohammed.taher@ratio.sa' },
    { emp_id: '663', name_arabic: '', name_english: 'Mohammed Yousif', email: 'mohammed.yousif@ratio.sa' },
    { emp_id: '565', name_arabic: '', name_english: 'Mokhtar Azam', email: 'mokhtar.azam@ratio.sa' },
    { emp_id: '687', name_arabic: '', name_english: 'Munirah Aldhimn', email: 'munirah.aldhimn@ratio.sa' },
    { emp_id: '691', name_arabic: '', name_english: 'Najd Alsurayyi', email: 'najd.alsurayyi@ratio.sa' },
    { emp_id: '656', name_arabic: '', name_english: 'Najla Almulhim', email: 'najla.almulhim@ratio.sa' },
    { emp_id: '594', name_arabic: '', name_english: 'Nasser Aldawsari', email: 'nasser.aldawsari@ratio.sa' },
    { emp_id: '444', name_arabic: '', name_english: 'Nawaf Almulhim', email: 'nawaf.almulhim@ratio.sa' },
    { emp_id: '657', name_arabic: '', name_english: 'Njoud Alhussin', email: 'njoud.alhussin@ratio.sa' },
    { emp_id: '818', name_arabic: '', name_english: 'Noura Alanzi', email: 'noura.alanzi@ratio.sa' },
    { emp_id: '1000026', name_arabic: '', name_english: 'shaikh fahad', email: 'oa@ratio.sa' },
    { emp_id: '1000303', name_arabic: '', name_english: 'Ola Sayed', email: 'ola.sayed@ratio.sa' },
    { emp_id: '782', name_arabic: '', name_english: 'Omar Alkassar', email: 'omar.alkassar@ratio.sa' },
    { emp_id: '502', name_arabic: '', name_english: 'Omar Alnajim', email: 'omar.alnajim@ratio.sa' },
    { emp_id: '1000339', name_arabic: '', name_english: 'hamaza derwish ops', email: 'operations@ratio.sa' },
    { emp_id: '1000305', name_arabic: '', name_english: 'elaf ops', email: 'ops.dataentry@ratio.sa' },
    { emp_id: '74126', name_arabic: '', name_english: 'Osama Soliman', email: 'osama.soliman@ratio.sa' },
    { emp_id: '566', name_arabic: '', name_english: 'reem alsybai', email: 'p.relations@ratio.sa' },
    { emp_id: '1000303', name_arabic: '', name_english: 'alaa alnajy', email: 'pa@ratio.sa' },
    { emp_id: '80153', name_arabic: '', name_english: 'Patrick Celarc', email: 'patrick.celarc@ratio.sa' },
    { emp_id: '565', name_arabic: '', name_english: 'mokhtar azzam', email: 'purchase@ratio.sa' },
    { emp_id: '1000364', name_arabic: '', name_english: 'rakan albahar', email: 'q.control@ratio.sa' },
    { emp_id: '1000254', name_arabic: '', name_english: 'abduleaalh alnowa', email: 'q.controller@ratio.sa' },
    { emp_id: '586', name_arabic: '', name_english: 'Marwan Elmasri.qtf.02', email: 'qtf.02@ratio.sa' },
    { emp_id: '81301', name_arabic: '', name_english: 'saad qa', email: 'quality@ratio.sa' },
    { emp_id: '622', name_arabic: '', name_english: 'Ahmed Almari jof', email: 'r.jof.01@ratio.sa' },
    { emp_id: '730', name_arabic: '', name_english: 'Ibrahim Alzahrani.r.kbh.03', email: 'r.kbh.03@ratio.sa' },
    { emp_id: '730', name_arabic: '', name_english: 'Ibrahim Alzahrani r.kbh.04', email: 'r.kbh.04@ratio.sa' },
    { emp_id: '771', name_arabic: '', name_english: 'Khaled Alboushamir.kbh.05', email: 'r.kbh.05@ratio.sa' },
    { emp_id: '771', name_arabic: '', name_english: 'Khaled Alboushami.rkbr.02', email: 'r.kbr.02@ratio.sa' },
    { emp_id: '586', name_arabic: '', name_english: 'Marwan Elmasri r.qtf.01', email: 'r.qtf.01@ratio.sa' },
    { emp_id: '685', name_arabic: '', name_english: 'ahmed sami riy.04', email: 'r.riy.04@ratio.sa' },
    { emp_id: '685', name_arabic: '', name_english: 'ahmed sami riy.10', email: 'r.riy.10@ratio.sa' },
    { emp_id: '537', name_arabic: '', name_english: 'Rasaraj Saha', email: 'rasaraj.saha@ratio.sa' },
    { emp_id: '823', name_arabic: '', name_english: 'Rawan Alzumayni', email: 'rawan.alzumayni@ratio.sa' },
    { emp_id: '566', name_arabic: '', name_english: 'Reem Alsubaie', email: 'reem.alsubaie@ratio.sa' },
    { emp_id: '685', name_arabic: '', name_english: 'ahmed sami riy.17', email: 'riy.17@ratio.sa' },
    { emp_id: '1000270', name_arabic: '', name_english: 'Mohamed Islam', email: 'rs@ratio.sa' },
    { emp_id: '1000338', name_arabic: '', name_english: 'Alaa Alsweed', email: 'sa@ratio.sa' },
    { emp_id: '535', name_arabic: '', name_english: 'Samar Mohamed Egypt', email: 'samar.mohamed@egypt.ratio.sa' },
    { emp_id: '535', name_arabic: '', name_english: 'Samar Mohamed', email: 'samar.mohamed@ratio.sa' },
    { emp_id: '1000297', name_arabic: '', name_english: 'Sameer Mohammed', email: 'sameer.mohammed@ratio.sa' },
    { emp_id: '730', name_arabic: '', name_english: 'Ibrahim Alzahrani .sca', email: 'sca@ratio.sa' },
    { emp_id: '1000331', name_arabic: '', name_english: 'mohammed aljasar', email: 'scm@ratio.sa' },
    { emp_id: '580', name_arabic: '', name_english: 'Sitah Alqahtani', email: 'sitah.alqahtani@ratio.sa' },
    { emp_id: '1000304', name_arabic: '', name_english: 'mohammed mosfar', email: 'vc@ratio.sa' },
    { emp_id: '542', name_arabic: '', name_english: 'Yasmien Ahmed Egypt', email: 'yasmien.ahmed@egypt.ratio.sa' },
    { emp_id: '542', name_arabic: '', name_english: 'Yasmien Ahmed', email: 'yasmien.ahmed@ratio.sa' }
  ]

  const generateUniqueCode = () => {
    return Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      // Delete old entries
      await supabase.from('unique_links').delete().neq('id', 0)

      // Generate and insert new links
      const linksToInsert = users.map(user => ({
        unique_code: generateUniqueCode(),
        emp_id: user.emp_id,
        name_arabic: user.name_arabic,
        name_english: user.name_english,
        email: user.email,
        clicks: 0
      }))

      const { data, error: insertError } = await supabase
        .from('unique_links')
        .insert(linksToInsert)

      if (insertError) throw insertError

      setResult({
        total: users.length,
        inserted: linksToInsert.length
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="link-generator-container">
      <h1>🔗 Generate Unique Links</h1>
      
      <div className="info-box">
        <p>📊 Total users in list: <strong>{users.length}</strong></p>
        <p>This will generate unique tracking links for all users</p>
      </div>

      <button 
        className="generate-btn" 
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? '⏳ Generating...' : '✨ Generate Links'}
      </button>

      {error && (
        <div className="error-box">
          ❌ Error: {error}
        </div>
      )}

      {result && (
        <div className="success-box">
          <h2>✅ Links Generated Successfully!</h2>
          <p>Total users: {result.total}</p>
          <p>Links generated: {result.inserted}</p>
          <div className="action-buttons">
            <a href="/view-links" className="btn-view">View All Links</a>
            <a href="/" className="btn-home">Go to Main Page</a>
          </div>
        </div>
      )}
    </div>
  )
}

export default LinkGenerator
