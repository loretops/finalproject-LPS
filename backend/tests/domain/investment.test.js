const Investment = require('../../domain/entities/Investment');

describe('Investment Entity', () => {
  let validInvestmentData;
  
  beforeEach(() => {
    validInvestmentData = {
      id: 'investment-id',
      userId: 'user-id',
      projectId: 'project-id',
      amount: 10000,
      investedAt: new Date(),
      status: 'pending',
      notes: 'Test investment',
      contractReference: null
    };
  });
  
  describe('Constructor', () => {
    it('should create a valid investment instance with provided data', () => {
      const investment = new Investment(validInvestmentData);
      
      expect(investment.id).toBe(validInvestmentData.id);
      expect(investment.userId).toBe(validInvestmentData.userId);
      expect(investment.projectId).toBe(validInvestmentData.projectId);
      expect(investment.amount).toBe(validInvestmentData.amount);
      expect(investment.investedAt).toBe(validInvestmentData.investedAt);
      expect(investment.status).toBe(validInvestmentData.status);
      expect(investment.notes).toBe(validInvestmentData.notes);
      expect(investment.contractReference).toBe(validInvestmentData.contractReference);
    });
    
    it('should set default values when not provided', () => {
      const minimalData = {
        userId: 'user-id',
        projectId: 'project-id',
        amount: 10000
      };
      
      const investment = new Investment(minimalData);
      
      expect(investment.userId).toBe(minimalData.userId);
      expect(investment.projectId).toBe(minimalData.projectId);
      expect(investment.amount).toBe(minimalData.amount);
      expect(investment.status).toBe('pending');
      expect(investment.investedAt).toBeInstanceOf(Date);
      expect(investment.notes).toBeUndefined();
      expect(investment.contractReference).toBeUndefined();
    });
  });
  
  describe('meetsMinimumAmount', () => {
    it('should return true if amount meets or exceeds the minimum', () => {
      const investment = new Investment(validInvestmentData);
      
      expect(investment.meetsMinimumAmount(5000)).toBe(true);
      expect(investment.meetsMinimumAmount(10000)).toBe(true);
    });
    
    it('should return false if amount is below the minimum', () => {
      const investment = new Investment(validInvestmentData);
      
      expect(investment.meetsMinimumAmount(15000)).toBe(false);
    });
  });
  
  describe('updateStatus', () => {
    it('should update status when valid status is provided', () => {
      const investment = new Investment(validInvestmentData);
      
      investment.updateStatus('confirmed');
      expect(investment.status).toBe('confirmed');
      
      investment.updateStatus('rejected');
      expect(investment.status).toBe('rejected');
      
      investment.updateStatus('canceled');
      expect(investment.status).toBe('canceled');
      
      investment.updateStatus('pending');
      expect(investment.status).toBe('pending');
    });
    
    it('should throw error when invalid status is provided', () => {
      const investment = new Investment(validInvestmentData);
      
      expect(() => {
        investment.updateStatus('invalid_status');
      }).toThrow('Estado de inversión no válido: invalid_status');
    });
  });
  
  describe('isPending', () => {
    it('should return true when status is pending', () => {
      const investment = new Investment({
        ...validInvestmentData,
        status: 'pending'
      });
      
      expect(investment.isPending()).toBe(true);
    });
    
    it('should return false when status is not pending', () => {
      const confirmedInvestment = new Investment({
        ...validInvestmentData,
        status: 'confirmed'
      });
      
      const rejectedInvestment = new Investment({
        ...validInvestmentData,
        status: 'rejected'
      });
      
      const canceledInvestment = new Investment({
        ...validInvestmentData,
        status: 'canceled'
      });
      
      expect(confirmedInvestment.isPending()).toBe(false);
      expect(rejectedInvestment.isPending()).toBe(false);
      expect(canceledInvestment.isPending()).toBe(false);
    });
  });
  
  describe('isConfirmed', () => {
    it('should return true when status is confirmed', () => {
      const investment = new Investment({
        ...validInvestmentData,
        status: 'confirmed'
      });
      
      expect(investment.isConfirmed()).toBe(true);
    });
    
    it('should return false when status is not confirmed', () => {
      const pendingInvestment = new Investment({
        ...validInvestmentData,
        status: 'pending'
      });
      
      const rejectedInvestment = new Investment({
        ...validInvestmentData,
        status: 'rejected'
      });
      
      const canceledInvestment = new Investment({
        ...validInvestmentData,
        status: 'canceled'
      });
      
      expect(pendingInvestment.isConfirmed()).toBe(false);
      expect(rejectedInvestment.isConfirmed()).toBe(false);
      expect(canceledInvestment.isConfirmed()).toBe(false);
    });
  });
  
  describe('validate', () => {
    it('should return true for a valid investment', () => {
      const investment = new Investment(validInvestmentData);
      
      expect(investment.validate()).toBe(true);
    });
    
    it('should throw error when userId is missing', () => {
      const invalidData = { ...validInvestmentData, userId: null };
      const investment = new Investment(invalidData);
      
      expect(() => {
        investment.validate();
      }).toThrow('La inversión debe tener un usuario asociado');
    });
    
    it('should throw error when projectId is missing', () => {
      const invalidData = { ...validInvestmentData, projectId: null };
      const investment = new Investment(invalidData);
      
      expect(() => {
        investment.validate();
      }).toThrow('La inversión debe tener un proyecto asociado');
    });
    
    it('should throw error when amount is missing or zero', () => {
      const invalidData1 = { ...validInvestmentData, amount: null };
      const investment1 = new Investment(invalidData1);
      
      expect(() => {
        investment1.validate();
      }).toThrow('El monto de inversión debe ser mayor que cero');
      
      const invalidData2 = { ...validInvestmentData, amount: 0 };
      const investment2 = new Investment(invalidData2);
      
      expect(() => {
        investment2.validate();
      }).toThrow('El monto de inversión debe ser mayor que cero');
      
      const invalidData3 = { ...validInvestmentData, amount: -100 };
      const investment3 = new Investment(invalidData3);
      
      expect(() => {
        investment3.validate();
      }).toThrow('El monto de inversión debe ser mayor que cero');
    });
  });
}); 