import React, { useState, useContext } from 'react';
import { createInvitation } from '../services/invitationService';
import { AuthContext } from '../context/AuthContext';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

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
      setMessage(`Invitation sent successfully to ${email}!`);
      setEmail(''); // Clear the form
    } catch (err) {
      setError(err.message || 'Failed to send invitation.');
      console.error("Invitation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create New Invitation</h2>
      
      {message && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
          {message}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          id="email"
          name="email"
          label="Invitee Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="invitee@example.com"
          icon={<EnvelopeIcon className="h-5 w-5" />}
          helperText="An invitation will be sent to this email address"
        />

        <Button
        type="submit"
          variant="primary"
          isLoading={loading}
        disabled={loading}
      >
          Send Invitation
        </Button>
    </form>
    </Card>
  );
};

export default InvitationForm; 