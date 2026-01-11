import { useEffect } from 'react'
import { supabase } from './supabaseClient'

export const useVisitorTracking = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get visitor information
        const visitorData = {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language,
          screen_size: `${screen.width} x ${screen.height}`,
          browser: getBrowser(),
          os: getOS(),
          device_type: getDeviceType(),
          referrer: document.referrer || 'Direct'
        }

        // Log visit to Supabase
        await supabase.from('page_visits').insert([visitorData])
      } catch (error) {
        console.error('Tracking error:', error)
      }
    }

    trackVisitor()
  }, [])
}

function getBrowser() {
  const ua = navigator.userAgent
  if (ua.indexOf('Edg') !== -1) return 'Microsoft Edge'
  if (ua.indexOf('Chrome') !== -1) return 'Chrome'
  if (ua.indexOf('Firefox') !== -1) return 'Firefox'
  if (ua.indexOf('Safari') !== -1) return 'Safari'
  return 'Unknown'
}

function getOS() {
  const ua = navigator.userAgent
  if (ua.indexOf('Win') !== -1) return 'Windows'
  if (ua.indexOf('Mac') !== -1) return 'MacOS'
  if (ua.indexOf('Linux') !== -1) return 'Linux'
  if (ua.indexOf('Android') !== -1) return 'Android'
  if (ua.indexOf('iOS') !== -1) return 'iOS'
  return 'Unknown'
}

function getDeviceType() {
  const ua = navigator.userAgent
  if (/mobile/i.test(ua)) return 'Mobile'
  if (/tablet|ipad/i.test(ua)) return 'Tablet'
  return 'Desktop'
}
