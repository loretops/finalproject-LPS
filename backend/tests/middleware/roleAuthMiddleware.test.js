const roleAuthMiddleware = require('../../middleware/roleAuthMiddleware');

describe('Role Authentication Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    // Mock de los objetos request, response y next para cada test
    req = {
      user: {
        id: 'user-id-123',
        email: 'test@example.com',
        role: 'partner' // Rol por defecto para las pruebas
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  test('permite el acceso cuando el usuario tiene el rol requerido exacto', () => {
    // Configurar middleware para un rol específico
    const middleware = roleAuthMiddleware('partner');
    
    // Ejecutar middleware
    middleware(req, res, next);
    
    // Verificar que next() fue llamado (acceso permitido)
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('permite el acceso cuando el usuario tiene uno de los roles requeridos', () => {
    // Configurar middleware para múltiples roles
    const middleware = roleAuthMiddleware(['visitor', 'partner', 'manager']);
    
    // Ejecutar middleware
    middleware(req, res, next);
    
    // Verificar que next() fue llamado (acceso permitido)
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('deniega el acceso cuando el usuario no tiene el rol requerido', () => {
    // Configurar middleware para un rol que el usuario no tiene
    const middleware = roleAuthMiddleware('manager');
    
    // Ejecutar middleware
    middleware(req, res, next);
    
    // Verificar que se devuelve error 403 y next() no fue llamado
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.stringContaining('Forbidden')
    }));
  });

  test('deniega el acceso cuando el usuario no tiene información de rol', () => {
    // Eliminar la información de rol del usuario
    delete req.user.role;
    
    const middleware = roleAuthMiddleware('partner');
    middleware(req, res, next);
    
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
  });

  test('lanza error si no se proporcionan roles', () => {
    expect(() => {
      roleAuthMiddleware([]);
    }).toThrow('roleAuthMiddleware requires at least one role');
  });
}); 