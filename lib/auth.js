// lib/auth.js

// Mock function to simulate getting the current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('sanjeevani_user');
  return user ? JSON.parse(user) : null;
};

// Mock function to simulate user login
export const loginUser = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check for demo credentials first
      const demoUsers = {
        'doctor@example.com': { email: 'doctor@example.com', password: 'doctor123', role: 'doctor', name: 'Dr. Demo' },
        'patient@example.com': { email: 'patient@example.com', password: 'patient123', role: 'patient', name: 'Patient Demo' },
      };

      if (demoUsers[email] && demoUsers[email].password === password) {
        const user = demoUsers[email];
        localStorage.setItem('sanjeevani_user', JSON.stringify(user));
        resolve({ success: true, user });
        return;
      }

      // Check for registered users in localStorage
      const storedUser = localStorage.getItem('sanjeevani_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
          resolve({ success: true, user });
          return;
        }
      }

      // If no match, return error
      resolve({ success: false, error: 'Invalid email or password' });
    }, 1000);  // Simulate network delay
  });
};

// Mock function to simulate user logout
export const logoutUser = () => {
  localStorage.removeItem('sanjeevani_user');  // Clear user from localStorage
  // In a real app, also clear tokens or call logout API
};

// Existing registerUser function (unchanged)
export const registerUser = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = { ...userData, id: Date.now() };
      localStorage.setItem('sanjeevani_user', JSON.stringify(user));
      resolve({
        success: true,
        user,
      });
    }, 1000);
  });
};