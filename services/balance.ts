export const renderBalance = (balance: number): string => {
  return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
