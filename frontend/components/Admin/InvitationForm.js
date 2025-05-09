import React, { useState } from 'react';
import { createInvitation } from '../../services/invitationService';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const InvitationForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Reset states
    setIsLoading(true);
    setMessage('');
    setError('');

    // Basic email validation
    if (!email) {
      const msg = 'Por favor, introduce un email.';
      setError(msg);
      setIsLoading(false);
      return;
    }

    // More thorough email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      const msg = 'Por favor, introduce un email válido.';
      setError(msg);
      setIsLoading(false);
      return;
    }

    try {
      const response = await createInvitation(email);
      setMessage(response.message || `Invitación enviada correctamente a ${email}`);
      setEmail(''); // Clear the form on success
    } catch (err) {
      // Get the error message from the error object
      setError(err.message || 'Ha ocurrido un error al enviar la invitación.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Crear Nueva Invitación</h2>
      
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
          label="Email del futuro socio"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@dominio.com"
          disabled={isLoading}
          required
          icon={<EnvelopeIcon className="h-5 w-5" />}
          helperText="Se enviará un correo de invitación a esta dirección"
        />
        
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Enviar Invitación
        </Button>
      </form>
    </Card>
  );
};

export default InvitationForm; 