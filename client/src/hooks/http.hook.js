import { useState, useCallback } from 'react'

export const useHttp = () => {
  //  Define loading and error state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  //  Define request with useCallback for react not to loop
  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      //  Set loading flag to true while loading data
      setLoading(true)

      try {
        if (body) {
          //  Stringify object for backend
          body = JSON.stringify(body)
          //  Necessary headers to get data and values
          headers['Content-Type'] = 'application/json'
        }
        //  When request to server finished we have response object
        const response = await fetch(url, { method, body, headers })
        console.log(response)
        //  Unparse response
        const data = await response.json()
        console.log(data)

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong')
        }

        //  When request is over set loading flag to false
        setLoading(false)
        return data
      } catch (e) {
        console.log(e.message)
        setLoading(false)
        setError(e.message)
        throw e
      }
    },
    []
  )

  //  Function to clear error with useCallback
  //  in order not to clear error until it's displayed
  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}
