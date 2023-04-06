import About from "../pages/About";
import Home from "../pages/Home";
import News from "../pages/News";
import Login from "../components/Login";
import Register from "../components/Register";
import CreateBlog from "../pages/CreateBlog";
import BlogDetail from "../pages/BlogDetail";
import GeneralSetting from "../components/GeneralSetting";
import PasswordSetting from "../components/PasswordSetting";
import PannelBlogs from "../components/PannelBlogs";
import EditBlog from "../components/EditBlog";

export const publicRoutes = [
    {path:'/',component:Home},
    {path:'/news',component:News},
    {path:'/about',component:About},
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/blog/create',component:CreateBlog},
    {path:'/blogs/:id',component:BlogDetail},
    {path:'/account',component:GeneralSetting},
    {path:'/account/password',component:PasswordSetting}
]

export const privateRoutes = [
    {path:'/dashboard',component:PannelBlogs},
    {path:'/blog/edit/:id',component:EditBlog}
]