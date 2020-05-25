import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import Loader from '../components/Loader'
import LinkCard from '../components/LinkCard'

function DetailPage() {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [link, setLink] = useState(null)
  const linkId = useParams().id

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, `GET`, null, {
        Authorization: `Bearer ${token}`,
      })
      setLink(fetched)
      console.log(setLink)
    } catch (e) {}
  }, [token, linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return <Loader />
  }
  return <>{!loading && link && <LinkCard link={link} />}</>
  // return <LinkCard link={link} name='MyLink' />
}

export default DetailPage
