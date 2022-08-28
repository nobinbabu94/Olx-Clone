import React,{useContext, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import AlertDialog from '../Dialoguebox/AlertDialog';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
function Header() {
const {user} = useContext(AuthContext)
const history = useHistory()
// useEffect(() => {
//   const token = localStorage.getItem('token');


//   if (token) {
//       history.push('/home')
//   }
// },[])

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={()=>{history.push('/')}} className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div onClick={()=>{history.push('/login')}} className="loginPage">
          <span> { user ? `${user.displayName}` : 'Login'}</span>
          <hr />
        </div>
        
        {user && <AlertDialog/>}
        
          
     
        <div onClick={()=>{history.push('/create')}} className="sellMenu">
          <SellButton></SellButton>
          <Link to='/create'><div className="sellMenuContent">
           <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div></Link>
        </div> 
   
      </div>
    </div>
  );
}

export default Header;
