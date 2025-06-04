import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Perfil() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la página de perfil (en inglés)
    router.replace('/profile');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-lg text-gray-600">Redirigiendo...</p>
      </div>
    </div>
  );
} 