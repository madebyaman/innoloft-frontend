import useSWR from 'swr'
import { fetcher } from './useTRL'

interface ConfigurationType {
  "id": number,
  "logo": string,
  "mainColor": string,
  "hasUserSection": boolean
}

export default function useConfiguration() {
  const { data, error, isLoading } = useSWR(`configuration/${import.meta.env.VITE_APP_ID || '1'}/`, fetcher)
  const configuration = data as ConfigurationType

  return {
    configuration,
    error,
    isLoading
  }
}
