import useSWR from 'swr'

export async function fetcher(url: string) {
  const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/${url}`);
  return await res.json();
}

export default function useTRL() {
  const { data, error, isLoading } = useSWR('trl/', fetcher)
  return {
    data,
    error,
    isLoading
  }
}
