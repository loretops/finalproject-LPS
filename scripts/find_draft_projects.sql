SELECT 
    id, 
    title, 
    status, 
    draft, 
    created_at, 
    minimum_investment, 
    target_amount, 
    expected_roi, 
    location, 
    property_type
FROM projects 
WHERE draft = true 
LIMIT 5; 