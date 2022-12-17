import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import DefaultLayoutPage from "./pages/Strater/DefaultLayoutPage";
import Login from './pages/Pages/Auth/Login';
import GeneralDashboard from "./pages/Dashboard/GeneralDashboard";
import Admins from "./pages/Components/Admin/Admins";
import AddEditAdmin from "./pages/Components/Admin/AddEditAdmin";
import ViewAdmin from "./pages/Components/Admin/ViewAdmin";
import Categories from "./pages/Components/Categories/Categories";
import AddEditCategories from "./pages/Components/Categories/AddEditCategories";
import ViewCategories from "./pages/Components/Categories/ViewCategories";
import Subcategories from "./pages/Components/Subcategories/Subcategories";
import AddEditSubcategories from "./pages/Components/Subcategories/AddEditSubcategories";
import ViewSubcategories from "./pages/Components/Subcategories/ViewSubcategories";
import Matters from "./pages/Components/Matters/Matters";
import AddEditMatters from "./pages/Components/Matters/AddEditMatters";
import ViewMatters from "./pages/Components/Matters/ViewMatters";
import Post from './pages/Components/Post/Post';
import AddEditPost from './pages/Components/Post/AddEditPost';
import ViewPost from './pages/Components/Post/ViewPost';
import Campaning from "./pages/Components/Campaign/Campaign";
import AddEditCampanings from "./pages/Components/Campaign/AddEditCampaign";
import ViewCampaning from "./pages/Components/Campaign/ViewCampaign";
import LatestNews from "./pages/Components/LatestNews/LatestNews";
import ChangePassword from "./pages/Pages/Auth/ChangePassword";
import ResetPassword from "./pages/Pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Pages/Auth/ForgotPassword";
import UsersList from "./pages/Components/Users/UsersList";
import { Footer, Header } from "./components/admin";
import SideBar from "./components/admin/sidebar";

const App = () => {
  let location = useLocation();

  return (
    <>
      <div className="App">
       {
        location.pathname !== '/' &&  <Header />
      }
      {
        location.pathname !== '/' && <SideBar />
      }
        {/* {sessionStorage.getItem("ADMIN") ? (<Redirect to='/dashboard'/>) : (<Redirect to='/'/>)} */}
        <Route path='/' exact component={Login} />
        <Route path="/dashboard" component={GeneralDashboard} />
        <Route path="/layout/default" component={DefaultLayoutPage} />
        <Route path='/admins' component={Admins} />
        <Route path='/addAdmin' component={AddEditAdmin} />
        <Route path='/editAdmin/:id' component={AddEditAdmin} />
        <Route path='/viewAdmin/:id' component={ViewAdmin} />
        <Route path='/categories' component={Categories} />
        <Route path='/addCategory' component={AddEditCategories} />
        <Route path='/editCategory/:id' component={AddEditCategories} />
        <Route path='/viewCategory/:id' component={ViewCategories} />
        <Route path='/subcategories' component={Subcategories} />
        <Route path='/addSubcategory' component={AddEditSubcategories} />
        <Route path='/editSubcategory/:id' component={AddEditSubcategories} />
        <Route path='/viewSubcategory/:id' component={ViewSubcategories} />
        <Route path='/matters' component={Matters} />
        <Route path='/addMatters' component={AddEditMatters} />
        <Route path='/editMatters/:id' component={AddEditMatters} />
        <Route path='/viewMatters/:id' component={ViewMatters} />
        <Route path='/post' component={Post} />
        <Route path='/addPost' component={AddEditPost} />
        <Route path='/editPost/:id' component={AddEditPost} />
        <Route path='/viewPost/:id' component={ViewPost} />
        <Route path='/campaign' component={Campaning} />
        <Route path='/addCampaign' component={AddEditCampanings} />
        <Route path='/editCampaign/:id' component={AddEditCampanings} />
        <Route path='/viewCampaign/:id' component={ViewCampaning} />
        <Route path='/latestNews' component={LatestNews}/>
        <Route path='/change-password' component={ChangePassword} />
        <Route path='/reset-password' component={ResetPassword} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/users' component={UsersList}/>
        {
          location.pathname !== '/' &&  <Footer />
        }
    
      </div>

    </>
  );
}

export default App;
