export const usernameOrFullName = ({ username, fullname }: { username: string | null, fullname: string }): string => {
  return username || fullname
}