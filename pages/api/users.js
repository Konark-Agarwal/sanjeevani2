export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Save user to Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([req.body])
    
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    
    return res.status(201).json({ data })
  }
  
  res.setHeader('Allow', ['POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}