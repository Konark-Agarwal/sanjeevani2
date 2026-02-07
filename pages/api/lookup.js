export default async function handler(req, res) {
  const { q, method } = req.query
  
  if (!q) {
    return res.status(400).json({ error: 'Search query required' })
  }
  
  // Search in Supabase based on method
  let query = supabase.from('users').select('*')
  
  if (method === 'id') {
    query = query.eq('safe_id', q)
  } else if (method === 'masked_id') {
    query = query.eq('masked_id', q)
  }
  
  const { data, error } = await query.single()
  
  if (error) {
    return res.status(404).json({ error: 'User not found' })
  }
  
  // Get medical history
  const { data: history } = await supabase
    .from('diagnosis')
    .select('*')
    .eq('user_id', data.id)
    .order('timestamp', { ascending: false })
  
  return res.status(200).json({
    ...data,
    medicalHistory: history || []
  })
}