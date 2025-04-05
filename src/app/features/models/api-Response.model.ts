export interface ApiResponse<T>{
statusCode:number;
isSuccess:boolean;
message:string;
errorMessage:string[];
result:T;
}