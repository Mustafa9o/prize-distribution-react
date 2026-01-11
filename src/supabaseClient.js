import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bbronqbxbyfnhzisocbf.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicm9ucWJ4Ynlmbmh6aXNvY2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMDkyNTcsImV4cCI6MjA4MzY4NTI1N30.04xk3gpX3h9FR43fBwpbG5xqDbjAvb3LXe_N1XLjLTc'

export const supabase = createClient(supabaseUrl, supabaseKey)
