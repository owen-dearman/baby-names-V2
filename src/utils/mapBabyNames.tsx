import { babyNameDataInterface } from "./babyNameDataInterface"

export function mapBabyNames (props:babyNameDataInterface): JSX.Element {
    return <div key={props.id} className={props.sex}>{props.name}</div>
  }