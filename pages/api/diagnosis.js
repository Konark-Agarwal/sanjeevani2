export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { data, error } = await supabase
      .from('diagnosis')
      .insert([{
        ...req.body,
        timestamp: new Date().toISOString()
      }])
    
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    
    // Get user for notification
    const { data: user } = await supabase
      .from('users')
      .select('emergency_contact')
      .eq('id', req.body.user_id)
      .single()
    
    // Here you would send actual notifications
    // For demo, just log
    console.log('Family notification sent to:', user.emergency_contact)
    
    return res.status(201).json({ data })
  }
  
  res.setHeader('Allow', ['POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}