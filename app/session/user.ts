
export interface User {
  user: Profile
  access_token: string
  id_token: string
  refresh_token?: string
}

export interface Profile {
  sub: string
  email_verified?: string
  address?: string
  "custom:number_of_properties"?: string
  gender?: string
  profile?: string
  phone_number_verified?: string
  nickname?: string
  name?: string
  phone_number?: string
  email?: string
  username?: string
}