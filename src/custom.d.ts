type RecordItem = {
  tag: Tag,
  type: string,
  remarksCount: string[]
}
type Tag = {
  id: string,
  name: string
}
type HashMoneyValue = {
  date: string,
  tag: Tag,
  type: string,
  amount: string,
  remarks: string
}
type HashMoney = {
  [key: string]: HashMoneyValue[]
}
type TotalAmount = {
  [key: string]: { expense: number, income: number }
}

interface Window {

}