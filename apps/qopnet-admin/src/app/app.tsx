import { Route, Switch, useHistory } from 'react-router-dom'
import { useUser, useSupabase } from 'use-supabase'

import {
  Profiles,
  HomePage,
  AboutPage,
  UsersPage,
  SuppliersPage,
  SuppliersProductsPage,
  SupplierProductSlugPage,
  SupplierProductAddPage,
  SupplierProductEditPage,
  MerchantsPage,
  SignInPage,
  NotFoundPage,
} from './pages'
import { useEffect } from 'react'
import { SWRConfig } from 'swr'

import { swrConfig } from '@qopnet/util-swr'

export const App = () => {
  const user = useUser()
  const history = useHistory()
  const { auth } = useSupabase()

  useEffect(() => {
    const checkSession = async () => {
      const session = await auth.session()
      // Redirect to login page if not authenticated / no session
      if (!session) {
        history.replace('/signin')
      }
    }
    checkSession()
  }, [auth, history])

  return (
    <SWRConfig value={swrConfig}>
      <Switch>
        {user && (
          <>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/suppliers" component={SuppliersPage} />
            <Route
              exact
              path="/suppliers/products"
              component={SuppliersProductsPage}
            />
            <Route
              exact
              path="/suppliers/products/add"
              component={SupplierProductAddPage}
            />
            <Route
              exact
              path="/suppliers/:supplierParam/products/:productParam"
              component={SupplierProductSlugPage}
            />
            <Route
              exact
              path="/suppliers/:supplierParam/products/:productParam/edit"
              component={SupplierProductEditPage}
            />
            <Route exact path="/merchants" component={MerchantsPage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/profiles" component={Profiles} />
            <Route path="*" component={NotFoundPage} />
          </>
        )}
        {!user && (
          <>
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/about" component={AboutPage} />
          </>
        )}
      </Switch>
    </SWRConfig>
  )
}

export default App
