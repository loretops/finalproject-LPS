import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { withAuth } from '../utils/withAuth';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ChangePasswordPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Las contraseñas nuevas no coinciden');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implementar llamada a API para cambiar contraseña
      // await authService.changePassword(formData);
      
      toast.success('Contraseña actualizada correctamente');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error.message || 'Error al cambiar la contraseña');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Cambiar Contraseña
          </h1>
          
          <Card>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <FaLock className="text-primary-600 mr-2" />
                  <span className="text-sm text-gray-600">
                    Usuario: {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Asegúrate de usar una contraseña segura de al menos 6 caracteres.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Input
                    type={showPasswords.current ? 'text' : 'password'}
                    name="currentPassword"
                    label="Contraseña Actual"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Introduce tu contraseña actual"
                    required
                    icon={<FaLock className="h-5 w-5" />}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    type={showPasswords.new ? 'text' : 'password'}
                    name="newPassword"
                    label="Nueva Contraseña"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Introduce tu nueva contraseña"
                    required
                    icon={<FaLock className="h-5 w-5" />}
                    helperText="Mínimo 6 caracteres"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    name="confirmPassword"
                    label="Confirmar Nueva Contraseña"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirma tu nueva contraseña"
                    required
                    icon={<FaLock className="h-5 w-5" />}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  disabled={isLoading}
                  className="w-full"
                >
                  Actualizar Contraseña
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(ChangePasswordPage); 