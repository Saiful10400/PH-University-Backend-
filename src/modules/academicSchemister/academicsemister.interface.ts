export type Tmonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

  export type TschemisterName="Autumn" | "Summar" | "Fall"
  export type TschemisterCode="01" | "02" | "03"
export type TAcademicSemester={
    name:TschemisterName,
    code: TschemisterCode,
    year:string,
    startMonth:Tmonth,
    endMonth:Tmonth

}

export type TschemisterCodeobj={
  [key:string]:string
}