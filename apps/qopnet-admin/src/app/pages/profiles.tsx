import useSWR from 'swr'

export const Profiles = () => {
  const fetcher = (url: string) =>
    fetch(process.env.NX_API_URL + url).then((res) => res.json())

  const { data, error } = useSWR('/api/profiles', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      <h1>Profiles</h1>
      {data.map((profile: any) => {
        return (
          <div>
            <h1>{profile.name}</h1>
          </div>
        )
      })}
    </div>
  )
}
