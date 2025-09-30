import { useContext } from 'react';
import { userContext } from '../../Context/Context';
function HomePage() {

  const {Usertoken}=useContext(userContext)
  return <div>{Usertoken}</div>;
}   
export default HomePage;