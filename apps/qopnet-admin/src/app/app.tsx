import { Route, Switch, useHistory } from 'react-router-dom'
import { useUser, useSupabase } from 'use-supabase'

import {
  Profiles,
  HomePage,
  AboutPage,
  UsersPage,
  SuppliersPage,
  SupplierAddPage,
  SupplierSlugPage,
  SuppliersProductsPage,
  SupplierProductsPage,
  SupplierProductSlugPage,
  SupplierProductAddPage,
  SupplierProductEditPage,
  MerchantsPage,
  BusinessOrdersPage,
  BusinessOrdersParamPage,
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
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/users" component={UsersPage} />
        <Route exact path="/suppliers" component={SuppliersPage} />
        <Route exact path="/suppliers/add" component={SupplierAddPage} />
        <Route
          exact
          path="/suppliers/products"
          component={SuppliersProductsPage}
        />
        <Route
          exact
          path="/suppliers/:supplierParam"
          component={SupplierSlugPage}
        />
        <Route
          exact
          path="/suppliers/:supplierParam/products"
          component={SupplierProductsPage}
        />
        <Route
          exact
          path="/suppliers/products/add"
          component={SupplierProductAddPage}
        />
        <Route
          exact
          path="/suppliers/:supplierParam/products/add"
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
        <Route exact path="/business/orders" component={BusinessOrdersPage} />
        <Route
          exact
          path="/business/orders/:businessOrdersParam"
          component={BusinessOrdersParamPage}
        />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/profiles" component={Profiles} />

        <Route exact path="/signin" component={SignInPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </SWRConfig>
  )
}

export default App
