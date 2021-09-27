export interface appCountry
{
    countryId:number;
    countryName:string;
    countryPrefix:string;
}
export interface appState
{
    stateId:number;
    countryId:number;
    stateName:string;
    statePrefix:string;
}