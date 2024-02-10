export interface SnackBarData {
    Message: string,
    Type: EnumSnackBarType
}

export enum EnumSnackBarType {
    SUCCESS = 1,
    ERROR   = 2,
    WARNING = 3,
    INFO    = 4
}