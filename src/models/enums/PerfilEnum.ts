export enum RoleEnum {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  USER = 'USER',
}

export const ALL_ROLES = [RoleEnum.ADMIN, RoleEnum.EDITOR, RoleEnum.USER]
export const MANAGEMENT_ROLES = [RoleEnum.ADMIN, RoleEnum.EDITOR]
