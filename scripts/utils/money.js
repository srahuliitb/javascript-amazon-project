export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

// This is called 'Default Export'. Each file can have ONLY 1 default export. 
export default formatCurrency;