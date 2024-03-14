import IPhone from "../../images/IPhone.png"
import S22 from "../../images/S22.png"
import { MdLocalOffer } from "react-icons/md";
const Deals = () => {
  return (
    <>
    <h1 className="deal_head">Trending Deals</h1>
<div className="deals_main">
<div className="deal_1">
  <div className="deal_image"><img src={IPhone} alt="" width={230} height={250} /> </div>
  <div className="deal_content">

    <span className="deal_of_the_day"><MdLocalOffer/>  Deal of the Day</span><h2 className="iph">iPhone 13 Pro Max </h2>
  
  <span className="deal1_price">₹ 1,09,900</span>
  
  <p className="deal1_des">The iPhone is a smartphone made by
   Apple that combines a computer, iPod, digital camera and 
   cellular phone into one device with a touchscreen interface.</p>

  </div>
</div>

<div className="deal_1">
  <div className="deal_image deal2"><img src={S22} alt="" width={230} height={250} /> </div>
  <div className="deal_content">

    <span className="deal_of_the_day"><MdLocalOffer/>  Deal of the Day</span><h2 className="iph">Samsung Galaxy S22</h2>
  
  <span className="deal1_price">₹ 62,999</span>
  
  <p className="deal1_des">Samsung Galaxy is a series of computing and mobile computing devices that are designed, manufactured and marketed by Samsung Electronics.</p>

  </div>
</div>
<div className="deal_3"></div>

</div>

    </>
  )
}

export default Deals