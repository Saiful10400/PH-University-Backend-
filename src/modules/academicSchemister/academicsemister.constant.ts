import { Tmonth, TschemisterCode, TschemisterCodeobj, TschemisterName } from "./academicsemister.interface"

const month:Tmonth[]=[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const schemisterCode:TschemisterCode[]=["01", "02", "03"]
  const schemisterName:TschemisterName[]=["Autumn", "Summar", "Fall"]

const schemisterconstant={
    month,schemisterCode,schemisterName
}



export const schemisterCodeobj:TschemisterCodeobj={
  Autumn:"01", Summar:"02", Fall:"03"
}
export default schemisterconstant