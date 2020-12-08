import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '~components/Layout'

import Button from '~components/shared/Button'
import Input from '~components/shared/Input'
import Loading from '~components/shared/Loading'
import ShippingAddress from '~components/shared/ShippingAddress'
import useUser from '~hooks/user/useUser'
import useStores from '~hooks/useStores'

import './styles.scss'

const Profile = () => {
  const { authStore } = useStores()
  const { isAuth } = authStore
  const { user, userLoading } = useUser()

  const renderUserInfo = () => {
    if (userLoading) return <Loading />

    if (!isAuth) return <Redirect to="/" />

    return (
      <div className="profile__user">
        <h2 className="title-primary">Personal Info</h2>
        <Input
          type="text"
          label="name"
          name="name"
          inputValue={user.name}
          disabled={true}
          handleInput={() => {
            return
          }}
        />
        <Input
          type="text"
          label="email"
          name="email"
          inputValue={user.email}
          disabled={true}
          handleInput={() => {
            return
          }}
        />
      </div>
    )
  }

  return (
    <Layout small>
      <div className="profile">
        {renderUserInfo()}
        <ShippingAddress />
        <Button>
          <Link to="/user/orders" className="profile__orders-link">
            View Orders
          </Link>
        </Button>
      </div>
    </Layout>
  )
}

export default Profile
