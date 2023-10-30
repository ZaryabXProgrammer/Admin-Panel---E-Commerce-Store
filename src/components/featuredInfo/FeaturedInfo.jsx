import { useEffect, useState } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {

  const [income, setincome] = useState([])

  useEffect(() => {
   

    const getIncome = async () => {

      await userRequest.get('orders/income').then((res) => {
        setincome(res.data)

// setperc((res.data[1].total * 100)/ )

        console.log(res.data)
      })

    }

    getIncome()

  }, [])


  const lastMonth = income?.find((item)=>item._id === 10) 

  const previousMonth = income?.find((item) => item._id === 9)

  const Diff = lastMonth?.total - previousMonth?.total

  const Percentage = (Diff / previousMonth?.total) * 100 

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${lastMonth?.total.toFixed(2)}</span>
          <span className="featuredMoneyRate">

            {Math.floor(Percentage*-1)} % {Percentage > 0 ? <ArrowUpward className="featuredIcon" /> : <ArrowDownward className="featuredIcon negative" /> }
            
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
