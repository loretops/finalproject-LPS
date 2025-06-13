# API de Dashboard

Este documento describe los endpoints disponibles para obtener estadísticas y métricas del dashboard en la plataforma COOPCO.

## Base URL

```
/api
```

## Endpoints

### Obtener estadísticas generales

Devuelve estadísticas generales del dashboard para el usuario autenticado.

```
GET /dashboard/stats
```

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (200 OK)

```json
{
  "totalProjects": 15,
  "publishedProjects": 12,
  "totalInvestments": 45,
  "totalInvestedAmount": 2500000,
  "totalUsers": 128,
  "recentActivity": [
    {
      "type": "new_investment",
      "message": "Nueva inversión de €50,000 en Proyecto Residencial Las Palmas",
      "timestamp": "2025-05-15T10:30:00.000Z",
      "userId": "550e8400-e29b-41d4-a716-446655440001",
      "projectId": "550e8400-e29b-41d4-a716-446655440002"
    },
    {
      "type": "project_published",
      "message": "Proyecto Comercial Centro publicado",
      "timestamp": "2025-05-14T16:45:00.000Z",
      "projectId": "550e8400-e29b-41d4-a716-446655440003"
    }
  ]
}
```

#### Respuestas de error

**401 Unauthorized**

```json
{
  "message": "No autorizado"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al obtener estadísticas del dashboard",
  "error": "Detalles del error"
}
```

---

### Obtener estadísticas para gestores

Devuelve estadísticas específicas para usuarios con rol de gestor.

```
GET /dashboard/manager-stats
```

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (200 OK)

```json
{
  "myProjects": {
    "total": 8,
    "draft": 2,
    "published": 5,
    "closed": 1
  },
  "myProjectsInvestments": {
    "totalAmount": 1250000,
    "totalInvestors": 32,
    "averageInvestment": 39062.5
  },
  "pendingInvestments": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "amount": 75000,
      "projectTitle": "Residencial Las Palmas",
      "investorName": "Ana García",
      "investedAt": "2025-05-15T09:20:00.000Z"
    }
  ],
  "recentInterests": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440020",
      "projectTitle": "Comercial Centro",
      "userName": "Carlos López",
      "createdAt": "2025-05-15T11:15:00.000Z",
      "status": "pending"
    }
  ],
  "monthlyStats": {
    "newInvestments": 12,
    "newInterests": 8,
    "totalInvestedThisMonth": 450000
  }
}
```

#### Respuestas de error

**401 Unauthorized**

```json
{
  "message": "No autorizado"
}
```

**403 Forbidden**

```json
{
  "message": "No tienes permiso para acceder a estadísticas de gestor"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al obtener estadísticas de gestor",
  "error": "Detalles del error"
}
```

---

### Obtener estadísticas del usuario

Devuelve estadísticas personalizadas para el usuario autenticado.

```
GET /dashboard/user-stats
```

#### Cabeceras requeridas

```
Authorization: Bearer {token}
```

#### Respuesta exitosa (200 OK)

```json
{
  "userRole": "partner",
  "myInvestments": {
    "total": 3,
    "totalAmount": 125000,
    "pending": 1,
    "confirmed": 2,
    "rejected": 0
  },
  "myInterests": {
    "total": 5,
    "pending": 2,
    "contacted": 2,
    "converted": 1
  },
  "portfolioSummary": {
    "totalInvested": 125000,
    "expectedReturns": 15625,
    "averageRoi": 12.5,
    "projectsInvested": [
      {
        "projectId": "550e8400-e29b-41d4-a716-446655440002",
        "title": "Residencial Las Palmas",
        "investedAmount": 50000,
        "expectedRoi": 12.5,
        "status": "confirmed"
      },
      {
        "projectId": "550e8400-e29b-41d4-a716-446655440003",
        "title": "Comercial Centro",
        "investedAmount": 75000,
        "expectedRoi": 15.0,
        "status": "confirmed"
      }
    ]
  },
  "recentActivity": [
    {
      "type": "investment_confirmed",
      "message": "Tu inversión en Residencial Las Palmas ha sido confirmada",
      "timestamp": "2025-05-14T14:20:00.000Z",
      "projectId": "550e8400-e29b-41d4-a716-446655440002"
    },
    {
      "type": "interest_contacted",
      "message": "Un gestor se ha puesto en contacto contigo sobre tu interés en Proyecto Industrial Norte",
      "timestamp": "2025-05-13T16:45:00.000Z",
      "projectId": "550e8400-e29b-41d4-a716-446655440004"
    }
  ]
}
```

#### Respuestas de error

**401 Unauthorized**

```json
{
  "message": "No autorizado"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error al obtener estadísticas del usuario",
  "error": "Detalles del error"
}
```

## Notas Técnicas

### Cálculos de Estadísticas

- **Total Invested Amount**: Suma de todas las inversiones confirmadas
- **Expected Returns**: Calculado basado en el ROI esperado de cada proyecto
- **Average ROI**: Promedio ponderado por monto invertido
- **Recent Activity**: Últimas 10 actividades relevantes para el usuario

### Permisos y Roles

- **Estadísticas Generales**: Disponibles para todos los usuarios autenticados
- **Estadísticas de Gestor**: Solo para usuarios con rol `manager` o `admin`
- **Estadísticas de Usuario**: Personalizadas según el rol del usuario

### Rendimiento

- Las estadísticas se calculan en tiempo real
- Se implementa caché para consultas frecuentes
- Los datos históricos se agregan para mejorar el rendimiento

### Filtros Temporales

Todos los endpoints soportan parámetros de consulta opcionales para filtrar por período:

| Parámetro | Tipo   | Descripción                    |
|-----------|--------|--------------------------------|
| period    | string | `week`, `month`, `quarter`, `year` |
| startDate | string | Fecha de inicio (ISO 8601)     |
| endDate   | string | Fecha de fin (ISO 8601)        | 