import React, { useState, useContext } from 'react';
import { createInvitation } from '../services/invitationService';
import { AuthContext } from '../context/AuthContext';

const InvitationForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (!email) {
      setError('Email is required.');
      setLoading(false);
      return;
    }

    try {
      const response = await createInvitation(email, token);
      setMessage(\`Invitation sent successfully to ${email}!\`);
      setEmail(''); // Clear the form
    } catch (err) {
      setError(err.message || 'Failed to send invitation.');
      console.error("Invitation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Create New Invitation</h2>
      
      {message && <p className="text-green-600 bg-green-100 border border-green-300 p-3 rounded text-center">{message}</p>}
      {error && <p className="text-red-600 bg-red-100 border border-red-300 p-3 rounded text-center">{error}</p>}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Invitee Email Address:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="invitee@example.com"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        }`}
      >
        {loading ? 'Sending...' : 'Send Invitation'}
      </button>
    </form>
  );
};

export default InvitationForm; 